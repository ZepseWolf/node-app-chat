const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage,generateLocMessage} = require('./utils/message');
const {s} = require('./utils/validation');
const {Person} = require('./utils/person');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
// var server = http.createServer((req,res)=>{
//
// })
var server = http.createServer(app);
var io = socketIO(server);
var me = new Person();

app.use(express.static(publicPath));
io.on('connection',(socket)=>{
  console.log('new user Connected');
  //socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  //socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined'));

  socket.on('createMessage',(message)=>{
    console.log('createMessage',message);
    io.emit('newMessage',generateMessage(me.getUser()[0].name,message.text,message.createAt));
  });

  socket.on('createLocMessage',(message)=>{
    io.emit('newLocationMessage',generateLocMessage('Admin' , message.latitude,message.longitude))
  });

  // do rooms ---------------------------------------------------
  socket.on('join',(params,callback)=>{
    if(!s(params.name) || !s(params.room)){
      callback('Name and room have spaces')
    }
    socket.join(params.room);
  //  socket.leave(params.room);
    socket.emit('newMessage',generateMessage('Admin', `Welcome to the app`));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', `${params.name} had join`));
    //create message in the room with name
    addUser(params.name,params.room);
  });

  socket.on('disconnect',()=>{
    console.log('User disconneted');
  });

});

server.listen(port, ()=>{
  console.log(`Started on port ${port}`);
});
