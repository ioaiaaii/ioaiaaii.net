package httpcontroller

import (
	contentusecase "ioaiaaii.net/internal/usecase/content"

	"github.com/gofiber/fiber/v2"
)

// ContentHandler handles HTTP requests related to content and health checks.
type ContentHandler struct {
	Usecase contentusecase.ContentUsecase
}

// NewContentHandler initializes a new ContentHandler.
func NewContentHandler(uc contentusecase.ContentUsecase) *ContentHandler {
	return &ContentHandler{
		Usecase: uc,
	}
}

// GetResume handles the retrieval of resume details.
func (h *ContentHandler) GetResume(c *fiber.Ctx) error {
	resume, err := h.Usecase.GetResume()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}
	return c.JSON(resume)
}

// GetReleases handles the retrieval of releases information.
func (h *ContentHandler) GetReleases(c *fiber.Ctx) error {
	releases, err := h.Usecase.GetReleases()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}
	return c.JSON(releases)
}

// GetLivePerformances handles the retrieval of live performance records.
func (h *ContentHandler) GetLivePerformances(c *fiber.Ctx) error {
	performances, err := h.Usecase.GetLivePerformances()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}
	return c.JSON(performances)
}

// GetWebsiteProjects handles the retrieval of project details.
func (h *ContentHandler) GetWebsiteProjects(c *fiber.Ctx) error {
	projects, err := h.Usecase.GetWebsiteProjects()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}
	return c.JSON(projects)
}
