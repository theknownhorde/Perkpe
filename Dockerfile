FROM node:18 AS test-app

# Set working directory
WORKDIR /app

# Copy all project files
COPY . ./

# Install dependencies for both frontend and backend
WORKDIR /app/frontend
RUN npm install

WORKDIR /app/backend
RUN npm install

# Install tmux for managing two terminal instances
RUN apt-get update && apt-get install -y tmux && apt-get clean

# Expose ports for frontend and backend
EXPOSE 3000 5002

# Command to launch tmux with two panes: one for frontend and one for backend
CMD ["bash", "-c", "tmux new-session -d 'cd /app/frontend && npm start' && tmux split-window -v -p 50 'cd /app/backend && npm start' && tmux attach"]

