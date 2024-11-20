package telemetry

import (
	"context"
	"fmt"
	"log/slog"

	"go.opentelemetry.io/contrib/bridges/otelslog"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/log/global"
	"go.opentelemetry.io/otel/propagation"
	"go.opentelemetry.io/otel/sdk/resource"
	semconv "go.opentelemetry.io/otel/semconv/v1.26.0"
	"ioaiaaii.net/config"
	"ioaiaaii.net/internal/infrastructure/telemetry/logs"
	"ioaiaaii.net/internal/infrastructure/telemetry/metrics"
	"ioaiaaii.net/internal/infrastructure/telemetry/traces"
)

// SetupOTelSDK initializes OpenTelemetry metrics.
func SetupOTelSDK(ctx context.Context, otelConfig config.OtelConfig) (func(context.Context) error, error) {
	// If telemetry is disabled, return a no-op shutdown function
	if !otelConfig.EnableTelemetry {
		slog.Info("OTEL Disabled...")
		return func(context.Context) error { return nil }, nil
	}
	slog.InfoContext(ctx, "Setting up OTEL...", "otel-collector", otelConfig.OtelEndpoint, "service-name", otelConfig.ServiceName)

	// Create resource describing the application.
	res, err := resource.New(ctx,
		resource.WithAttributes(
			// Service name used in observability backends
			semconv.ServiceNameKey.String(otelConfig.ServiceName),
		),
	)
	if err != nil {
		return nil, fmt.Errorf("failed to create resource: %w", err)
	}
	// Set propagator for trace context propagation (even if traces are not used).
	otel.SetTextMapPropagator(newPropagator())

	// Initialize the TraceProvider for metrics.
	traceProvider, err := traces.InitTracerProvider(res, ctx, otelConfig.OtelEndpoint)
	if err != nil {
		return nil, fmt.Errorf("failed to initialize MeterProvider: %w", err)
	}
	otel.SetTracerProvider(traceProvider)

	// Initialize the MeterProvider for metrics.
	meterProvider, err := metrics.InitMeterProvider(res, ctx, otelConfig.OtelEndpoint)
	if err != nil {
		return nil, fmt.Errorf("failed to initialize MeterProvider: %w", err)
	}

	metrics.RegisterMetrics()
	otel.SetMeterProvider(meterProvider)

	// Initialize the LoggerProvider for logging.
	loggerProvider, err := logs.InitLoggerProvider(res, ctx, otelConfig.OtelEndpoint)
	if err != nil {
		return nil, fmt.Errorf("failed to initialize LoggerProvider: %w", err)
	}

	// Register as global logger provider so that it can be accessed global.LoggerProvider.
	// Most log bridges use the global logger provider as default.
	// If the global logger provider is not set then a no-op implementation
	// is used, which fails to generate data.
	global.SetLoggerProvider(loggerProvider)
	//https://docs.honeycomb.io/send-data/logs/opentelemetry/sdk/go/
	// Instantiate a new slog logger
	logger := otelslog.NewLogger(otelConfig.ServiceName)
	slog.SetDefault(logger) // Set as the default slog logger globally.

	// Combine shutdown function.
	// Combine shutdown function.
	return func(ctx context.Context) error {
		var shutdownErr error

		// Shutdown MeterProvider
		if err := meterProvider.Shutdown(ctx); err != nil {
			slog.Error("Failed to shutdown MeterProvider", "error", err)
			shutdownErr = err // Record the error but proceed to the next shutdown
		}

		// Shutdown LoggerProvider
		if err := loggerProvider.Shutdown(ctx); err != nil {
			slog.Error("Failed to shutdown LoggerProvider", "error", err)
			shutdownErr = err // Record the error
		}
		slog.Info("OTEL Flushing finished....")
		return shutdownErr // Return any recorded errors
	}, nil
}

// newPropagator creates and configures a composite propagator.
func newPropagator() propagation.TextMapPropagator {
	return propagation.NewCompositeTextMapPropagator(
		propagation.TraceContext{},
		propagation.Baggage{},
	)
}
