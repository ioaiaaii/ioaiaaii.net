package storage

import (
	"encoding/json"
	"fmt"

	"ioaiaaii.net/internal/entity"
	"ioaiaaii.net/website/data"
)

// FileContent handles reading embedded files and parsing them into structs
type FileContent struct {
	Config data.Files
}

// NewFileContent creates a new FileContent instance with embedded file paths
func NewFileContent(config data.Files) *FileContent {
	return &FileContent{
		Config: config,
	}
}

// LoadResume reads and parses the resume JSON file
func (f *FileContent) LoadResume() (entity.Resume, error) {
	// Read the embedded resume JSON file
	data, err := data.DataDir.ReadFile(f.Config.ResumeFile)
	if err != nil {
		return entity.Resume{}, fmt.Errorf("failed to read resume file: %w", err)
	}

	// Unmarshal the JSON data into a Resume struct
	var resume entity.Resume
	if err := json.Unmarshal(data, &resume); err != nil {
		return entity.Resume{}, fmt.Errorf("failed to unmarshal resume JSON: %w", err)
	}

	return resume, nil
}

// LoadReleases reads and parses the releases JSON file
func (f *FileContent) LoadReleases() ([]entity.Release, error) {
	// Read the embedded releases JSON file
	data, err := data.DataDir.ReadFile(f.Config.ReleasesFile)
	if err != nil {
		return nil, fmt.Errorf("failed to read releases file: %w", err)
	}

	// Unmarshal the JSON data into a slice of Release structs
	var releases entity.Releases
	if err := json.Unmarshal(data, &releases); err != nil {
		return nil, fmt.Errorf("failed to unmarshal releases JSON: %w", err)
	}

	return releases.Items, nil
}

// LoadLivePerformances reads and parses the live performances JSON file
func (f *FileContent) LoadLivePerformances() ([]entity.LivePerformance, error) {
	// Read the embedded live performances JSON file
	data, err := data.DataDir.ReadFile(f.Config.LiveFile)
	if err != nil {
		return nil, fmt.Errorf("failed to read live performances file: %w", err)
	}

	// Unmarshal the JSON data into a slice of LivePerformance structs
	var performances entity.LivePerformances
	if err := json.Unmarshal(data, &performances); err != nil {
		return nil, fmt.Errorf("failed to unmarshal live performances JSON: %w", err)
	}

	return performances.Items, nil
}

// LoadWebsiteProjects reads and parses the website projects JSON file
func (f *FileContent) LoadWebsiteProjects() ([]entity.WebsiteProjectEntry, error) {
	// Read the embedded website projects JSON file
	data, err := data.DataDir.ReadFile(f.Config.ProjectsFile)
	if err != nil {
		return nil, fmt.Errorf("failed to read website projects file: %w", err)
	}

	// Unmarshal the JSON data into a slice of WebsiteProjectEntry structs
	var projects entity.WebsiteProjects
	if err := json.Unmarshal(data, &projects); err != nil {
		return nil, fmt.Errorf("failed to unmarshal website projects JSON: %w", err)
	}

	return projects.Items, nil
}
