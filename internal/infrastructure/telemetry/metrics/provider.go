package metrics

import (
	"context"
	"fmt"
	"time"

	"go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetricgrpc"
	"go.opentelemetry.io/otel/sdk/metric"
	"go.opentelemetry.io/otel/sdk/resource"
)

// NewMeterProvider sets up the MeterProvider with an OTLP metric exporter.
// If the OTEL Collector is not running, it falls back to a no-export configuration.
func InitMeterProvider(res *resource.Resource, ctx context.Context, otelEndpoint string) (*metric.MeterProvider, error) {

	// // Configure OTLP options based on endpoint scheme
	// opts := []otlpmetricgrpc.Option{
	// 	otlpmetricgrpc.WithEndpoint(otelEndpoint),
	// 	otlpmetricgrpc.WithInsecure(), // Adjust for TLS if necessary
	// }

	// Attempt to create the OTLP exporter
	metricExporter, err := otlpmetricgrpc.New(ctx, otlpmetricgrpc.WithInsecure())
	if err != nil {
		// Return the error
		return nil, fmt.Errorf("failed to create metrics exporter: %w", err)
	}
	// Create the MeterProvider with the OTLP exporter
	meterProvider := metric.NewMeterProvider(
		metric.WithResource(res),
		metric.WithReader(metric.NewPeriodicReader(metricExporter,
			// Default interval is 1 minute; adjust as needed
			metric.WithInterval(60*time.Second))),
	)

	return meterProvider, nil
}

// RegisterMetrics initializes runtime metrics or other custom metrics.
func RegisterMetrics() error {
	err := initRuntimeInstrumentation()
	if err != nil {
		return err
	}
	return nil
}
