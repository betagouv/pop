ARG SRC_REF="nocommit"

FROM node:18.20.4 AS base
ARG SRC_REF

# Set the working directory in the container
WORKDIR /app

FROM base AS build
ARG SRC_REF

# Copy the entire project to the working directory
COPY . .

# Install project dependencies
ENV OVH=true

RUN --mount=type=secret,id=sentry-auth-token,target=/app/apps/production/.sentryclirc \
    npm ci && npm run build && npm ci --omit=dev

FROM base 
ARG SRC_REF
ENV SRC_REF=${SRC_REF}
ENV NODE_ENV="production"

COPY --chown=nonroot:nonroot --from=build /app /app

# Set the command to start server
CMD ["npm", "run", "ovh:start"]

# Expose port
EXPOSE 8081
