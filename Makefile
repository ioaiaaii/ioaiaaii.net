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
include ${OPERATOR_PATH}/makefiles/helm.mk
include ${OPERATOR_PATH}/makefiles/otel.mk
include ${OPERATOR_PATH}/makefiles/changelog.mk


# +++ Local configuration starts, hit `make help` to fetch all available targets
WEBSITE_PATH=web


## local-dev, runs bff and backend locally in dev mode
.PHONY: local-dev
local-dev:
	@echo "Starting npm in frontend and Go in bff in parallel..."
	@(cd ${WEBSITE_PATH} && npm run dev) & \
	(cd cmd/ioaiaaii.net/ && go run main.go) & \
	wait
	@echo "Both processes have finished."

## website-build, builds vite project
website-lint:
	@cd ${WEBSITE_PATH} && npm run lint

## website-build, builds vite project
website-build:
	@cd ${WEBSITE_PATH} && npm run build

## local-preview, runs bff and backend in preview mode (production)
.PHONY: local-preview
local-preview: website-build
	@echo "Starting npm in frontend and Go in bff in parallel..."
	@(cd ${WEBSITE_PATH} && npm run preview) & \
	(cd cmd/ioaiaaii.net/ && go run main.go) & \
	wait
	@echo "Both processes have finished."

## local-docker-lint, fetching non-local target and linting all project's images
.PHONY: local-docker-lint
local-docker-lint: 
	make docker-lint DOCKER_IMAGE=ioaiaaii 

## local-docker-build, fetching non-local target and building all project's images
.PHONY: local-docker-build
local-docker-build: 
	make docker-image DOCKER_IMAGE=ioaiaaii 

## local-docker-push, fetching non-local target and building all project's images
.PHONY: local-docker-push
local-docker-push: 
	make docker-push DOCKER_IMAGE_REPO="europe-west3-docker.pkg.dev/micro-infra/micro-repo" DOCKER_IMAGE=ioaiaaii

## local-docker-run, fetching non-local target docker-run and run all images in the backround
.PHONY: local-docker-run
local-docker-run: 
	make docker-run DOCKER_IMAGE=ioaiaaii
