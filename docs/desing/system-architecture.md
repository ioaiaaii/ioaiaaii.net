# System Architecture for `ioaiaaii.net`

## Project Overview

The system `ioaiaaii.net` is designed to handle and serve profile-related content such as resumes, music releases, live performances, and website projects. The backend API is built using **Go** with the **Fiber** web framework, following **Clean Architecture** principles. The frontend is developed with **Vite**, providing fast development experience and bundling the static files for production.

## Key Components

1. **Fiber API (Backend)**:
   - **Presentation Layer**: Manages HTTP requests and responses using the **Fiber** web framework.
   - **Use Case Layer**: Contains the business logic that defines how data is fetched, transformed, and returned.
   - **Repository Layer**: Abstracts data access, initially reading from JSON files but designed to be flexible for future database integration.
   
2. **Vite Frontend**:
   - Provides the user interface for interacting with the profile content.
   - During **development**, it runs on its own dev server with hot module replacement (HMR).
   - During **production**, the frontend is bundled and served as static files by the **Fiber** server.

3. **Data Source**:
   - **Current Data Source**: JSON files for storing resumes, releases, live performances, and project information.
   - **Future Data Source**: A relational database (e.g., PostgreSQL) or other scalable data storage solutions.

## Architecture Overview

This project follows **Clean Architecture** to ensure the separation of concerns between different layers. Each layer has specific responsibilities, making the system modular and easy to extend or modify.

```d2
Frontend -> API: "API Requests (/api/*)"

API: {
  label: "API"

  WebServer -> Interfaces: "Route to Handlers"
  Interfaces -> UseCases: "Routing to UseCases"
  UseCases -> Repositories: "Fetch Data from Repository"
  Repositories -> DataSource: "Load Data"
Entities -> Repositories: "Data Encoding to Entities"
  WebServer <- Interfaces: "Return Response (Entities)"
}

API -> Frontend: "Response (JSON)"
```

## Component Breakdown

### 1. **Frontend (Vite)**
- **Development**: Runs on `http://localhost:3000` with HMR (Hot Module Replacement) for fast feedback during development.
- **Production**: The `npm run build` command generates static files that are served by the **Fiber** backend.
- **Interaction**: The frontend interacts with the backend through **API requests** to `/api/*` endpoints to fetch content.

### 2. **Backend API (Fiber)**

The backend is structured using **Clean Architecture** to decouple different concerns. 

- **Routing**: Fiber handles the routing of HTTP requests (e.g., `/api/info`, `/api/releases`).
- **API Endpoints**:
  - `/api/info`: Fetches resume data.
  - `/api/releases`: Fetches music releases.
  - `/api/live`: Fetches live performance data.
  - `/api/projects`: Fetches website projects.
  
  These routes are mapped to specific **HTTP handlers** that call the appropriate **use case** functions.

### 3. **Use Cases (Business Logic)**
- **Responsibility**: The use cases manage the application-specific business logic. Each use case interacts with the repository to fetch or manipulate data.
- **Independence**: The use cases don’t directly depend on how the data is stored (e.g., files or databases). They only interact with the **ContentRepository** interface, which abstracts data storage details.

### 4. **Repositories (Data Access Layer)**
- **Responsibility**: Repositories provide access to the data source. The **FileContentRepository** is used to load data from JSON files, but the architecture allows easy replacement with a database repository.
- **Interface**: The repository layer is abstracted via the `ContentRepository` interface, making it easy to switch between different data sources.

## Data Flow

1. **Frontend Request**:
   - The frontend sends a request to one of the API endpoints, such as `/api/info` to get the resume information.
   
2. **Fiber API**:
   - The request is routed by **Fiber** to the appropriate **HTTP handler** (e.g., `GetResume`), which calls the relevant **use case**.
   
3. **Use Case**:
   - The **use case** handles the business logic. For example, the `GetResume` use case will request resume data from the repository. The use case ensures that the data is properly processed before being returned to the handler.
   
4. **Repository**:
   - The repository implements the **ContentRepository** interface. In the current setup, the **FileContentRepository** fetches the data from a JSON file, but in the future, this could be replaced with a database.
   
5. **Response**:
   - The **use case** returns the data to the **HTTP handler**, which formats the response (typically in JSON) and sends it back to the client (frontend).

## Development Workflow

1. **Vite Dev Server**:
   - During development, the Vite dev server runs on `http://localhost:3000`, and the frontend code is served with hot module reloading. API calls are proxied to the Fiber backend running on `http://localhost:8080`.

2. **Proxy Setup**:
   - Vite is configured to proxy any API requests (e.g., `/api/info`) to the backend to ensure that the frontend and backend can work seamlessly during development.

3. **Production Setup**:
   - When running in production mode, Vite builds static files (in the `dist/` folder) using `npm run build`.
   - Fiber serves these static files along with the API, making it a unified backend for both the API and frontend.

## Deployment

1. **Frontend**:
   - After running the `npm run build` command, Vite generates production-ready static assets in the `dist/` directory. These assets are served by the Fiber backend in production.

2. **Backend**:
   - The Fiber backend is deployed as a Go application, running on a server (e.g., AWS EC2, DigitalOcean Droplet). It listens on `http://localhost:8080` and handles both static files and API requests.

3. **Scaling**:
   - Since the architecture is decoupled, it is easy to scale the frontend and backend independently, if needed. For example, a CDN could serve static assets, while the Fiber backend handles API requests.

## Future Considerations

1. **Switching to a Database**:
   - The repository layer abstracts the data source, allowing you to easily switch from JSON files to a relational database (e.g., PostgreSQL). This would require creating a `DBContentRepository` to implement the `ContentRepository` interface.

2. **Microservices**:
   - As the project grows, the API could be split into multiple microservices (e.g., a separate service for managing music releases). The clean separation of concerns makes this a feasible option without significant refactoring.

3. **Caching**:
   - To improve performance, especially for large datasets like music releases or live performances, caching mechanisms (e.g., Redis) could be introduced at the repository layer.

## Conclusion

The `ioaiaaii.net` project is designed to be highly modular, maintainable, and scalable. By using **Clean Architecture**, we ensure that different parts of the system are decoupled and easily testable. The use of **Fiber** for the API and **Vite** for the frontend ensures a smooth development process, and the architecture is ready to evolve with future needs, such as moving to a database or scaling into microservices.
