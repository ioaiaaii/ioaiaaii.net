GOPRIVATE=ioaiaaii.net
GONOSUMDB=ioaiaaii.net
export

# +++ Overrides to Repo Operator
override OPERATOR_PATH := repo-operator
override OPENAPI_FILE := api/OpenAPI/openapi.yaml
override OPENAPI_DOCS_PATH := docs/api

# +++ Include make files from Repo Operator
include ${OPERATOR_PATH}/makefiles/base.mk
include ${OPERATOR_PATH}/makefiles/openapi.mk
include ${OPERATOR_PATH}/makefiles/golang.mk

# +++ Local configuration starts, hit `make help` to fetch all available targets


## local-dev, runs bff and backend locally in dev mode
.PHONY: local-dev-run
local-dev:
	@echo "Starting npm in frontend and Go in bff in parallel..."
	@(cd website && npm run dev) & \
	(cd cmd/ioaiaaii.net/ && go run main.go) & \
	wait
	@echo "Both processes have finished."

## website-build, builds vite project
website-build:
	@cd website && npm run build

## local-preview, runs bff and backend in preview mode (production)
.PHONY: local-preview
local-preview: website-build
	@echo "Starting npm in frontend and Go in bff in parallel..."
	@(cd website && npm run preview) & \
	(cd cmd/ioaiaaii.net/ && go run main.go) & \
	wait
	@echo "Both processes have finished."
