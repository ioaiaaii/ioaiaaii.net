package logs

import (
	"context"

	"go.opentelemetry.io/otel/exporters/otlp/otlplog/otlploggrpc"
	"go.opentelemetry.io/otel/sdk/log"
	"go.opentelemetry.io/otel/sdk/resource"
)

// InitLoggerProvider initializes the LoggerProvider using the OTLP exporter.
func InitLoggerProvider(res *resource.Resource, ctx context.Context, otelEndpoint string) (*log.LoggerProvider, error) {

	// Create the OTLP log exporter using the provided gRPC connection.
	exporter, err := otlploggrpc.New(ctx, otlploggrpc.WithInsecure())
	if err != nil {
		return nil, err
	}

	// Create a batch processor for logs.
	processor := log.NewBatchProcessor(exporter)

	// Create the LoggerProvider with the processor and resource.
	provider := log.NewLoggerProvider(
		log.WithResource(res),
		log.WithProcessor(processor),
	)

	return provider, nil
}
