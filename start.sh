#!/bin/bash

# Start a new tmux session and name it 'SmartDart'
tmux new-session -d -s SmartDart

# Split the window into two panes horizontally
tmux split-window -h

# Select the first pane (0) and start the server
tmux send-keys -t SmartDart:0.0 'cd ./packages/server && npm run start:dev' C-m

# Select the second pane (1) and start the client
tmux send-keys -t SmartDart:0.1 'cd ./packages/client && npm run start' C-m

# Attach to the session
tmux attach-session -t SmartDart