FROM node:18

WORKDIR /app

# Copy the project into the image
COPY . /app

# Install dependencies for both frontend and backend
# WORKDIR /app/frontend
# RUN npm install

# WORKDIR /app/backend
# RUN npm install

# # Install tmux for managing two terminal instances
# RUN apt-get update && apt-get install -y tmux && apt-get clean

# # Expose ports for frontend and backend
# EXPOSE 3000 5002

# # Command to launch tmux with two panes: one for frontend and one for backend
# CMD ["bash", "-c", "tmux new-session -d 'cd /app/frontend && npm start' && tmux split-window -v -p 50 'cd /app/backend && npm start' && tmux attach"]
WORKDIR /app/frontend
RUN npm install

# Install dependencies for the backend
WORKDIR /app/backend
RUN npm install

# Expose the necessary ports
EXPOSE 3000 5002

# Copy a script to start both services
COPY start.sh /app/start.sh || True
RUN chmod +x /app/start.sh

# Expose the necessary ports
EXPOSE 3000 5002

# Run the script to start both services
CMD ["/bin/sh", "/app/start.sh"]
