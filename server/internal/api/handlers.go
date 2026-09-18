package api

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"os/exec"
	"strings"

	"hub-server/internal/extractor"
	"hub-server/internal/models"
	"hub-server/internal/queue"
)

type Server struct {
	extractor extractor.Extractor
	pool      *queue.WorkerPool
	baseURL   string
}

func NewServer(ext extractor.Extractor, pool *queue.WorkerPool, baseURL string) *Server {
	return &Server{
		extractor: ext,
		pool:      pool,
		baseURL:   baseURL,
	}
}

func (s *Server) HandleHealth(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]any{
		"status":  "ok",
		"version": "go1.22",
		"service": "Hub Media Ingestion Engine",
	})
}

func (s *Server) HandleDebug(w http.ResponseWriter, r *http.Request) {
	ytdlpPath, ytdlpErr := exec.LookPath("yt-dlp")
	ffmpegPath, ffmpegErr := exec.LookPath("ffmpeg")

	// Test TikWM connection from VPS
	tikwmStatus := "untested"
	var tikwmSnippet string
	form := url.Values{}
	form.Set("url", "https://www.tiktok.com/@multivers_ngawursrill/video/7685997920440585479")
	resp, err := http.Post("https://www.tikwm.com/api/", "application/x-www-form-urlencoded", strings.NewReader(form.Encode()))
	if err != nil {
		tikwmStatus = fmt.Sprintf("error: %v", err)
	} else {
		defer resp.Body.Close()
		bytes, _ := io.ReadAll(io.LimitReader(resp.Body, 512))
		tikwmStatus = fmt.Sprintf("HTTP %d", resp.StatusCode)
		tikwmSnippet = string(bytes)
	}

	// Test YouTube oEmbed from VPS
	ytStatus := "untested"
	ytResp, ytErr := http.Get("https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ&format=json")
	if ytErr != nil {
		ytStatus = fmt.Sprintf("error: %v", ytErr)
	} else {
		defer ytResp.Body.Close()
		ytStatus = fmt.Sprintf("HTTP %d", ytResp.StatusCode)
	}

	writeJSON(w, http.StatusOK, map[string]any{
		"ytdlp": map[string]any{
			"installed": ytdlpErr == nil,
			"path":      ytdlpPath,
			"error":     fmt.Sprint(ytdlpErr),
		},
		"ffmpeg": map[string]any{
			"installed": ffmpegErr == nil,
			"path":      ffmpegPath,
			"error":     fmt.Sprint(ffmpegErr),
		},
		"tikwm": map[string]any{
			"status":  tikwmStatus,
			"snippet": tikwmSnippet,
		},
		"youtube_oembed": map[string]any{
			"status": ytStatus,
		},
	})
}


// HandleMediaInfo inspects URL metadata
func (s *Server) HandleMediaInfo(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req models.InfoRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil || strings.TrimSpace(req.URL) == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid JSON payload or missing 'url' field"})
		return
	}

	info, err := s.extractor.Inspect(r.Context(), req.URL)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}

	writeJSON(w, http.StatusOK, info)
}

// HandleMediaDownload queues an extraction job
func (s *Server) HandleMediaDownload(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req models.DownloadRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil || strings.TrimSpace(req.URL) == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid request payload"})
		return
	}

	if req.Format == "" {
		req.Format = models.FormatVideo
	}
	if req.Quality == "" {
		req.Quality = models.Quality1080p
	}

	job := s.pool.SubmitJob(&req)

	writeJSON(w, http.StatusAccepted, models.DownloadResponse{
		JobID:            job.ID,
		Status:           job.Status,
		EstimatedSeconds: 2.5,
		Engine:           "Go 1.22 + yt-dlp Transcoder Pool",
	})
}

// HandleJobStatus polls job progress
func (s *Server) HandleJobStatus(w http.ResponseWriter, r *http.Request) {
	jobID := strings.TrimPrefix(r.URL.Path, "/v1/media/download/")
	if jobID == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Job ID required"})
		return
	}

	job, ok := s.pool.GetJob(jobID)
	if !ok {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "Job not found or expired"})
		return
	}

	resp := models.JobStatusResponse{
		JobID:           job.ID,
		Status:          job.Status,
		ProgressPercent: job.Progress,
		Error:           job.Error,
	}

	if job.Status == models.StatusReady {
		resp.DownloadURL = fmt.Sprintf("%s/v1/media/stream/%s", s.baseURL, job.ID)
		resp.FileSizeBytes = job.FileSize
		resp.ExpiresInSeconds = 3600
	}

	writeJSON(w, http.StatusOK, resp)
}

// HandleStreamDelivery delivers the binary file
func (s *Server) HandleStreamDelivery(w http.ResponseWriter, r *http.Request) {
	jobID := strings.TrimPrefix(r.URL.Path, "/v1/media/stream/")
	if jobID == "" {
		http.Error(w, "Stream ID required", http.StatusBadRequest)
		return
	}

	job, ok := s.pool.GetJob(jobID)
	if !ok || job.Status != models.StatusReady || job.FilePath == "" {
		http.Error(w, "Stream not found or still processing", http.StatusNotFound)
		return
	}

	if _, err := os.Stat(job.FilePath); os.IsNotExist(err) {
		http.Error(w, "File expired on server", http.StatusGone)
		return
	}

	w.Header().Set("Content-Disposition", fmt.Sprintf("attachment; filename=\"%s\"", job.FileName))
	http.ServeFile(w, r, job.FilePath)
}

func writeJSON(w http.ResponseWriter, status int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(data)
}
