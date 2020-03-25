const express = require('express');
const path = require('path');
const socket = require('socket.io');
const app = express();

const users = [];
const messages = [];

app.use(express.static(path.join(__dirname + '/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  socket.on('join', name => {
    const userRecord = {name: name, id: socket.id};
    users.push(userRecord);
    console.log(users);
    socket.broadcast.emit('join', name);
  });
  socket.on('disconnect', () => {
    for(let leavingUser of users){
      if(leavingUser.id == socket.id){
        const allUsers = users.indexOf(leavingUser);
        users.splice(allUsers);
        socket.broadcast.emit('leave', leavingUser.name);
      }
      console.log(leavingUser);
    }
  });
});