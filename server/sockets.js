const socketio = require('socket.io');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`I'm listening on port ${port}.`));
let io = socketio(server);
let webAppSockets = {};
let mobileSockets = {};

io.on('connection', socket => {
  socket.on('mobileOnline', userId => {
    mobileSockets[userId] = socket;
  });
  socket.on('webAppOnline', userId => {
    webAppSockets[userId] = socket;
  });
});

module.exports = {
  io,
  server,
  webAppSockets,
  mobileSockets,
  app,
  express
}
