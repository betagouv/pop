# Use an official Node.js runtime as the base image
FROM node:18.20.3-alpine AS base
ARG SRC_REF

# Set the working directory in the container
WORKDIR /app

FROM base AS build
ARG SRC_REF

# Copy the entire project to the working directory
COPY . .

# Install project dependencies
RUN npm ci
RUN node ./src/swagger/swagger.js

FROM base
ARG SRC_REF
ENV SRC_REF=${SRC_REF}

COPY --from=build /app /app
WORKDIR /app
ENV NODE_ENV=production

# Set the command to start server
CMD ["node", "./src/index.js"]

# Expose port
EXPOSE 3000
