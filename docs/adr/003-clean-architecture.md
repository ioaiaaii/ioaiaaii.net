# ADR 001: Use Clean Architecture with Fiber Framework

## Context

The project `ioaiaaii.net` requires a maintainable, scalable architecture for both the API and frontend. We need to ensure that the API is flexible enough to allow easy data source changes (e.g., from file-based to database) and maintain separation of concerns between the business logic, data access, and presentation layers.

## Decision

We decided to use **Clean Architecture** for structuring the backend API. The key components are:

- **Entities**: Core business objects, such as Resume, Release, and LivePerformance.
- **Use Cases**: The business logic is separated into use cases, which orchestrate the interaction between the repository and the presentation layer.
- **Repositories**: The data access layer is abstracted via repository interfaces, allowing the flexibility to switch between different data sources (e.g., file system, database).
- **Presentation**: The Fiber framework is used to manage HTTP requests and responses.

By following Clean Architecture, we ensure that the business logic remains decoupled from frameworks and data sources, improving maintainability and testability.

## Alternatives Considered

1. **Monolithic approach**: Implementing all layers together without separation (tightly coupled) would increase technical debt and reduce maintainability.
2. **Hexagonal Architecture**: While similar in concept to Clean Architecture, we felt Clean Architecture better emphasizes the dependency direction and is more commonly used in the Go ecosystem.

## Consequences

- **Maintainability**: The separation of concerns will allow developers to easily understand, modify, or extend individual parts of the system.
- **Scalability**: Clean Architecture allows us to grow the project, especially if we need to switch to more scalable data sources (e.g., database) without refactoring the core logic.
- **Testing**: The architecture allows us to easily mock external dependencies (like repositories), making unit testing simpler.
