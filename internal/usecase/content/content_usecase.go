package content

import (
	"ioaiaaii.net/internal/entity"
	"ioaiaaii.net/internal/repository"
)

// ContentUsecase defines the interface for interacting with profile-related content.
type ContentUsecase interface {
	GetResume() (entity.Resume, error)
	GetReleases() ([]entity.Release, error)
	GetLivePerformances() ([]entity.LivePerformance, error)
	GetWebsiteProjects() ([]entity.WebsiteProjectEntry, error)
}

// contentUsecase is the concrete implementation of ContentUsecase.
type contentUsecase struct {
	repo repository.ContentRepository
}

// NewContentUsecase creates a new instance of contentUsecase.
func NewContentUsecase(repo repository.ContentRepository) ContentUsecase {
	return &contentUsecase{repo: repo}
}

// GetResume fetches the resume content using the repository.
func (uc *contentUsecase) GetResume() (entity.Resume, error) {
	return uc.repo.LoadResume()
}

// GetReleases fetches the release content using the repository.
func (uc *contentUsecase) GetReleases() ([]entity.Release, error) {
	return uc.repo.LoadReleases()
}

// GetLivePerformances fetches live performances content using the repository.
func (uc *contentUsecase) GetLivePerformances() ([]entity.LivePerformance, error) {
	return uc.repo.LoadLivePerformances()
}

// GetWebsiteProjects fetches website projects content using the repository.
func (uc *contentUsecase) GetWebsiteProjects() ([]entity.WebsiteProjectEntry, error) {
	return uc.repo.LoadWebsiteProjects()
}
