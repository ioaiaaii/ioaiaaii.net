package httpcontroller

import (
	contentusecase "ioaiaaii.net/internal/usecase/content"

	"github.com/gofiber/fiber/v2"
)

// ContentHandler handles HTTP requests related to content.
type ContentHandler struct {
	Usecase contentusecase.ContentUsecase
}

// NewContentHandler initializes a new ContentHandler.
func NewContentHandler(uc contentusecase.ContentUsecase) *ContentHandler {
	return &ContentHandler{Usecase: uc}
}

// GetResume handles the /api/info endpoint to get resume content.
func (h *ContentHandler) GetResume(c *fiber.Ctx) error {
	resume, err := h.Usecase.GetResume()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}
	return c.JSON(resume)
}

// GetReleases handles the /api/releases endpoint to get release content.
func (h *ContentHandler) GetReleases(c *fiber.Ctx) error {
	releases, err := h.Usecase.GetReleases()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}
	return c.JSON(releases)
}

// GetLivePerformances handles the /api/live endpoint to get live performance content.
func (h *ContentHandler) GetLivePerformances(c *fiber.Ctx) error {
	performances, err := h.Usecase.GetLivePerformances()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}
	return c.JSON(performances)
}

// GetWebsiteProjects handles the /api/projects endpoint to get website project content.
func (h *ContentHandler) GetWebsiteProjects(c *fiber.Ctx) error {
	projects, err := h.Usecase.GetWebsiteProjects()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}
	return c.JSON(projects)
}
