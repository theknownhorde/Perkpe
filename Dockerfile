# Use an official Node.js image from the Docker Hub
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the project dependencies
RUN npm install --production

# Copy the rest of the application source code
COPY . .

# Expose the port on which the app will run (this should match your app's port)
EXPOSE 3000

# Define the command to run your application
CMD [ "npm", "start" ]
