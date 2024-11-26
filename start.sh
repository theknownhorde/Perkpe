#!/bin/sh

# Start the frontend and backend concurrently
cd /app/frontend && npm start &
cd /app/backend && npm start &

# Wait for all background processes to finish
wait
