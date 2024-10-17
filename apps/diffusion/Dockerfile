ARG SRC_REF="nocommit"
ARG DISTROLESS_TAG=debug-nonroot

# Use an official Node.js runtime as the base image
FROM node:18-alpine AS base
ARG SRC_REF
ARG DISTROLESS_TAG

# Set the working directory in the container
WORKDIR /app

# BUILD
FROM base AS build
ARG SRC_REF
ARG DISTROLESS_TAG

# Copy the entire project to the working directory
COPY . .

ENV OVH=true

# Install project dependencies
RUN npm ci && npm run build && npm ci --omit=dev

# RUN
FROM gcr.io/distroless/nodejs18-debian12:${DISTROLESS_TAG}
ARG SRC_REF
ENV SRC_REF=${SRC_REF}
ENV NODE_ENV="production"

COPY --from=build /app /app

# Set the command to start server
CMD ["./src/services/server.js"]

# Expose port
EXPOSE 8081
