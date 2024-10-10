# System Design Document

## Project: ioaiaaii.net

### **Table of Contents**

- [Overview](#overview)
- [Architecture](#architecture)
- [Components](#components)
  - [Controller Layer](#controller-layer)
  - [Use Case Layer](#use-case-layer)
  - [Infrastructure Layer](#infrastructure-layer)
    - [Persistence](#persistence)
    - [Transport](#transport)
- [Data Flow](#data-flow)
- [Technology Stack](#technology-stack)
- [Deployment Considerations](#deployment-considerations)

---

## **Overview**

This document outlines the system design for the **ioaiaaii.net** project. The system is structured based on **Clean Architecture** principles, ensuring separation of concerns, maintainability, and scalability. The architecture supports both **HTTP** and future **gRPC** transport layers, and is currently backed by **file-based persistence**. 

The design allows for future migration to more scalable persistence layers, like **databases** (e.g., MySQL), with minimal impact on the core business logic.

---

## **Architecture**

The architecture is divided into distinct layers, each with a specific responsibility:

- **Controller Layer**: Handles incoming requests, interacts with the use case layer, and returns responses to clients.
- **Use Case Layer**: Contains the core business logic, orchestrating the application's functionality.
- **Infrastructure Layer**: Deals with external concerns like database or file storage, server setup, and other transport mechanisms (HTTP, gRPC).

![diagram](./diagram.svg)

---

## **Components**

### **1. Controller Layer**
- **Description**: The controller layer is responsible for handling incoming requests (either HTTP or gRPC) and mapping them to the appropriate use cases.
- **Packages**:
  - `controller/httpcontroller`: Handles HTTP-based requests, including mapping them to use cases.
  - `controller/grpccontroller`: Handles gRPC-based requests (for future implementation).
- **Key Files**:
  - `handler.go`: Contains the HTTP request handlers that interact with the use case layer.
  - `router.go`: Defines and registers HTTP routes.

### **2. Use Case Layer**
- **Description**: This layer contains the business logic of the application, independent of how the data is stored or transported. Use cases interact with repositories via interfaces.
- **Key Components**:
  - `content_usecase.go`: Implements the business logic for content-related features (e.g., handling resumes, releases, live performances).

### **3. Infrastructure Layer**
- **Description**: This layer manages external systems (file storage, HTTP, etc.) and provides concrete implementations for the interfaces defined in the **use case layer**.

#### **Persistence**
- **Description**: The persistence package is responsible for providing file-based storage mechanisms. In future, this can be extended to support databases or cloud-based storage.
- **Packages**:
  - `infrastructure/persistence/file`: Handles file-based persistence, such as reading JSON data for resumes and live performances.
- **Key Files**:
  - `file_repository.go`: Implements the repository interface to load content from files.

#### **Transport**
- **Description**: This package deals with setting up the HTTP and (in future) gRPC servers.
- **Packages**:
  - `infrastructure/transport/httpserver`: Responsible for setting up the **Fiber** HTTP server.
  - `infrastructure/transport/grpcserver`: Will be responsible for setting up a **gRPC** server.
- **Key Files**:
  - `httpserver.go`: Initializes the HTTP server, applies middleware, registers routes, and serves static files.
  - `grpcserver.go`: (Future implementation) Will initialize and configure the gRPC server.

---

## **Data Flow**

1. **Incoming Request**:
   - The client sends an HTTP request to the server (e.g., a request for a resume).
   
2. **Controller Layer**:
   - The request is handled by the appropriate HTTP controller (via `handler.go`).
   - The controller calls the corresponding method in the use case layer.

3. **Use Case Layer**:
   - The use case processes the request, potentially applying business logic, and interacts with the repository to fetch or store data.

4. **Infrastructure Layer**:
   - The repository fetches the required data from file storage (or database in the future) and returns it to the use case.

5. **Response**:
   - The use case returns the processed data to the controller, which formats it as JSON and sends it back to the client.

---

## **Technology Stack**

- **Language**: Go (Golang)
- **Web Framework**: Fiber (for HTTP transport)
- **Persistence**: JSON files (for content like resumes, releases, and live performances)
- **Transport Protocols**:
  - HTTP (via Fiber)
  - Future: gRPC

---

## **Deployment Considerations**

- **HTTP & Static Files**: The `httpserver.go` file serves static files from the `./website/dist` directory for frontend assets. In production, it might be more efficient to serve static files via a **CDN** or a dedicated server like **NGINX**.
  
- **Future gRPC Support**: The architecture supports adding a **gRPC server** via the `grpcserver.go` file, ensuring the flexibility to extend transport protocols without affecting the core business logic.

- **Scalability**: The use of interfaces in the **repository layer** ensures that switching from file-based persistence to a relational database like **MySQL** requires minimal changes.

---

## **Conclusion**

The **ioaiaaii.net** project is designed following **Clean Architecture** principles to ensure separation of concerns, modularity, and scalability. By organizing the code into distinct layers (controller, use case, and infrastructure), the system is easy to maintain and extend with new features or transport protocols (like gRPC).

This design also supports the future migration to more scalable and flexible persistence layers, such as databases or cloud storage, while preserving the core business logic.

