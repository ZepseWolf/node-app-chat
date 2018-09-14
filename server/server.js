const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage,generateLocMessage} = require('./utils/message');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
// var server = http.createServer((req,res)=>{
//
// })
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('new user Connected');
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined'));

  socket.on('createMessage',(message)=>{
    console.log('createMessage',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
  });
  socket.on('createLocMessage',(message)=>{
    io.emit('newLocationMessage',generateLocMessage('Admin' , message.latitude,message.longitude))
    
  });

  socket.on('disconnect',()=>{
    console.log('User disconneted');
  });

});

server.listen(port, ()=>{
  console.log(`Started on port ${port}`);
});
