package main

import (
	"context"
	"log/slog"
	"os"
	"os/signal"
	"sync"
	"syscall"
	"time"

	"ioaiaaii.net/config"
	"ioaiaaii.net/internal/controller/httpcontroller"
	"ioaiaaii.net/internal/infrastructure/cache"
	"ioaiaaii.net/internal/infrastructure/persistence/storage"
	"ioaiaaii.net/internal/infrastructure/telemetry"
	"ioaiaaii.net/internal/infrastructure/transport/httpserver"
	"ioaiaaii.net/internal/usecase/content"
	"ioaiaaii.net/website/data"
)

func main() {
	slog.Info("Application starting...")
	// Load configuration
	cfg := config.LoadConfig()

	// Create a signal-aware context for graceful shutdown
	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer cancel()

	// Initialize OpenTelemetry SDK for metrics
	slog.Info("Initializing OpenTelemetry...")
	shutdownTelemetry, err := telemetry.SetupOTelSDK(ctx, cfg.OtelConfig)
	if err != nil {
		slog.ErrorContext(ctx, "Failed to initialize OpenTelemetry", "error", err.Error())
		os.Exit(1) // Exit immediately on critical error
	}
	defer func() {
		shutdownCtx, cancelShutdown := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancelShutdown()

		if err := shutdownTelemetry(shutdownCtx); err != nil {
			slog.ErrorContext(ctx, "Error during OpenTelemetry shutdown", "error", err.Error())
		} else {
			slog.Info("OpenTelemetry shut down gracefully.")
		}
	}()

	// Step 5: Initialize data configuration
	slog.Info("Loading data configuration...")
	var dataConf data.Files
	if err := dataConf.LoadFiles(); err != nil {
		slog.ErrorContext(ctx, "Error loading data", "error", err.Error())
		os.Exit(1) // Exit immediately on critical error
	}

	// Step 6: Initialize repository (file-based repository in this case)
	slog.Info("Initializing storage repository...")
	fetchedData := storage.NewFileContent(dataConf)

	// Step 7: Add in-memory caching layer with a 30-minute TTL
	slog.Info("Initializing in-memory cache...")
	cachedRepo := cache.NewInMemoryCacheRepository(fetchedData, 30*time.Minute)

	// Step 8: Initialize use case by injecting repository
	slog.Info("Initializing content use case...")
	contentUsecase := content.NewContentUsecase(cachedRepo)

	// Step 9: Initialize HTTP handler (controller) by injecting use case
	slog.Info("Initializing HTTP handler...")
	contentHandler := httpcontroller.NewContentHandler(contentUsecase)

	// Step 10: Initialize WaitGroup for managing goroutines
	var wg sync.WaitGroup

	// Step 11: Start the HTTP server with the context
	slog.Info("Starting HTTP server...")
	httpserver.StartHTTPServer(ctx, contentHandler, &wg, cfg.APIConfig)

	// Step 12: Wait for all goroutines to finish
	slog.Info("Waiting for goroutines to finish...")
	wg.Wait()

	// Step 13: Log application shutdown
	slog.Info("Application shut down gracefully.")
}
