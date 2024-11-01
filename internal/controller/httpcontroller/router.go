package httpcontroller

import (
	"io/fs"
	"log"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
	"ioaiaaii.net/website"
)

// RegisterAPIRoutes sets up the HTTP API routes for the application.
// @title API Documentation for IOAIAAII
// @version 1.0
// @description This API provides access to resume, releases, live performances, and project information.
// @host localhost:8080
// @BasePath /api/v1
func RegisterAPIRoutes(app *fiber.App, handler *ContentHandler) {
	apiV1 := app.Group("/api/v1")

	// Get resume information
	// @Summary      Get resume information
	// @Description  Retrieves resume details, including name, bio, and work experience.
	// @Tags         Info
	// @Accept       json
	// @Produce      json
	// @Success      200  {object}  entity.Resume
	// @Router       /api/v1/info [get]
	apiV1.Get("/info", handler.GetResume)

	// Get releases
	// @Summary      Get releases
	// @Description  Retrieves a list of releases with relevant details.
	// @Tags         Releases
	// @Accept       json
	// @Produce      json
	// @Success      200  {object}  []entity.Release
	// @Router       /api/v1/releases [get]
	apiV1.Get("/releases", handler.GetReleases)

	// Get live performances
	// @Summary      Get live performances
	// @Description  Retrieves records of past live performances.
	// @Tags         Performances
	// @Produce      json
	// @Success      200  {object}  []entity.LivePerformance
	// @Router       /api/v1/live [get]
	apiV1.Get("/live", handler.GetLivePerformances)

	// Get project details
	// @Summary      Get project details
	// @Description  Retrieves details on various projects the individual has undertaken.
	// @Tags         Projects
	// @Accept       json
	// @Produce      json
	// @Success      200  {object}  []entity.ProjectEntry
	// @Router       /api/v1/projects [get]
	apiV1.Get("/projects", handler.GetWebsiteProjects)
}

// RegisterUIRoutes serves the frontend UI and handles SPA routing.
func RegisterUIRoutes(app *fiber.App) {
	embedAdmin, err := fs.Sub(website.EmbedUI(), "dist")
	if err != nil {
		log.Fatal("Failed to load embedded UI files: ", err)
	}

	ui := app.Group("/")
	ui.Use("/", filesystem.New(filesystem.Config{
		Root:         http.FS(embedAdmin),
		Index:        "index.html",
		NotFoundFile: "index.html",
		MaxAge:       3600,
	}))
}

// RegisterHealthRoutes adds liveness and readiness routes for health checks
func RegisterHealthRoutes(app *fiber.App, handler *ContentHandler) {
	// Liveness endpoint: Kubernetes will use this to check if the container is running
	app.Get("/healthz/liveness", handler.IsAlive)

	// Readiness endpoint: Kubernetes will use this to check if the service is ready
	app.Get("/healthz/readiness", handler.IsReady)
}
