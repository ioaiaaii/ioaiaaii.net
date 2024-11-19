package httpserver

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gofiber/fiber/v2"
)

// GracefulShutdown shuts down the Fiber HTTP server gracefully.
func GracefulShutdown(app *fiber.App, timeout time.Duration) {
	// Listen for OS signals
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)

	// Wait for a termination signal
	sig := <-sigChan
	log.Printf("Received signal: %v. Shutting down HTTP server...\n", sig)

	// Create a context with timeout for graceful shutdown
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel() // Ensure resources are cleaned up when function exits (from context)

	// Shutdown Fiber app
	if err := app.ShutdownWithContext(ctx); err != nil {
		log.Printf("Error during HTTP server shutdown: %v", err)
	}

	log.Println("HTTP server shut down gracefully.")
}
