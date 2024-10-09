package file

import (
	"encoding/json"
	"fmt"
	"os"

	"ioaiaaii.net/internal/entity"
)

// FileContentRepository is the file-based implementation of the ContentRepository interface.
type FileContent struct {
	ResumeFile   string
	ReleasesFile string
	LiveFile     string
	ProjectsFile string
}

// NewFileContentRepository initializes a new FileContentRepository with the provided file paths.
func NewFileContent(resumeFile, releasesFile, liveFile, projectsFile string) *FileContent {
	return &FileContent{
		ResumeFile:   resumeFile,
		ReleasesFile: releasesFile,
		LiveFile:     liveFile,
		ProjectsFile: projectsFile,
	}
}

// LoadResume loads the resume data from a JSON file.
func (r *FileContent) LoadResume() (entity.Resume, error) {
	data, err := os.ReadFile(r.ResumeFile)
	if err != nil {
		return entity.Resume{}, fmt.Errorf("failed to read resume JSON file: %w", err)
	}
	var resume entity.Resume
	if err := json.Unmarshal(data, &resume); err != nil {
		return entity.Resume{}, fmt.Errorf("failed to parse resume JSON: %w", err)
	}
	return resume, nil
}

// LoadReleases loads release data from a JSON file.
func (r *FileContent) LoadReleases() ([]entity.Release, error) {
	data, err := os.ReadFile(r.ReleasesFile)
	if err != nil {
		return nil, fmt.Errorf("failed to read releases JSON file: %w", err)
	}
	var releases entity.Releases
	if err := json.Unmarshal(data, &releases); err != nil {
		return nil, fmt.Errorf("failed to parse releases JSON: %w", err)
	}
	return releases.Items, nil
}

// LoadLivePerformances loads live performances from a JSON file.
func (r *FileContent) LoadLivePerformances() ([]entity.LivePerformance, error) {
	data, err := os.ReadFile(r.LiveFile)
	if err != nil {
		return nil, fmt.Errorf("failed to read live performances JSON file: %w", err)
	}
	var performances entity.LivePerformances
	if err := json.Unmarshal(data, &performances); err != nil {
		return nil, fmt.Errorf("failed to parse live performances JSON: %w", err)
	}
	return performances.Items, nil
}

// LoadWebsiteProjects loads website projects from a JSON file.
func (r *FileContent) LoadWebsiteProjects() ([]entity.WebsiteProjectEntry, error) {
	data, err := os.ReadFile(r.ProjectsFile)
	if err != nil {
		return nil, fmt.Errorf("failed to read website projects JSON file: %w", err)
	}
	var projects entity.WebsiteProjects
	if err := json.Unmarshal(data, &projects); err != nil {
		return nil, fmt.Errorf("failed to parse website projects JSON: %w", err)
	}
	return projects.Items, nil
}
