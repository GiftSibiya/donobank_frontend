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

# Accept all VITE_* variables as build arguments and set them as environment variables
ARG VITE_API_URL
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_SUPABASE_SERVICE_ROLE_KEY

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV VITE_SUPABASE_SERVICE_ROLE_KEY=$VITE_SUPABASE_SERVICE_ROLE_KEY

# Build the project and check for any build errors
RUN npm run build

# Production Stage
FROM nginx:alpine

# Copy the built files from the build stage (dist directory)
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (not 3000, since nginx uses 80 by default)
EXPOSE 80

# Run the application with nginx
CMD ["nginx", "-g", "daemon off;"]
