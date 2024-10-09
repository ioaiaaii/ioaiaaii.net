# +++ Overrides to Repo Operator
override OPERATOR_PATH := repo-operator
override OPENAPI_FILE := api/OpenAPI/openapi.yaml
override OPENAPI_DOCS_PATH := docs/OpenAPI

# +++ Include make files from Repo Operator
include ${OPERATOR_PATH}/makefiles/base.mk
include ${OPERATOR_PATH}/makefiles/openapi.mk
include ${OPERATOR_PATH}/makefiles/golang.mk

# +++ Local configuration starts, hit `make help` to fetch all available targets

## local-dev-run, runs bff and backend locally in dev mode
.PHONY: local-dev-run
local-dev-run:
	@echo "Starting npm in frontend and Go in bff in parallel..."
	@(cd website && npm run dev) & \
	(cd cmd/ioaiaaii.net/ && go run main.go) & \
	wait
	@echo "Both processes have finished."
