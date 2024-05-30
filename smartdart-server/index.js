const express = require('express');
// const https = require('https');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
const fs = require('fs');

// var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
// var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
// var credentials = {
//   key: privateKey, cert: certificate,
//   requestCert: false,
//   rejectUnauthorized: false,
// };

const server = http.createServer(
  // credentials,
  app
);

const SERVER_HOST = '0.0.0.0'

const CLIENT_HOST = process.env.HOST || 'localhost'
const CLIENT_PORT = 5173

const CORS_SETTINGS = {
  origin: `http://${CLIENT_HOST}:${CLIENT_PORT}`,
  credentials: true
}

const io = socketIo(server, {
  cors: {
    ...CORS_SETTINGS,
    methods: ['GET', 'POST'],
  }
});

const BACKEND_PORT = 8080;

// Use CORS middleware for Express
app.use(cors(CORS_SETTINGS));

const CHANNEL_NAME = 'SYSTEM'
const NAMESPACE_SEPARATOR = ':'

const receiver = 'Controller'

const TARGETS = {
  Dartboard: 'Dartboard',
  MainScreen: 'MainScreen',
  ThrowManager: 'ThrowManager',
  PlayerInput: 'PlayerInput',
}

const sockets = {}

io.on('connection', (socket) => {
  const { namespace: emitter } = socket.handshake.query
  console.log('incoming connection from: ', emitter)
  sockets[emitter] = socket

  const emit = (target, topic, payload) => {
    let targets = target
    if (!Array.isArray(target)) {
      targets = [target]
    }
    
    targets.forEach(target => {
      const formattedEvent = {
        action: [
          receiver,
          target,
          topic
        ].join(NAMESPACE_SEPARATOR),
        payload
      }
      console.log(`emits to ${target} -> `, formattedEvent)
      sockets[target].emit(CHANNEL_NAME, formattedEvent)
    })
  }

  function handleNewMessage(event) {
    console.log('receives <- ', event)
  
    const { action, payload } = event
    const [source ,target, topic] = action.split(NAMESPACE_SEPARATOR)
    
    if(target !== receiver) {
      return
    }
  
    switch(source) {
      case TARGETS.HomeDashboard : {
        break;
      }
      case TARGETS.PlayerInput : {
        emit(TARGETS.ThrowManager, topic, payload)
        break;
      }
      case TARGETS.ThrowManager : {
        switch(topic) {
          case 'DART_MISS' : {
            emit([
              TARGETS.MainScreen,
              TARGETS.ThrowManager,
            ], topic, payload)
            break;
          }
  
          case 'SIMULATE_DART_LANDED': {
            emit([
              TARGETS.MainScreen,
              TARGETS.ThrowManager,
            ], 'DART_LANDED', payload)
            break;
          }
        }
          
        break;
      }
      case TARGETS.MainScreen: {
        break;
      }
      case TARGETS.Dartboard: {
        switch(topic) {
          case 'CONNECTED': {
            emit(TARGETS.Dartboard, 'CONNECTED_ACK', payload)
            break;
          }
          case 'DART_LANDED': {
            emit([
              TARGETS.MainScreen,
              TARGETS.ThrowManager,
            ], topic, payload)
          }
        }
      }
    }
  }

  socket.on(CHANNEL_NAME, handleNewMessage)
});

server.listen(BACKEND_PORT, SERVER_HOST, () => {
  console.log(`Server running on port ${SERVER_HOST}:${BACKEND_PORT}`);
  console.log('CORS_SETTINGS: ', CORS_SETTINGS)
});
