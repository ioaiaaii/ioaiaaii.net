# ADR 002: API Design

## Context
We need a consistent API structure for the project to serve as the Backend for Frontend (BFF) for our Vite frontend.

## Decision
We decided to use OpenAPI to define the API and generate server stubs to maintain consistency and ease of development, and generate doc with its cli.

## Alternatives Considered
- Using gRPC (added complexity)
- Manually writing REST API without OpenAPI (higher maintenance)

## Consequences
- We need to keep the OpenAPI spec up to date with each API change.
