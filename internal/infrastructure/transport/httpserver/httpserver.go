package httpserver

import (
	"github.com/gofiber/fiber/v2"
	"ioaiaaii.net/internal/controller/httpcontroller" // Import the HTTP controller
)

// SetupHTTPServer sets up and configures the Fiber HTTP server.
func SetupHTTPServer(contentHandler *httpcontroller.ContentHandler) *fiber.App {
	// Create a new Fiber app with default config
	app := fiber.New()

	// Register the routes by calling the function from the HTTP controller layer
	httpcontroller.RegisterAPIRoutes(app, contentHandler)
	httpcontroller.RegisterUIRoutes(app)
	httpcontroller.RegisterHealthRoutes(app, contentHandler)

	return app
}
