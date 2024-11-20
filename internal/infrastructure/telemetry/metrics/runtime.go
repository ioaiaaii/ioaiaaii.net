package metrics

import (
	"time"

	"go.opentelemetry.io/contrib/instrumentation/runtime"
)

// https://github.com/open-telemetry/opentelemetry-go-contrib/blob/main/instrumentation/README.md#instrumentation-packages
func initRuntimeInstrumentation() error {
	err := runtime.Start(runtime.WithMinimumReadMemStatsInterval(30 * time.Second))

	if err != nil {
		return err
	}

	return nil

}
