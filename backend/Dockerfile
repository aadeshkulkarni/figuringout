# Use official Node.js image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY common/package.json common/package-lock.json ./common/
COPY backend/package.json backend/package-lock.json ./backend/

# Install dependencies for both common and backend
RUN cd common && npm install
RUN cd backend && npm install

# Copy the rest of the application
COPY . .

EXPOSE 8787

# Command to run the application
CMD ["npm", "run", "dev"]
