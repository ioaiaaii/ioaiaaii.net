package httpserver

import (
	"github.com/gofiber/contrib/otelfiber/v2" // Import the otelfiber middleware
	"github.com/gofiber/fiber/v2"
	"ioaiaaii.net/internal/controller/httpcontroller" // Import the HTTP controller
)

// SetupHTTPServer sets up and configures the Fiber HTTP server.
func SetupHTTPServer(contentHandler *httpcontroller.ContentHandler) *fiber.App {
	// Create a new Fiber app with default config
	app := fiber.New()

	// Register health routes first, so they are not instrumented
	httpcontroller.RegisterHealthRoutes(app, contentHandler)

	// Register the OpenTelemetry middleware
	// before registering routes to ensure all incoming requests are instrumented.
	// Instrumented for tracing and metrics
	// network related metrics from fiber middleware https://github.com/gofiber/contrib/blob/main/otelfiber/
	app.Use(otelfiber.Middleware())

	// Register the routes by calling the function from the HTTP controller layer
	// Register the other routes, which will be instrumented
	httpcontroller.RegisterAPIRoutes(app, contentHandler)
	httpcontroller.RegisterUIRoutes(app)
	return app
}
