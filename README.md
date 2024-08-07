

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

## ressources

achievements:
  - dart landing
  - bull's eye
  - throw miss
  - new round
  - end round

  
https://filters.pixijs.download/main/examples/index.html
  - GlowFilter: a filter to make thinks glow, could be really handy to highlight location on the board
  - ShockwaveFilter: nice animation to highlight the landing of a dart, could we maybe use something than a round wave ??
  - RGBSplitFilter: might be nice to handle a miss
  - OldFilmFilterL could be nice for a miss too !
  - GlitchFitler: could be great for a miss, nice because it is randomized so it will always be different ever time you run it
  - HslAdjutmentFilter: could be cool for celebrating a achievement of event a victory, feels a lot like a disco ball effect really
  - AsciiFilter is quite nice as a background maybe ?


  for the setup page, I would like to use nice controller rather then just button
  I have in mind react-nipple
  https://www.npmjs.com/package/react-nipple
  https://codepen.io/YoannM/pen/gapmMG
  https://github.com/yoannmoinet/nipplejs#options
  look at lockY for the zoom and pitch, and skewX skewY