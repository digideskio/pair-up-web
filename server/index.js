const { conn } = require('./db');
const path = require('path');
const socketio = require('socket.io');
const port = process.env.PORT || 3000;
const { app, express } = require('./sockets');
require('dotenv').config();

app.use(require('body-parser').json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../client/public')));
app.use('/vendor', express.static(path.join(__dirname, '../node_modules')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/api', require('./routes'));

conn.sync();

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send(err);
});
