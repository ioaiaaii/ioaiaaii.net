import { apiLatencyHistogram, apiErrorCounter, apiRequestCounter } from './otel-metrics';

// Save a reference to the original fetch function
const originalFetch = window.fetch;

// Monkey-patch the fetch function
window.fetch = async function (...args) {
  const [resource, config] = args;

  // Start time for latency measurement
  const startTime = performance.now();

  // Increment the request counter
  apiRequestCounter.add(1, {
    endpoint: resource,
    method: config?.method || 'GET',
  });

  try {
    const response = await originalFetch.apply(this, args);

    // Calculate latency
    const latency = performance.now() - startTime;

    // Record the latency in the histogram
    apiLatencyHistogram.record(latency, {
      endpoint: resource,
      method: config?.method || 'GET',
      statusCode: response.status,
    });

    return response;
  } catch (error) {
    // Calculate latency
    const latency = performance.now() - startTime;

    // Record the latency in the histogram
    apiLatencyHistogram.record(latency, {
      endpoint: resource,
      method: config?.method || 'GET',
      statusCode: 'network_error',
    });

    // Increment the error counter
    apiErrorCounter.add(1, {
      endpoint: resource,
      method: config?.method || 'GET',
      statusCode: 'network_error',
    });

    throw error;
  }
};
