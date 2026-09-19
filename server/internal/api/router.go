package api

import (
	"net/http"
)

// SetupRouter registers all API endpoints using Go 1.22 enhanced ServeMux
func (s *Server) SetupRouter() http.Handler {
	mux := http.NewServeMux()

	// Health check
	mux.HandleFunc("GET /v1/health", s.HandleHealth)

	// Media endpoints
	mux.HandleFunc("POST /v1/media/info", s.HandleMediaInfo)
	mux.HandleFunc("POST /v1/media/download", s.HandleMediaDownload)

	// Status polling and binary stream delivery
	mux.HandleFunc("GET /v1/media/download/", s.HandleJobStatus)
	mux.HandleFunc("GET /v1/media/stream/", s.HandleStreamDelivery)

	// Apply Middlewares
	handler := CORSMiddleware(mux)
	handler = LoggingMiddleware(handler)

	return handler
}
