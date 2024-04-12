# Create build environment
FROM node:18.10.0 as build-env

WORKDIR /app
COPY . ./
RUN npm install && \
    npm run build

# Create application container
FROM nginx:alpine
# Copy build artifacts from previous stage build-env
COPY --from=build-env /app/dist /usr/share/nginx/html
EXPOSE 80
