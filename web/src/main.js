import './assets/css/tailwind.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Check if OTEL_ENABLE is true
const isOtelEnabled = import.meta.env.VITE_OTEL_ENABLE === 'True';

if (isOtelEnabled) {
    console.log('OpenTelemetry is enabled');
    import('./otel-metrics'); // Dynamically import OpenTelemetry configuration
    import('./metrics-handlers'); // Load additional metrics handlers
    import('./fetch-interceptor'); // Load fetch interceptor for tracing HTTP requests
} else {
    console.log('OpenTelemetry is disabled');
}

const app = createApp(App);

app.use(router);
app.mount('#app');
