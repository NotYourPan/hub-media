package models

import "time"

type MediaPlatform string

const (
	PlatformYouTube   MediaPlatform = "youtube"
	PlatformTikTok    MediaPlatform = "tiktok"
	PlatformInstagram MediaPlatform = "instagram"
	PlatformFacebook  MediaPlatform = "facebook"
	PlatformTwitter   MediaPlatform = "twitter"
	PlatformWebpage   MediaPlatform = "webpage"
	PlatformUnknown   MediaPlatform = "unknown"
)

type MediaFormat string

const (
	FormatVideo MediaFormat = "video"
	FormatAudio MediaFormat = "audio"
	FormatHTML  MediaFormat = "html"
)

type MediaQuality string

const (
	QualityOriginal  MediaQuality = "original"
	Quality1080p     MediaQuality = "1080p"
	Quality720p      MediaQuality = "720p"
	Quality480p      MediaQuality = "480p"
	Quality320kbps   MediaQuality = "320kbps"
	Quality128kbps   MediaQuality = "128kbps"
	QualityRawHTML   MediaQuality = "raw_html"
	QualityCleanHTML MediaQuality = "clean_html"
)

type JobStatus string

const (
	StatusQueued     JobStatus = "queued"
	StatusProcessing JobStatus = "processing"
	StatusReady      JobStatus = "ready"
	StatusFailed     JobStatus = "failed"
)

// MediaInfo mirrors the frontend contract
type MediaInfo struct {
	ID                 string         `json:"id"`
	URL                string         `json:"url"`
	Platform           MediaPlatform  `json:"platform"`
	Title              string         `json:"title"`
	Author             string         `json:"author"`
	AuthorHandle       string         `json:"authorHandle,omitempty"`
	AuthorAvatarURL    string         `json:"authorAvatarUrl,omitempty"`
	ThumbnailURL       string         `json:"thumbnailUrl"`
	VideoPreviewURL    string         `json:"videoPreviewUrl,omitempty"`
	Duration           string         `json:"duration,omitempty"`
	ViewsCount         string         `json:"viewsCount,omitempty"`
	AvailableFormats   []MediaFormat  `json:"availableFormats"`
	AvailableQualities []MediaQuality `json:"availableQualities"`
}

// InfoRequest represents metadata inspection payload
type InfoRequest struct {
	URL string `json:"url"`
}

// DownloadRequest represents extraction job submission payload
type DownloadRequest struct {
	URL     string       `json:"url"`
	Format  MediaFormat  `json:"format"`
	Quality MediaQuality `json:"quality"`
}

// DownloadResponse is returned immediately when a job is accepted
type DownloadResponse struct {
	JobID            string    `json:"jobId"`
	Status           JobStatus `json:"status"`
	EstimatedSeconds float64   `json:"estimatedSeconds"`
}

// JobStatusResponse is returned when polling job progress
type JobStatusResponse struct {
	JobID            string    `json:"jobId"`
	Status           JobStatus `json:"status"`
	ProgressPercent  int       `json:"progressPercent,omitempty"`
	DownloadURL      string    `json:"downloadUrl,omitempty"`
	FileSizeBytes    int64     `json:"fileSizeBytes,omitempty"`
	ExpiresInSeconds int       `json:"expiresInSeconds,omitempty"`
	Error            string    `json:"error,omitempty"`
}

// DownloadJob tracks internal job state in the worker pool
type DownloadJob struct {
	ID        string
	URL       string
	Format    MediaFormat
	Quality   MediaQuality
	Status    JobStatus
	Progress  int
	FilePath  string
	FileName  string
	FileSize  int64
	Error     string
	CreatedAt time.Time
	UpdatedAt time.Time
}
