# Use official Node.js image
FROM node:18-alpine

# Install netcat
RUN apk add --no-cache netcat-openbsd

# Set the working directory
WORKDIR /app

# Copy package.json and lock file
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the Next.js app
RUN npm run build

# Expose the port that Next.js runs on
EXPOSE 3000

# Run the Next.js app
CMD ["npm", "run", "start"]