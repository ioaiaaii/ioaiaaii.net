# Stage 1: Build the Vue app using Node.js
FROM node:18-alpine AS build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY ./website/package.json ./website/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY ./website .

# Build the Vue.js app for production using Vite
RUN npm run build

# Stage 2: Serve the built app with Nginx
FROM nginx:alpine

# Copy the built Vite app from the previous stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy the Nginx configuration file
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
