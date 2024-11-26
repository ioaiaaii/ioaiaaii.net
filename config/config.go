package config

import (
	"os"
	"strconv"
	"time"
)

// Default configuration values
const (
	DefaultApiHTTPPort                  = "8080"
	DefaultAPIEnv                       = "production"
	DefaultAPIHTTPServerTimeout         = 30
	DefaultAPIHTTPServerShutdownTimeout = 5
	DefaultTelemetryServiceName         = "ioaiaaii-api"
	DefaultTelemetryShutdownTimeout     = 10
)

// APIConfig holds configurations related to the HTTP API.
type APIConfig struct {
	HTTPPort                  string
	HTTPServerTimeout         time.Duration
	HTTPServerShutdownTimeout time.Duration
	StoreEndpoint             string
}

// OtelConfig holds configurations related to OpenTelemetry.
type OtelConfig struct {
	EnableTelemetry bool   // Whether to enable OTel metrics
	OtelEndpoint    string // OTel exporter endpoint
	ServiceName     string // Metric Service Name
	ShutdownTimeout int    // Timeout for graceful shutdown (in seconds)
}

// Config holds the consolidated application-wide configuration.
type Config struct {
	APIConfig  APIConfig
	OtelConfig OtelConfig
}

// LoadConfig initializes the Config struct based on environment variables.
func LoadConfig() Config {
	return Config{
		APIConfig:  loadAPIConfig(),
		OtelConfig: loadOtelConfig(),
	}
}

// loadAPIConfig initializes APIConfig based on environment variables.
func loadAPIConfig() APIConfig {
	return APIConfig{
		HTTPPort:                  getEnv("API_HTTP_PORT", DefaultApiHTTPPort),
		HTTPServerTimeout:         time.Duration(getEnvAsInt("API_HTTP_SERVER_TIMEOUT", DefaultAPIHTTPServerTimeout)) * time.Second,
		HTTPServerShutdownTimeout: time.Duration(getEnvAsInt("API_HTTP_SERVER_SHUTDOWN_TIMEOUT", DefaultAPIHTTPServerShutdownTimeout)) * time.Second,
	}
}

// loadOtelConfig initializes OtelConfig based on environment variables.
func loadOtelConfig() OtelConfig {
	otelEndpoint := os.Getenv("OTEL_EXPORTER_OTLP_ENDPOINT")
	enableTelemetry := os.Getenv("OTEL_ENABLED") == "true" // Enable telemetry if the endpoint is set

	return OtelConfig{
		EnableTelemetry: enableTelemetry,
		OtelEndpoint:    otelEndpoint,
		ServiceName:     getEnv("OTEL_SERVICE_NAME", DefaultTelemetryServiceName),
		ShutdownTimeout: getEnvAsInt("OTEL_SHUTDOWN_TIMEOUT", DefaultTelemetryShutdownTimeout),
	}
}

// getEnv retrieves the value of the environment variable or returns a default value.
func getEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}

// getEnvAsInt retrieves an environment variable as an integer or returns a default value.
func getEnvAsInt(key string, defaultValue int) int {
	if value, exists := os.LookupEnv(key); exists {
		if intValue, err := strconv.Atoi(value); err == nil {
			return intValue
		}
	}
	return defaultValue
}
