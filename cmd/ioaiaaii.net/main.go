package main

import (
	"log"
	"time"

	"ioaiaaii.net/config"
	"ioaiaaii.net/internal/controller/httpcontroller"
	"ioaiaaii.net/internal/infrastructure/cache"
	"ioaiaaii.net/internal/infrastructure/persistence/file"
	"ioaiaaii.net/internal/infrastructure/transport/httpserver"
	"ioaiaaii.net/internal/usecase/content"
)

func main() {

	conf, err := config.LoadConfig()

	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	// 2. Initialize the repository (file-based repository in this case)
	fileRepo := file.NewFileContent(conf.ResumeFile, conf.ReleasesFile, conf.LiveFile, conf.ProjectsFile)
	// Add in-memory caching layer with a 10-minute TTL
	cachedRepo := cache.NewInMemoryCacheRepository(fileRepo, 30*time.Minute)

	// 3. Initialize the use case by injecting the repository
	contentUsecase := content.NewContentUsecase(cachedRepo)

	// 4. Initialize the HTTP handler (controller) by injecting the use case
	contentHandler := httpcontroller.NewContentHandler(contentUsecase)

	// 5. Setup and start the HTTP server
	app := httpserver.SetupHTTPServer(contentHandler)

	// 6. Start the HTTP server
	log.Fatal(app.Listen(":8080"))
}
