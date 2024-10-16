# Use an official Node.js runtime as the base image
FROM node:18-alpine as base
ARG SRC_REF

# Set the working directory in the container
WORKDIR /app

FROM base as build
ARG SRC_REF

# Copy the entire project to the working directory
COPY . .

ENV OVH=true

# Install project dependencies
RUN npm ci && npm run build && npm ci --omit=dev

FROM base 
ARG SRC_REF
ENV SRC_REF=${SRC_REF}

COPY --from=build /app /app

# Set the command to start server
CMD ["npm", "run", "start"]

# Expose port
EXPOSE 8081
