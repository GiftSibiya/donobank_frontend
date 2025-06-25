# Build Stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json separately to leverage caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Accept VITE_API_URL as a build argument
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the project and check for any build errors
RUN npm run build

# Production Stage
FROM nginx:alpine

# Copy the built files from the build stage (dist directory)
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 3000
EXPOSE 80

# Run the application with nginx
CMD ["nginx", "-g", "daemon off;"]
