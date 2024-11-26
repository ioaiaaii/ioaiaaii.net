package traces

import (
	"context"
	"fmt"

	"go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracegrpc"
	"go.opentelemetry.io/otel/sdk/resource"
	"go.opentelemetry.io/otel/sdk/trace"
)

// InitTracerProvider sets up the TracerProvider with an OTLP trace exporter.
func InitTracerProvider(res *resource.Resource, ctx context.Context, otelEndpoint string) (*trace.TracerProvider, error) {
	// Configure OTLP options based on endpoint scheme
	traceExporter, err := otlptracegrpc.New(ctx, otlptracegrpc.WithInsecure())
	if err != nil {
		return nil, fmt.Errorf("failed to create trace exporter: %w", err)
	}

	// Create TracerProvider
	tracerProvider := trace.NewTracerProvider(
		trace.WithBatcher(traceExporter),
		trace.WithResource(res),
	)

	return tracerProvider, nil
}
