FROM node:18

WORKDIR /app

COPY . /app

WORKDIR /app/frontend
RUN npm install

# Install dependencies for the backend
WORKDIR /app/backend
RUN npm install

# Expose the necessary ports
EXPOSE 3000 5002

# Copy a script to start both services
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Run the script to start both services
CMD ["/bin/sh", "/app/start.sh"]
