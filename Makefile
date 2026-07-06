# +++ Overrides to Repo Operator
override OPERATOR_PATH := repo-operator

# +++ Shared makefiles from Repo Operator (kept as a submodule)
include ${OPERATOR_PATH}/makefiles/base.mk
include ${OPERATOR_PATH}/makefiles/changelog.mk

# +++ Static site — Vue 3 + Vite, deployed to Cloudflare Pages.
# Hit `make help` to list all targets.
WEBSITE_PATH=web

## website-install, installs frontend deps from the lockfile (npm ci)
.PHONY: website-install
website-install:
	@cd ${WEBSITE_PATH} && npm ci

## website-dev, runs the Vite dev server with hot reload
.PHONY: website-dev
website-dev:
	@cd ${WEBSITE_PATH} && npm run dev

## website-build, builds the static site into web/dist
.PHONY: website-build
website-build:
	@cd ${WEBSITE_PATH} && npm run build

## website-preview, builds then serves the production bundle locally
.PHONY: website-preview
website-preview: website-build
	@cd ${WEBSITE_PATH} && npm run preview

## website-lint, lints and auto-fixes the frontend (eslint)
.PHONY: website-lint
website-lint:
	@cd ${WEBSITE_PATH} && npm run lint

## website-lint-ci, lints without auto-fixing — strict gate for CI
.PHONY: website-lint-ci
website-lint-ci:
	@cd ${WEBSITE_PATH} && npm run lint:ci

## website-format, formats the frontend (prettier)
.PHONY: website-format
website-format:
	@cd ${WEBSITE_PATH} && npm run format

## website-test, runs the unit test suite (vitest)
.PHONY: website-test
website-test:
	@cd ${WEBSITE_PATH} && npm run test:unit

## website-test-e2e, builds and runs the Cypress smoke tests
.PHONY: website-test-e2e
website-test-e2e:
	@cd ${WEBSITE_PATH} && npm run test:e2e

## website-check, CI gate — lint, unit tests, then build
.PHONY: website-check
website-check: website-lint website-test website-build

## website-clean, removes the build output (web/dist)
.PHONY: website-clean
website-clean:
	@rm -rf ${WEBSITE_PATH}/dist
