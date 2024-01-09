# Use the official Node.js image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the application files to the working directory
COPY . .

# Expose the application port
EXPOSE 3000

# Command to run the application using Nodemon
CMD ["npx", "nodemon", "src/app.js"]
