package queue

import (
	"context"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"sync"
	"time"

	"hub-server/internal/extractor"
	"hub-server/internal/models"
)

type WorkerPool struct {
	extractor   extractor.Extractor
	jobs        sync.Map // key: string (jobID), value: *models.DownloadJob
	jobQueue    chan *models.DownloadJob
	outputDir   string
	maxWorkers  int
	ttlDuration time.Duration
}

func NewWorkerPool(ext extractor.Extractor, outputDir string, maxWorkers int) *WorkerPool {
	if err := os.MkdirAll(outputDir, 0755); err != nil {
		log.Printf("Warning: failed to create output directory %s: %v", outputDir, err)
	}

	pool := &WorkerPool{
		extractor:   ext,
		jobQueue:    make(chan *models.DownloadJob, 100),
		outputDir:   outputDir,
		maxWorkers:  maxWorkers,
		ttlDuration: 60 * time.Minute,
	}

	// Start worker goroutines
	for i := 0; i < maxWorkers; i++ {
		go pool.workerRoutine(i + 1)
	}

	// Start cleaner daemon
	go pool.cleanerRoutine()

	return pool
}

// SubmitJob queues a new download job
func (p *WorkerPool) SubmitJob(req *models.DownloadRequest) *models.DownloadJob {
	id := fmt.Sprintf("job_%d", time.Now().UnixNano()/1_000_000)

	job := &models.DownloadJob{
		ID:        id,
		URL:       req.URL,
		Format:    req.Format,
		Quality:   req.Quality,
		Status:    models.StatusQueued,
		Progress:  0,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	p.jobs.Store(id, job)
	p.jobQueue <- job

	return job
}

// GetJob returns a job by ID
func (p *WorkerPool) GetJob(jobID string) (*models.DownloadJob, bool) {
	val, ok := p.jobs.Load(jobID)
	if !ok {
		return nil, false
	}
	return val.(*models.DownloadJob), true
}

func (p *WorkerPool) workerRoutine(workerID int) {
	for job := range p.jobQueue {
		job.Status = models.StatusProcessing
		job.Progress = 20
		job.UpdatedAt = time.Now()

		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)
		filePath, fileSize, err := p.extractor.Download(ctx, job, p.outputDir)
		cancel()

		if err != nil {
			job.Status = models.StatusFailed
			job.Error = err.Error()
			job.UpdatedAt = time.Now()
			log.Printf("[Worker %d] Job %s failed: %v", workerID, job.ID, err)
			continue
		}

		job.Status = models.StatusReady
		job.Progress = 100
		job.FilePath = filePath
		job.FileName = filepath.Base(filePath)
		job.FileSize = fileSize
		job.UpdatedAt = time.Now()
		log.Printf("[Worker %d] Job %s ready: %s (%d bytes)", workerID, job.ID, job.FileName, fileSize)
	}
}

func (p *WorkerPool) cleanerRoutine() {
	ticker := time.NewTicker(10 * time.Minute)
	defer ticker.Stop()

	for range ticker.C {
		now := time.Now()
		p.jobs.Range(func(key, value any) bool {
			job := value.(*models.DownloadJob)
			if now.Sub(job.CreatedAt) > p.ttlDuration {
				if job.FilePath != "" {
					_ = os.Remove(job.FilePath)
				}
				p.jobs.Delete(key)
			}
			return true
		})
	}
}
