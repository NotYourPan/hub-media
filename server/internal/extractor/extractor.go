package extractor

import (
	"context"
	"net/url"
	"strings"

	"hub-server/internal/models"
)

// Extractor defines the contract for media resolvers
type Extractor interface {
	Inspect(ctx context.Context, targetURL string) (*models.MediaInfo, error)
	Download(ctx context.Context, job *models.DownloadJob, outputDir string) (filePath string, fileSize int64, err error)
}

// DetectPlatform identifies the host platform from URL
func DetectPlatform(rawURL string) models.MediaPlatform {
	parsed, err := url.Parse(rawURL)
	if err != nil {
		return models.PlatformUnknown
	}

	host := strings.ToLower(parsed.Hostname())

	if strings.Contains(host, "youtube.com") || strings.Contains(host, "youtu.be") {
		return models.PlatformYouTube
	}
	if strings.Contains(host, "tiktok.com") {
		return models.PlatformTikTok
	}
	if strings.Contains(host, "instagram.com") {
		return models.PlatformInstagram
	}
	if strings.Contains(host, "facebook.com") || strings.Contains(host, "fb.watch") {
		return models.PlatformFacebook
	}
	if strings.Contains(host, "twitter.com") || strings.Contains(host, "x.com") {
		return models.PlatformTwitter
	}
	if parsed.Scheme == "http" || parsed.Scheme == "https" {
		return models.PlatformWebpage
	}

	return models.PlatformUnknown
}
