package main

import (
	"log"
	"time"

	"ioaiaaii.net/internal/controller/httpcontroller"
	"ioaiaaii.net/internal/infrastructure/cache"
	"ioaiaaii.net/internal/infrastructure/persistence/storage"
	"ioaiaaii.net/internal/infrastructure/transport/httpserver"
	"ioaiaaii.net/internal/usecase/content"
	"ioaiaaii.net/website/data"
)

func main() {

	var dataConf data.Config

	err := dataConf.LoadData()
	if err != nil {
		log.Fatalf("Error loading data: %v", err)
	}

	// 2. Initialize the repository (file-based repository in this case)
	fetchedData := storage.NewFileContent(dataConf)

	// Add in-memory caching layer with a 10-minute TTL
	cachedRepo := cache.NewInMemoryCacheRepository(fetchedData, 30*time.Minute)

	// 3. Initialize the use case by injecting the repository
	contentUsecase := content.NewContentUsecase(cachedRepo)

	// 4. Initialize the HTTP handler (controller) by injecting the use case
	contentHandler := httpcontroller.NewContentHandler(contentUsecase)

	// 5. Setup and start the HTTP server
	app := httpserver.SetupHTTPServer(contentHandler)
	// 6. Start the HTTP server
	log.Fatal(app.Listen(":8080"))
}
