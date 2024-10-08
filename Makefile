override OPERATOR_PATH := repo-operator
override OPENAPI_FILE := apps/bff/openapi.yaml
override OPENAPI_DOCS_PATH := docs/OpenAPI

include ${OPERATOR_PATH}/makefiles/base.mk
include ${OPERATOR_PATH}/makefiles/openapi.mk


## local-dev-run, runs bff and backend locally in dev mode
.PHONY: local-dev-run
local-dev-run:
	@echo "Starting npm in frontend and Go in bff in parallel..."
	@(cd apps/frontend && npm run dev) & \
	(cd apps/bff && go run main.go) & \
	wait
	@echo "Both processes have finished."
