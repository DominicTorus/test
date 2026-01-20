# Stage 1: Build Docusaurus
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install 

# Copy all files
COPY . .

# Ensure Docusaurus has execution permissions
RUN chmod +x node_modules/.bin/docusaurus

# Build the static files
RUN npm run build

# Stage 2: Run Docusaurus
FROM node:18-alpine AS runner

WORKDIR /app

# Copy necessary files from builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/docusaurus.config.ts ./  

EXPOSE 3000

# Run the server without trying to open a browser
CMD ["npx", "docusaurus", "serve", "--no-open"]
