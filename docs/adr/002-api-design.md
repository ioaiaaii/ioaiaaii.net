# ADR 002: API design

## Status

Superseded on 2026-07-04 by [ADR 004](004-static-vue-cloudflare-pages.md), which removed the
API.

## Context

The Go backend served as a backend for frontend (BFF) for the Vite frontend and needed
a consistent API structure.

## Decision

Define the API in OpenAPI, generate the server stubs from the specification, and
generate the API documentation from it with the OpenAPI CLI.

## Options considered

- gRPC: more complexity than the API needed.
- A REST API written without OpenAPI: more maintenance.

## Consequences

- The OpenAPI specification changes with every API change.
