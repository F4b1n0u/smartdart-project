# smartdart-project

## 1 - server

`cd smartdart-server`

`npm install`

`node index.js`

## 2 - client

`cd smartdart-client`

`npm install`

`npm run dev`

## 3 clients
### Main Screen
`open http://localhost:5173/MainScreen`
This is mostly to display a feedback of what is happening on the real dartboard and the state of the current game (score, current player and whatnot)

### Secondary Screen
`open http://localhost:5173/SecondaryScreen`
This is mostly for the user to be able to interact with the system
- connect to a real dartbaord
- simulate throw (press a zone)
- notify the game of a miss

### Player Input
`open http://localhost:5173/PlayerInput`
This is to allow asymetric gaming, to give the player that are not throwing some interaction in the system