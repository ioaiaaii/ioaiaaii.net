# Stage 1: Build the Vue app using Node.js
FROM node:18-alpine AS build-stage
WORKDIR /app
COPY ./website/package.json ./website/package-lock.json ./
COPY ./configs/nginx.conf ./configs/nginx.conf
RUN npm install
COPY ./website .
RUN npm run build

FROM nginx:alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/configs/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
