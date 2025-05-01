# Use official Next.js image (or Node.js)
FROM node:18-alpine AS builder

WORKDIR /app

# Copy monorepo package.json and lock files
COPY package.json pnpm-lock.yaml ./
COPY apps/home/package.json apps/home/package.json

# Install dependencies
RUN npm install

# Copy the entire monorepo (needed for dependencies)
COPY . .

# Build the Next.js app
RUN npm run build --workspace=home

# Production image
FROM node:18-alpine

WORKDIR /app

# Copy built files from previous stage
COPY --from=builder /app/apps/home/.next .next
COPY --from=builder /app/apps/home/public public
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/apps/home/package.json .

EXPOSE 3000

CMD ["npm", "start"]
