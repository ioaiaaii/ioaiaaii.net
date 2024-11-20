import router from './router';
import {
  pageLoadTimeHistogram,
  fcpHistogram,
  lcpHistogram,
  jsErrorCounter,
  resourceErrorCounter,
  pageViewCounter,
} from './otel-metrics';


// Get the current route
function getCurrentRouteName() {
  const currentRoute = router.currentRoute.value;
  return currentRoute.name || currentRoute.path || 'unknown';
}

// Record the page load time when the window 'load' event fires
window.addEventListener('load', () => {
  const navigationEntry = performance.getEntriesByType('navigation')[0];
  if (navigationEntry) {
    const loadTime = navigationEntry.loadEventEnd - navigationEntry.startTime;
    // Record the load time in the histogram
    pageLoadTimeHistogram.record(loadTime, {
      route: getCurrentRouteName(),
    });
  }
});

// Observe performance entries for 'paint' events (First Contentful Paint)
if ('PerformanceObserver' in window) {
  const fcpObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntriesByName('first-contentful-paint')) {
      const fcpTime = entry.startTime;
      // Record the FCP time in the histogram
      fcpHistogram.record(fcpTime,{
        route: getCurrentRouteName(),
      });
    }
  });
  fcpObserver.observe({ type: 'paint', buffered: true });

  // Observe 'largest-contentful-paint' events (Largest Contentful Paint)
  const lcpObserver = new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      const lcpTime = entry.startTime;
      // Record the LCP time in the histogram
      lcpHistogram.record(lcpTime,{
        route: getCurrentRouteName(),
      });
    }
  });
  lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
}

// ERROR METRICS HANDLERS

// Listen for uncaught JavaScript errors
window.addEventListener('error', (event) => {
  if (event.target && event.target !== window) {
    handleResourceError(event);
  } else {
    // Increment the JavaScript error counter, respect user data
    jsErrorCounter.add(1, {
      errorType: event.error ? event.error.name : 'Error',
    });
  }
}, true);

// Listen for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  // Increment the JavaScript error counter, avoid sensitive data
  jsErrorCounter.add(1, {
    errorType: event.reason ? event.reason.name || 'UnhandledRejection' : 'UnhandledRejection',
  });
});

// Function to handle resource load errors
function handleResourceError(event) {
  const target = event.target || event.srcElement;
  if (target) {
    const resourceType = target.tagName;
    const resourceUrl = target.currentSrc || target.href;
    // Sanitize the resource URL
    const sanitizedUrl = sanitizeUrl(resourceUrl);
    // Increment the resource error counter
    resourceErrorCounter.add(1, {
      resourceType,
      resourceUrl: sanitizedUrl,
    });
  }
}

// Record a page view when the route changes
router.afterEach((to) => {
  // Increment the page view counter
  pageViewCounter.add(1, {
    route: getCurrentRouteName(),
  });
});

