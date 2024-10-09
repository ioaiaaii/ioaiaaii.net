package httpcontroller

import (
	"github.com/gofiber/fiber/v2"
)

// RegisterRoutes sets up the HTTP routes for the application.
func RegisterRoutes(app *fiber.App, handler *ContentHandler) {
	app.Get("/api/info", handler.GetResume)
	app.Get("/api/releases", handler.GetReleases)
	app.Get("/api/live", handler.GetLivePerformances)
	app.Get("/api/projects", handler.GetWebsiteProjects)
}
