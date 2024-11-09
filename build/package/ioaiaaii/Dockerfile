# Multi-stage docker build
##    Build base, parse LD_FLAGS, add user and build the service bin to /tmp dir.
FROM node:18-alpine AS build-ui
WORKDIR /app
COPY ./web/package.json ./web/package-lock.json ./
RUN npm install
COPY ./web .
RUN npm run build

FROM golang@sha256:9dd2625a1ff2859b8d8b01d8f7822c0f528942fe56cfe7a1e7c38d3b8d72d679 as base
ARG LD_FLAGS
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    intranet
WORKDIR $GOPATH/src/

# Cache Go modules and build artifacts test
COPY go.mod go.sum ./
RUN --mount=type=cache,target=/go/pkg/mod go mod download

COPY . .
COPY --from=build-ui /app/dist $GOPATH/src/web/dist

# reduce layer in one RUN
# use vendoring for hermetic build
# disable CGO
# parse build flags from Makefile

RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/go/.cache/go-build \
    go mod verify && \
    CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -v -a -mod=vendor -ldflags="${LD_FLAGS}" -o /tmp/ioaiaaii.net ./cmd/ioaiaaii.net/main.go

#   Build image
##    Copy files, document the default port, and run the bin as non-root user
FROM gcr.io/distroless/static-debian12:nonroot
LABEL org.opencontainers.image.url="https://github.com/ioaiaaii/ioaiaaii.net/build/api"
COPY --from=base /etc/passwd /etc/passwd
COPY --from=base /tmp/ioaiaaii.net /usr/local/bin/ioaiaaii.net

EXPOSE 8080/tcp
USER intranet
ENTRYPOINT ["/usr/local/bin/ioaiaaii.net"]
