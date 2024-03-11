# Use an official Node.js runtime as the base image
FROM node:14-alpine as base

# Set the working directory in the container
WORKDIR /app

FROM base as build

# Copy the entire project to the working directory
COPY . .

# Install project dependencies
RUN npm ci && npm run build && npm ci --omit=dev

FROM base 

COPY --from=build /app /app

# Set the command to start server
CMD ["npm", "start"]

# Expose port
EXPOSE 8081
