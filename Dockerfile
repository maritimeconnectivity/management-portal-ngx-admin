# Stage 1: Build the Angular application in production mode
FROM node:14.20.1 AS production

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --save --legacy-deps

# Install the specific @types/ws package version
RUN npm install @types/ws@8.5.4

# Copy the rest of the application source code
COPY . .

# Build the Angular application with the production configuration
RUN npm run build:prod

# Stage 2: Create a production image
FROM nginx:alpine AS final

# Copy the built Angular app from the production stage to the final image
COPY --from=production /app/dist /usr/share/nginx/html

# Overwrite the default docker conf in the docker file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 4200 for serving the Angular app
EXPOSE 4200

# Start the NGINX server
CMD ["nginx", "-g", "daemon off;"]