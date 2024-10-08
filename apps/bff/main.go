package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
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

// Item represents a general item with title, details, and items
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
	Image          []string `json:"image,omitempty"`           // Optional images
	DiscogsLink    string   `json:"discogs_link"`              // Link to Discogs
	BandcampLink   string   `json:"bandcamp_link,omitempty"`   // Optional link to Bandcamp
	SoundCloudLink string   `json:"soundcloud_link,omitempty"` // Optional link to SoundCloud
	Description    string   `json:"description"`
}

type Releases struct {
	Items []Release `json:"releases"`
}

// LivePerformance represents live performances
type LivePerformance struct {
	Title      string  `json:"title"`
	Date       string  `json:"date"`
	EventLink  *string `json:"event_link,omitempty"`  // Optional link to event details
	ListenLink *string `json:"listen_link,omitempty"` // Optional link to listen to the performance
}

type LivePerformances struct {
	Items []LivePerformance `json:"performances"`
}

// WebsiteProjects, represents engineering projects
// reusing ProjectEntry, from CV struct
type WebsiteProjects struct {
	Items []WebsiteProjectEntry `json:"projects"`
}

type WebsiteProjectEntry struct {
	ProjectEntry
	Category string `json:"category"`
}

// Global Variables for Projects & Errors cached at startup
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

// Struct for landing page content
type Profile struct {
	ImageURL string `json:"imageUrl"`
	Title    string `json:"title"`
	Details  string `json:"details"`
}

// Your actual data (replace with the correct path to your image)
var ioaiaaii = Profile{
	ImageURL: "/assets/images/landing/profile.jpg",
	Title:    "Ioannis Savvaidis",
	Details:  "As a Site Reliability Engineer with over ten years of experience, I specialize in building robust, scalable digital infrastructure. Currently advancing my expertise through a master’s program in Quantum Computing, my research focuses on the convergence of mathematics, computational theory, and music—particularly investigating how quantum principles can innovate sound synthesis and musical composition. Bridging technology and artistry, I am dedicated to leveraging interdisciplinary approaches to drive innovation, enhance problem-solving, and expand the frontiers of both engineering and creative expression.",
}

// ServeStatic handles serving frontend files and routes
func ServeStatic(w http.ResponseWriter, r *http.Request) {
	path := filepath.Join("./public", r.URL.Path)
	_, err := os.Stat(path)

	// If the file doesn't exist or is a directory, serve index.html for frontend routing
	if os.IsNotExist(err) || r.URL.Path == "/" || strings.HasPrefix(r.URL.Path, "/works") || strings.HasPrefix(r.URL.Path, "/releases") || strings.HasPrefix(r.URL.Path, "/info") || strings.HasPrefix(r.URL.Path, "/concerts") {
		http.ServeFile(w, r, "./public/index.html")
	} else {
		// Otherwise, serve the actual static file (CSS, JS)
		http.ServeFile(w, r, path)
	}
}

func serveIoaiaaiiContent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ioaiaaii)
}

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

func serveReleasesContent(w http.ResponseWriter, r *http.Request) {
	if releaseErr != nil {
		http.Error(w, releaseErr.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(releases)
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

func serveLiveContent(w http.ResponseWriter, r *http.Request) {
	if liveErr != nil {
		http.Error(w, liveErr.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(livePerformances)
}

func loadWebsiteProjects(filePath string) ([]WebsiteProjectEntry, error) {
	data, err := os.ReadFile(filePath)
	if err != nil {
		return nil, fmt.Errorf("failed to read JSON file: %w", err)
	}
	// Debug data
	// fmt.Println("JSON Content:", string(data))

	var projects WebsiteProjects
	if err := json.Unmarshal(data, &projects); err != nil {
		return nil, fmt.Errorf("failed to parse JSON: %w", err)
	}

	return projects.Items, nil
}

// ServeProjectsContent is the HTTP handler for the /api/projects endpoint
func serveProjectsContent(w http.ResponseWriter, r *http.Request) {
	if websiteProjectsError != nil {
		http.Error(w, websiteProjectsError.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(websiteProjects)
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

func serveInfoContent(w http.ResponseWriter, r *http.Request) {
	if infoResumeError != nil {
		http.Error(w, websiteProjectsError.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(infoResume)
}

func serveReleaseDetails(w http.ResponseWriter, r *http.Request) {
	// Get selected release title from query parameter
	title := r.URL.Query().Get("title")

	var releaseDetails Release
	for _, release := range releases {
		if release.Title == title {
			releaseDetails = release
			break
		}
	}

	if releaseDetails.Title == "" {
		// If no matching release found, return an error response
		http.Error(w, "Release not found", http.StatusNotFound)
		return
	}

	// Encode and send the release details as JSON response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(releaseDetails)
}

// Function to get release by title
func getReleaseByTitle(w http.ResponseWriter, r *http.Request) {
	// Extract title from URL path
	pathParts := strings.Split(r.URL.Path, "/")
	if len(pathParts) < 4 {
		http.Error(w, "Invalid request URL", http.StatusBadRequest)
		return
	}
	title := strings.ToLower(pathParts[3])

	// Find the release in the list
	for _, release := range releases {
		if strings.ToLower(release.Title) == title {
			// Return the release as JSON
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(release)
			return
		}
	}

	// If release not found, return an error message
	http.Error(w, "Release not found", http.StatusNotFound)
}

func main() {

	websiteProjects, websiteProjectsError = loadWebsiteProjects("./data/projects.json")
	infoResume, infoResumeError = loadInfo("./data/info.json")
	releases, releaseErr = loadReleases("./data/releases.json")
	// Load live performances once at startup
	livePerformances, liveErr = loadLive("./data/live.json")

	http.HandleFunc("/api/ioaiaaii", serveIoaiaaiiContent)
	http.HandleFunc("/api/info", serveInfoContent)
	http.HandleFunc("/api/projects", serveProjectsContent)
	http.HandleFunc("/api/releases", serveReleasesContent)
	http.HandleFunc("/api/live", serveLiveContent)
	http.HandleFunc("/api/release", serveReleaseDetails)
	http.HandleFunc("/api/releases/", getReleaseByTitle)

	// Serve static files and frontend routes
	http.HandleFunc("/", ServeStatic)

	log.Println("Server started on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
