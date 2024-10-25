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
include ${OPERATOR_PATH}/makefiles/package.mk
include ${OPERATOR_PATH}/makefiles/security.mk

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

## local-docker-lint-all, fetching non-local target and linting all project's images
.PHONY: local-docker-lint-all
local-docker-lint-all: 
	make docker-lint DOCKER_IMAGE=api 
	make docker-lint DOCKER_IMAGE=frontend

## local-docker-build-all, fetching non-local target and building all project's images
.PHONY: local-docker-build-all
local-docker-build-all: 
	make docker-image DOCKER_IMAGE=api 
	make docker-image DOCKER_IMAGE=frontend

## local-docker-push-all, fetching non-local target and building all project's images
.PHONY: local-docker-push-all
local-docker-push-all: 
	make docker-push DOCKER_IMAGE_REPO="europe-west3-docker.pkg.dev/micro-infra/micro-repo" DOCKER_IMAGE=api
	make docker-push DOCKER_IMAGE_REPO="europe-west3-docker.pkg.dev/micro-infra/micro-repo"  DOCKER_IMAGE=frontend

## local-docker-run-all, fetching non-local target docker-run and run all images in the backround
.PHONY: local-docker-run-all
local-docker-run-all: 
	make docker-run DOCKER_IMAGE=api
	make docker-run DOCKER_IMAGE=frontend
