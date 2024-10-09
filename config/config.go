package config

import (
	"fmt"
	"os"
	"path/filepath"
)

type Config struct {
	DataDir      string
	ResumeFile   string
	ReleasesFile string
	LiveFile     string
	ProjectsFile string
}

var dataDir = "../../website/data"

// LoadConfig loads the file paths from the specified data directory
func LoadConfig() (*Config, error) {
	// Ensure the directory exists
	if _, err := os.Stat(dataDir); os.IsNotExist(err) {
		return nil, fmt.Errorf("data directory does not exist: %s", dataDir)
	}

	// Define paths to the data files
	return &Config{
		DataDir:      dataDir,
		ResumeFile:   filepath.Join(dataDir, "info.json"),
		ReleasesFile: filepath.Join(dataDir, "releases.json"),
		LiveFile:     filepath.Join(dataDir, "live.json"),
		ProjectsFile: filepath.Join(dataDir, "projects.json"),
	}, nil
}
