# Simple Dockerfile for Next.js + Prisma development
FROM node:20-alpine

WORKDIR /app

# Copy only package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the app
COPY . .

# Generate Prisma client for correct platform
RUN npx prisma generate

# Expose Next.js dev port
EXPOSE 3000

# Start in development mode
CMD ["npm", "run", "dev"]