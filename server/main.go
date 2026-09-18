package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"syscall"
	"time"

	"hub-server/internal/api"
	"hub-server/internal/extractor"
	"hub-server/internal/queue"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	baseURL := os.Getenv("BASE_URL")
	if baseURL == "" {
		baseURL = fmt.Sprintf("http://localhost:%s", port)
	}

	workDir, err := os.Getwd()
	if err != nil {
		log.Fatalf("Failed to get current directory: %v", err)
	}

	storageDir := filepath.Join(workDir, "tmp_storage")

	// Initialize Extractor & Worker Pool
	ext := extractor.NewYtDlpExtractor()
	pool := queue.NewWorkerPool(ext, storageDir, 4)

	// Initialize HTTP Server
	server := api.NewServer(ext, pool, baseURL)
	router := server.SetupRouter()

	httpServer := &http.Server{
		Addr:         ":" + port,
		Handler:      router,
		ReadTimeout:  30 * time.Second,
		WriteTimeout: 60 * time.Second,
		IdleTimeout:  120 * time.Second,
	}

	// Graceful shutdown handling
	stopChan := make(chan os.Signal, 1)
	signal.Notify(stopChan, os.Interrupt, syscall.SIGTERM)

	go func() {
		log.Printf("==================================================")
		log.Printf(" Hub Media Ingestion Engine (Go 1.22)")
		log.Printf(" Server listening on http://localhost:%s", port)
		log.Printf(" Storage directory: %s", storageDir)
		log.Printf(" Endpoints:")
		log.Printf("   - GET  /v1/health")
		log.Printf("   - POST /v1/media/info")
		log.Printf("   - POST /v1/media/download")
		log.Printf("   - GET  /v1/media/download/:jobId")
		log.Printf("   - GET  /v1/media/stream/:jobId")
		log.Printf("==================================================")

		if err := httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server error: %v", err)
		}
	}()

	<-stopChan
	log.Println("Shutting down server gracefully...")

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := httpServer.Shutdown(shutdownCtx); err != nil {
		log.Printf("Error during shutdown: %v", err)
	}
	log.Println("Server stopped.")
}
