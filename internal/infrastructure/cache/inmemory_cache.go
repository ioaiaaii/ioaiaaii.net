package cache

import (
	"fmt"
	"sync"
	"time"

	"ioaiaaii.net/internal/entity"
	"ioaiaaii.net/internal/repository"
)

// CacheItem struct represents a single cache entry for an entity
type CacheItem struct {
	Data       interface{} // Data for the cache
	LastUpdate time.Time   // Timestamp of the last cache update
}

// InMemoryCacheRepository implements caching over an underlying repository.
type InMemoryCacheRepository struct {
	repo       repository.ContentRepository // The actual content repository (e.g., file-based or DB)
	cacheTTL   time.Duration                // Time-to-live for cache entries
	cacheMutex sync.RWMutex                 // Mutex for read-write operations on the cache
	cache      map[string]*CacheItem        // Map holding cached data for each entity type
}

// NewInMemoryCacheRepository initializes the cache with TTL and underlying repo.
func NewInMemoryCacheRepository(repo repository.ContentRepository, cacheTTL time.Duration) *InMemoryCacheRepository {
	return &InMemoryCacheRepository{
		repo:     repo,
		cacheTTL: cacheTTL,
		cache:    make(map[string]*CacheItem), // Initialize an empty cache
	}
}

// checkCacheExpiry checks whether the cache for a given key (entity type) has expired.
func (c *InMemoryCacheRepository) checkCacheExpiry(key string) bool {
	c.cacheMutex.RLock()
	defer c.cacheMutex.RUnlock()

	cacheItem, exists := c.cache[key]
	if !exists || time.Since(cacheItem.LastUpdate) > c.cacheTTL {
		return true // Cache is expired or doesn't exist
	}
	return false
}

// getFromCache safely retrieves an item from the cache.
func (c *InMemoryCacheRepository) getFromCache(key string) (interface{}, bool) {
	c.cacheMutex.RLock()
	defer c.cacheMutex.RUnlock()

	cacheItem, exists := c.cache[key]
	if exists {
		return cacheItem.Data, true
	}
	return nil, false
}

// updateCache updates the cache for a given key with new data.
func (c *InMemoryCacheRepository) updateCache(key string, data interface{}) {
	c.cacheMutex.Lock()
	defer c.cacheMutex.Unlock()

	c.cache[key] = &CacheItem{
		Data:       data,
		LastUpdate: time.Now(), // Mark the current time as the last update time
	}
}

// AsyncCacheUpdate performs an asynchronous cache update without blocking the main thread.
func (c *InMemoryCacheRepository) AsyncCacheUpdate(key string, loadFunc func() (interface{}, error)) {
	go func() {
		data, err := loadFunc() // Fetch fresh data from the underlying repository
		if err != nil {
			fmt.Printf("Failed to update cache for %s: %v\n", key, err)
			return
		}
		c.updateCache(key, data) // Safely update the cache
	}()
}

// LoadResume loads Resume data either from the cache or the underlying repository.
func (c *InMemoryCacheRepository) LoadResume() (entity.Resume, error) {
	const key = "resume"

	// Try fetching data from cache
	data, found := c.getFromCache(key)
	if found && !c.checkCacheExpiry(key) {
		fmt.Println("Serving Resume from cache")
		return data.(entity.Resume), nil
	}

	// Serve stale cache and refresh in the background
	// expired but still contains data)
	if found {
		fmt.Println("Serving stale Resume from cache, refreshing...")
		c.AsyncCacheUpdate(key, func() (interface{}, error) {
			return c.repo.LoadResume() // Fetch fresh data asynchronously
		})
		return data.(entity.Resume), nil
	}

	// Cache miss: block and fetch fresh data from the repository
	fmt.Println("Cache miss for Resume, loading from repository")
	resume, err := c.repo.LoadResume()
	if err != nil {
		return entity.Resume{}, err
	}
	c.updateCache(key, resume) // Cache the newly fetched data
	return resume, nil
}

// LoadReleases loads Release data either from the cache or the underlying repository.
func (c *InMemoryCacheRepository) LoadReleases() ([]entity.Release, error) {
	const key = "releases"

	// Try fetching data from cache
	data, found := c.getFromCache(key)
	if found && !c.checkCacheExpiry(key) {
		fmt.Println("Serving Releases from cache")
		return data.([]entity.Release), nil
	}

	// Serve stale cache and refresh in the background
	if found {
		fmt.Println("Serving stale Releases from cache, refreshing...")
		c.AsyncCacheUpdate(key, func() (interface{}, error) {
			return c.repo.LoadReleases() // Fetch fresh data asynchronously
		})
		return data.([]entity.Release), nil
	}

	// Cache miss: block and fetch fresh data from the repository
	fmt.Println("Cache miss for Releases, loading from repository")
	releases, err := c.repo.LoadReleases()
	if err != nil {
		return nil, err
	}
	c.updateCache(key, releases) // Cache the newly fetched data
	return releases, nil
}

// LoadLivePerformances loads LivePerformance data either from the cache or the underlying repository.
func (c *InMemoryCacheRepository) LoadLivePerformances() ([]entity.LivePerformance, error) {
	const key = "livePerformances"

	// Try fetching data from cache
	data, found := c.getFromCache(key)
	if found && !c.checkCacheExpiry(key) {
		fmt.Println("Serving Live Performances from cache")
		return data.([]entity.LivePerformance), nil
	}

	// Serve stale cache and refresh in the background
	if found {
		fmt.Println("Serving stale Live Performances from cache, refreshing...")
		c.AsyncCacheUpdate(key, func() (interface{}, error) {
			return c.repo.LoadLivePerformances() // Fetch fresh data asynchronously
		})
		return data.([]entity.LivePerformance), nil
	}

	// Cache miss: block and fetch fresh data from the repository
	fmt.Println("Cache miss for Live Performances, loading from repository")
	livePerformances, err := c.repo.LoadLivePerformances()
	if err != nil {
		return nil, err
	}
	c.updateCache(key, livePerformances) // Cache the newly fetched data
	return livePerformances, nil
}

// LoadWebsiteProjects loads WebsiteProject data either from the cache or the underlying repository.
func (c *InMemoryCacheRepository) LoadWebsiteProjects() ([]entity.WebsiteProjectEntry, error) {
	const key = "websiteProjects"

	// Try fetching data from cache
	data, found := c.getFromCache(key)
	if found && !c.checkCacheExpiry(key) {
		fmt.Println("Serving Website Projects from cache")
		return data.([]entity.WebsiteProjectEntry), nil
	}

	// Serve stale cache and refresh in the background
	if found {
		fmt.Println("Serving stale Website Projects from cache, refreshing...")
		c.AsyncCacheUpdate(key, func() (interface{}, error) {
			return c.repo.LoadWebsiteProjects() // Fetch fresh data asynchronously
		})
		return data.([]entity.WebsiteProjectEntry), nil
	}

	// Cache miss: block and fetch fresh data from the repository
	fmt.Println("Cache miss for Website Projects, loading from repository")
	projects, err := c.repo.LoadWebsiteProjects()
	if err != nil {
		return nil, err
	}
	c.updateCache(key, projects) // Cache the newly fetched data
	return projects, nil
}
