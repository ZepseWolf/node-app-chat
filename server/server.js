const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage,generateLocMessage} = require('./utils/message');
const {s} = require('./utils/validation');
const {Person} = require('./utils/person');
const _ = require('lodash');


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
    //socket.join(me.getUser(socket.id).room);
    console.log('createMessage',message);
    io.to(me.getUser(socket.id).room).emit('newMessage',generateMessage(me.getUser(socket.id).name,message.text));
  });

  socket.on('createLocMessage',(message)=>{
    io.to(me.getUser(socket.id).room).emit('newLocationMessage',generateLocMessage(me.getUser(socket.id).name , message.latitude,message.longitude))
  });

  // do rooms ---------------------------------------------------
  socket.on('join',(params,callback)=>{
    if(!s(params.name) || !s(params.room)){
    return  callback('Name and room have spaces');
    }
    socket.join(params.room);
    //  socket.leave(params.room);
    me.removeUser(socket.id);
    //create message in the room with name


    me.addUser(socket.id,params.name,params.room);
    socket.emit('newMessage', generateMessage('Admin', `Welcome to the app`));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', `${params.name} had join`));

  });

  socket.on('disconnect',()=>{
    var user = me.removeUser(socket.id);
    console.log('User disconneted',user);
    if(user){
      io.to(user.room).emit('updateUserList',me.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('Admin', `${user.name} has left`));
    }
  });

});

server.listen(port, ()=>{
  console.log(`Started on port ${port}`);
});
