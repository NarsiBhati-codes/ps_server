FROM node:16-alpine

# Stage 1: Build stage with architecture-specific dependencies
FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production

# Stage 2: Final stage with architecture-independent code
FROM node:16-alpine AS final
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY . .
EXPOSE 8080
CMD ["node", "index.js"]
