package main

import (
	"log"

	"ioaiaaii.net/config"
	"ioaiaaii.net/internal/controller/httpcontroller"
	"ioaiaaii.net/internal/infrastructure/persistence/file"
	"ioaiaaii.net/internal/infrastructure/transport/httpserver"
	"ioaiaaii.net/internal/usecase/content"
)

func main() {
	// 1. Load configuration (from config package)
	conf, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	// 2. Initialize the repository (file-based repository in this case)
	repo := file.NewFileContent(conf.ResumeFile, conf.ReleasesFile, conf.LiveFile, conf.ProjectsFile)

	// 3. Initialize the use case by injecting the repository
	contentUsecase := content.NewContentUsecase(repo)

	// 4. Initialize the HTTP handler (controller) by injecting the use case
	contentHandler := httpcontroller.NewContentHandler(contentUsecase)

	// 5. Setup and start the HTTP server
	app := httpserver.SetupHTTPServer(contentHandler)

	// 6. Start the HTTP server
	log.Fatal(app.Listen(":8080"))
}
