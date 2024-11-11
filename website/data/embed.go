package data

import (
	"embed"
	"fmt"
	"io/fs"
	"strings"
)

// Embed all JSON files in the current directory.
//
//go:embed *.json
var DataDir embed.FS

type Config struct {
	ResumeFile   string
	ReleasesFile string
	LiveFile     string
	ProjectsFile string
}

// Map file types to their corresponding filenames (this can be extended as needed)
var fileMap = map[string]string{
	"resume":   "info.json",
	"releases": "releases.json",
	"live":     "live.json",
	"projects": "projects.json",
}

// FindEmbeddedFiles dynamically finds files based on fileMap.
func findEmbeddedFiles() (map[string]string, error) {
	entries, err := fs.ReadDir(DataDir, ".")
	if err != nil {
		return nil, err
	}

	// Create a map to store the found files
	foundFiles := make(map[string]string)

	// Iterate through all embedded files and match them to file types
	for _, entry := range entries {
		name := entry.Name()
		for key, expectedName := range fileMap {
			if strings.EqualFold(name, expectedName) {
				foundFiles[key] = name
			}
		}
	}

	// Check if all expected files are found
	for key, expectedName := range fileMap {
		if _, ok := foundFiles[key]; !ok {
			return nil, fmt.Errorf("missing required file: %s", expectedName)
		}
	}

	return foundFiles, nil
}

// LoadData initializes the Config with dynamically found JSON file paths.
func (c *Config) LoadData() error {
	// Attempt to find embedded files dynamically
	foundFiles, err := findEmbeddedFiles()
	if err != nil {
		return fmt.Errorf("failed to find embedded files: %w", err)
	}
	// Assign found files to the Config struct
	c.ResumeFile = foundFiles["resume"]
	c.ReleasesFile = foundFiles["releases"]
	c.LiveFile = foundFiles["live"]
	c.ProjectsFile = foundFiles["projects"]

	return nil
}
