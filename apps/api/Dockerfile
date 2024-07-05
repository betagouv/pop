# Use an official Node.js runtime as the base image
FROM node:18.20.3-alpine as base

# Set the working directory in the container
WORKDIR /app

FROM base as build

# Copy the entire project to the working directory
COPY . .

# Install project dependencies
RUN npm ci --omit=dev
RUN node ./src/swagger/swagger.js

FROM base

COPY --from=build /app /app
WORKDIR /app

# Set the command to start server
CMD ["node", "./src/index.js"]

# Expose port
EXPOSE 3000
