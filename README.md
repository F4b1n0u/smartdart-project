

# smartdart-project

## install

- install Tmux
`/bin/bash -c "$(cu/rl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
`brew install tmux`

- add mouse support (to be able to scroll in tmux)
`nano ~/.tmux.conf` and add `set -g mouse on`
`tmux source-file ~/.tmux.conf`

- install dependencies
`npm install`

## how to start

run:
`./start.sh`

### open browsers

#### display screen

`open http://localhost:5173/display`
This is mostly to display a feedback of what is happening on the real dartboard and the state of the current game (score, current player and whatnot)

#### control Screen

`open http://localhost:5173/command`
This is mostly for the user to be able to interact with the system

- connect to a real dartboard
- simulate throw (press a zone)
- notify the game of a miss

### Player Input

`open http://localhost:5173/player`
This is to allow asymetric gaming, to give the player that are not throwing some interaction in the system