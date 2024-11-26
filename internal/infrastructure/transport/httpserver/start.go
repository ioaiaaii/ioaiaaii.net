package httpserver

import (
	"context"
	"log/slog"
	"sync"

	"github.com/gofiber/fiber/v2"
	"ioaiaaii.net/config"
	"ioaiaaii.net/internal/controller/httpcontroller"
)

// StartHTTPServer starts the Fiber HTTP server with graceful shutdown using context.
func StartHTTPServer(ctx context.Context, contentHandler *httpcontroller.ContentHandler, wg *sync.WaitGroup, apiConfig config.APIConfig) {
	// Step 1: Set up the Fiber HTTP server
	app := SetupHTTPServer(contentHandler)

	// Step 2: Add to WaitGroup to manage HTTP server goroutine
	wg.Add(1)

	// Step 3: Start the HTTP server in a goroutine
	go func() {
		defer wg.Done() // Ensure this is marked as done when the server stops

		slog.InfoContext(ctx, "Starting HTTP server", "port", apiConfig.HTTPPort)
		if err := app.Listen(":" + apiConfig.HTTPPort); err != nil && err != fiber.ErrServiceUnavailable {
			slog.ErrorContext(ctx, "HTTP server stopped unexpectedly", "error", err)
		}
	}()

	// Step 4: Handle graceful shutdown using the context
	go func() {
		<-ctx.Done() // Wait for the context to be canceled
		slog.InfoContext(ctx, "Initiating graceful shutdown of HTTP server...")

		// Attempt to shut down the server gracefully
		shutdownErr := app.ShutdownWithTimeout(apiConfig.HTTPServerShutdownTimeout)
		if shutdownErr != nil {
			slog.ErrorContext(ctx, "Error during Fiber shutdown", "error", shutdownErr)
		} else {
			slog.InfoContext(ctx, "Fiber server shut down gracefully")
		}
	}()
}
