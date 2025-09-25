# Use official Node.js image
FROM node:18-alpine3.16

# Install netcat
RUN apk add --no-cache netcat-openbsd openldap-clients

# Set the working directory
WORKDIR /app

# Copy package.json and lock file
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that Next.js runs on
EXPOSE 3000

# Run the Next.js app
CMD ["npm", "run", "start"]
