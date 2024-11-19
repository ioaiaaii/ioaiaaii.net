package httpserver

import (
	"log"
	"sync"
	"time"

	"ioaiaaii.net/internal/controller/httpcontroller"
)

func StartHTTPServer(contentHandler *httpcontroller.ContentHandler, wg *sync.WaitGroup, timeout time.Duration) {
	app := SetupHTTPServer(contentHandler)

	// Add to WaitGroup for the HTTP server
	wg.Add(1)

	// Start the HTTP server in a separate goroutine
	go func() {
		log.Println("Starting HTTP server on port 8080...")
		if err := app.Listen(":8080"); err != nil {
			log.Printf("HTTP server stopped: %v", err)
		}
		wg.Done() // Mark the HTTP server as stopped
	}()

	// Handle graceful shutdown in a separate goroutine
	go func() {
		GracefulShutdown(app, timeout)
	}()
}
