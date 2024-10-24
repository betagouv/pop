ARG SRC_REF="nocommit"
ARG DISTROLESS_TAG=debug-nonroot

# Use an official Node.js runtime as the base image
FROM node:18.20.3-alpine AS base
ARG SRC_REF
ARG DISTROLESS_TAG

# Set the working directory in the container
WORKDIR /app

FROM base AS build
ARG SRC_REF
ARG DISTROLESS_TAG

# Copy the entire project to the working directory
COPY . .

# Install project dependencies
RUN npm ci
RUN node ./src/swagger/swagger.js

FROM gcr.io/distroless/nodejs18-debian12:${DISTROLESS_TAG}
ARG SRC_REF
ENV SRC_REF=${SRC_REF}
WORKDIR /app
ENV NODE_ENV=production

COPY --chown=nonroot:nonroot --from=build /app /app

# Set the command to start server
CMD ["./src/index.js"]

# Expose port
EXPOSE 3000
