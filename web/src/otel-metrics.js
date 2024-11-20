import { MeterProvider, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { metrics, diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

// Enable diagnostic logging
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

// Define a resource to identify your service

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: 'ioaiaaii-front',
  [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
  [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: 'production',
});

// Configure the metric exporter to send data to the OpenTelemetry Collector
const metricExporter = new OTLPMetricExporter({
  url: 'http://localhost:4318/v1/metrics', // Ensure this matches your Collector's endpoint
  headers: {}, // Add any necessary headers here
});

// Create a metric reader to periodically export metrics
const metricReader = new PeriodicExportingMetricReader({
  exporter: metricExporter,
  exportIntervalMillis: 120000, //default every 1m
});

// Set up the MeterProvider with the resource and metric reader
const meterProvider = new MeterProvider({
  resource: resource,
  readers: [metricReader],
});

// Register the MeterProvider globally
metrics.setGlobalMeterProvider(meterProvider);

// Get a meter instance to create and record metrics
const meter = metrics.getMeter('ioaiaaii-front', '1.0.0');

// Define key metrics for SRE

// Performance Metrics 
// https://web.dev/articles/user-centric-performance-metrics
export const pageLoadTimeHistogram = meter.createHistogram('page_load_time', {
  description: 'Measures the total time it takes for a page to fully load',
  unit: 'ms',
});

export const fcpHistogram = meter.createHistogram('first_contentful_paint', {
  description: 'Measures the time to first contentful paint',
  unit: 'ms',
});

export const lcpHistogram = meter.createHistogram('largest_contentful_paint', {
  description: 'Measures the time to largest contentful paint',
  unit: 'ms',
});

export const pageViewCounter = meter.createCounter('page_view_count', {
  description: 'Counts the number of page views',
});


// Error Metrics
export const jsErrorCounter = meter.createCounter('js_error_count', {
  description: 'Counts the number of uncaught JavaScript errors',
});

export const resourceErrorCounter = meter.createCounter('resource_error_count', {
  description: 'Counts the number of resource load failures',
});


// Network Performance Metrics
export const apiLatencyHistogram = meter.createHistogram('api_call_latency', {
  description: 'Measures the latency of API calls',
  unit: 'ms',
});

export const apiErrorCounter = meter.createCounter('api_error_count', {
  description: 'Counts the number of failed API calls',
});

export const apiRequestCounter = meter.createCounter('api_request_count', {
  description: 'Counts the number of API requests made',
});

// Export the meter for additional metric definitions if needed
export { meter };
