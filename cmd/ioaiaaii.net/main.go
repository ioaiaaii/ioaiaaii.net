package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
)

// Resume Struct Start
type Resume struct {
	Name        string            `json:"name"`
	Title       string            `json:"title"`
	Email       string            `json:"email"`
	LinkedIn    string            `json:"linkedIn"`
	GitHub      string            `json:"gitHub"`
	Profile     string            `json:"profile"`
	ArtistBio   string            `json:"artistBio"`
	EngineerBio string            `json:"engineerBio"`
	Experience  []ExperienceEntry `json:"experience"`
	Education   []EducationEntry  `json:"education"`
	Projects    []ProjectEntry    `json:"projects"`
	SkillGroups []SkillCategory   `json:"skillGroups"`
	References  []string          `json:"references"`
}

type ExperienceEntry struct {
	Role        string   `json:"role"`
	Company     string   `json:"company"`
	Location    string   `json:"location"`
	StartDate   string   `json:"startDate"`
	EndDate     string   `json:"endDate"`
	Description []string `json:"description"`
}

type EducationEntry struct {
	Degree         string `json:"degree"`
	Institution    string `json:"institution"`
	Location       string `json:"location"`
	Specialization string `json:"specialization,omitempty"`
	Dissertation   string `json:"dissertation,omitempty"`
	StartDate      string `json:"startDate,omitempty"`
	EndDate        string `json:"endDate,omitempty"`
}

type ProjectEntry struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Link        string `json:"link"`
}

type SkillCategory struct {
	Category string   `json:"category"`
	Skills   []string `json:"skills"`
}

type Item struct {
	Title   string   `json:"title"`
	Details string   `json:"details"`
	Items   []string `json:"items"`
}

type Release struct {
	Title          string   `json:"title"`
	Artist         string   `json:"artist"`
	ReleaseDate    string   `json:"releaseDate"`
	Label          string   `json:"label"`
	Image          []string `json:"image,omitempty"`
	DiscogsLink    string   `json:"discogs_link"`
	BandcampLink   string   `json:"bandcamp_link,omitempty"`
	SoundCloudLink string   `json:"soundcloud_link,omitempty"`
	Description    string   `json:"description"`
}

type Releases struct {
	Items []Release `json:"releases"`
}

type LivePerformance struct {
	Title      string  `json:"title"`
	Date       string  `json:"date"`
	EventLink  *string `json:"event_link,omitempty"`
	ListenLink *string `json:"listen_link,omitempty"`
}

type LivePerformances struct {
	Items []LivePerformance `json:"performances"`
}

type WebsiteProjects struct {
	Items []WebsiteProjectEntry `json:"projects"`
}

type WebsiteProjectEntry struct {
	ProjectEntry
	Category string `json:"category"`
}

var (
	websiteProjects      []WebsiteProjectEntry
	websiteProjectsError error
	infoResume           Resume
	infoResumeError      error
	releases             []Release
	releaseErr           error
	livePerformances     []LivePerformance
	liveErr              error
)

// Profile struct for landing page content
type Profile struct {
	ImageURL string `json:"imageUrl"`
	Title    string `json:"title"`
	Details  string `json:"details"`
}

var ioaiaaii = Profile{
	ImageURL: "/assets/images/landing/profile.jpg",
	Title:    "Ioannis Savvaidis",
	Details:  "As a Site Reliability Engineer with over ten years of experience, I specialize in building robust, scalable digital infrastructure...",
}

// Load functions for different datasets
func loadReleases(filePath string) ([]Release, error) {
	data, err := os.ReadFile(filePath)
	if err != nil {
		return nil, fmt.Errorf("failed to read JSON file: %w", err)
	}

	var releases Releases
	if err := json.Unmarshal(data, &releases); err != nil {
		return nil, fmt.Errorf("failed to parse JSON: %w", err)
	}

	return releases.Items, nil
}

func loadLive(filePath string) ([]LivePerformance, error) {
	data, err := os.ReadFile(filePath)
	if err != nil {
		return nil, fmt.Errorf("failed to read JSON file: %w", err)
	}

	var performances LivePerformances
	if err := json.Unmarshal(data, &performances); err != nil {
		return nil, fmt.Errorf("failed to parse JSON: %w", err)
	}

	return performances.Items, nil
}

func loadWebsiteProjects(filePath string) ([]WebsiteProjectEntry, error) {
	data, err := os.ReadFile(filePath)
	if err != nil {
		return nil, fmt.Errorf("failed to read JSON file: %w", err)
	}

	var projects WebsiteProjects
	if err := json.Unmarshal(data, &projects); err != nil {
		return nil, fmt.Errorf("failed to parse JSON: %w", err)
	}

	return projects.Items, nil
}

func loadInfo(filePath string) (Resume, error) {
	data, err := os.ReadFile(filePath)
	if err != nil {
		return Resume{}, fmt.Errorf("failed to read JSON file: %w", err)
	}

	var resume Resume
	if err := json.Unmarshal(data, &resume); err != nil {
		return Resume{}, fmt.Errorf("failed to parse JSON: %w", err)
	}

	return resume, nil
}

// Main Fiber setup and routes
func main() {
	// Initialize Fiber app
	app := fiber.New()

	// Load data at startup
	websiteProjects, websiteProjectsError = loadWebsiteProjects("../../website/data/projects.json")
	infoResume, infoResumeError = loadInfo("../../website/data/info.json")
	releases, releaseErr = loadReleases("../../website/data/releases.json")
	livePerformances, liveErr = loadLive("../../website/data/live.json")

	// Serve static files
	app.Static("/", "./public")

	// API routes
	app.Get("/api/ioaiaaii", func(c *fiber.Ctx) error {
		return c.JSON(ioaiaaii)
	})

	app.Get("/api/info", func(c *fiber.Ctx) error {
		if infoResumeError != nil {
			return c.Status(fiber.StatusInternalServerError).SendString(infoResumeError.Error())
		}
		return c.JSON(infoResume)
	})

	app.Get("/api/projects", func(c *fiber.Ctx) error {
		if websiteProjectsError != nil {
			return c.Status(fiber.StatusInternalServerError).SendString(websiteProjectsError.Error())
		}
		return c.JSON(websiteProjects)
	})

	app.Get("/api/releases", func(c *fiber.Ctx) error {
		if releaseErr != nil {
			return c.Status(fiber.StatusInternalServerError).SendString(releaseErr.Error())
		}
		return c.JSON(releases)
	})

	app.Get("/api/live", func(c *fiber.Ctx) error {
		if liveErr != nil {
			return c.Status(fiber.StatusInternalServerError).SendString(liveErr.Error())
		}
		return c.JSON(livePerformances)
	})

	// Start the server on port 8080
	log.Fatal(app.Listen(":8080"))
}
