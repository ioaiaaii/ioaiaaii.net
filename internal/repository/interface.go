package repository

import (
	"ioaiaaii.net/internal/entity"
)

// ContentRepository defines the interface for interacting with profile-related content.
type ContentRepository interface {
	LoadResume() (entity.Resume, error)
	LoadReleases() ([]entity.Release, error)
	LoadLivePerformances() ([]entity.LivePerformance, error)
	LoadWebsiteProjects() ([]entity.WebsiteProjectEntry, error)
}
