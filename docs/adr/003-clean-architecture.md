# ADR 003: Clean Architecture with Fiber

## Status

Superseded on 2026-07-04 by [ADR 004](004-static-vue-cloudflare-pages.md), which removed the
Go backend.

## Context

The backend API needed to keep business logic, data access and presentation separate,
so that the data source could change, for example from files to a database, without
changes to the business logic.

## Decision

Structure the backend API with Clean Architecture, with the Fiber framework for HTTP:

- Entities: the core objects, such as Resume, Release and LivePerformance.
- Use cases: the business logic, which connects the repositories to the presentation
  layer.
- Repositories: interfaces over data access, so that the data source can change.
- Presentation: Fiber handles HTTP requests and responses.

The business logic depends on neither the framework nor the data source.

## Options considered

- A single layer with no separation: tighter coupling and more maintenance.
- Hexagonal Architecture: similar in concept. Clean Architecture was chosen because it
  states the dependency direction more explicitly and is more common in Go projects.

## Consequences

- Each layer can be read, changed or extended on its own.
- The data source can change, for example to a database, without changes to the
  business logic.
- Repositories can be mocked in unit tests.
