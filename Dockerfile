# Stage 1: Build the React app
FROM node:21-alpine3.18 AS build

WORKDIR /app

COPY package*.json ./ 

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the built React app using Nginx
FROM nginx:1.25.3-alpine

# Copy the build files from the 'build' stage to the nginx directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

