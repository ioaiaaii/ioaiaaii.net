override OPERATOR_PATH := repo-operator
include ${OPERATOR_PATH}/makefiles/base.mk

## local-dev-run, runs bff and backend locally in dev mode
.PHONY: local-dev-run
local-dev-run:
	@echo "Starting npm in frontend and Go in bff in parallel..."
	@(cd apps/frontend && npm run dev) & \
	(cd apps/bff && go run main.go) & \
	wait
	@echo "Both processes have finished."
