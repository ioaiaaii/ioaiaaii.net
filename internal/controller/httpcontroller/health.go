package httpcontroller

import (
	"runtime"
	"time"

	"github.com/gofiber/fiber/v2"
)

// IsAlive confirms the service is running. If there's an internal issue, it returns an error.
func (h *ContentHandler) IsAlive(c *fiber.Ctx) error {
	// Check internal health status
	if !h.isHealthy() {
		// Return 500 if the service is not in a healthy state
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "unhealthy",
			"message": "Service is running but encountered an internal issue",
			"time":    time.Now().Format(time.RFC3339),
		})
	}

	// Return 200 if the service is healthy
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  "OK",
		"message": "Service is Live",
		"time":    time.Now().Format(time.RFC3339),
	})
}

// isHealthy checks the internal health of the application
func (h *ContentHandler) isHealthy() bool {
	// Memory usage check
	var m runtime.MemStats
	runtime.ReadMemStats(&m)

	const maxMemoryUsage = 500 * 1024 * 1024 // 500 MB
	if m.Alloc > maxMemoryUsage {
		return false
	}

	// Goroutine count check
	if runtime.NumGoroutine() > 100 {
		return false
	}

	// All checks passed, service is healthy
	return true
}

// IsReady checks critical dependencies to ensure the service can handle requests
func (h *ContentHandler) IsReady(c *fiber.Ctx) error {

	// Check dependencies required for readiness
	if err := h.Usecase.CheckDependencies(); err != nil {
		// Log the error if logging is implemented
		// log.Printf("Readiness check failed: %v", err)

		// Send a JSON response with details
		return c.Status(fiber.StatusServiceUnavailable).JSON(fiber.Map{
			"status":  "unavailable",
			"message": "Service not Ready: " + err.Error(),
			"time":    time.Now().Format(time.RFC3339),
		})
	}
	// Return 200 if the service is healthy
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  "OK",
		"message": "Service is Ready",
		"time":    time.Now().Format(time.RFC3339),
	})
}
