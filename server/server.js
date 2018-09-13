const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

  // socket.emit('newEmail',{
  //   from : 'mike@email.com',
  //   text:  'any thing is here'
  // });
  socket.emit('newMessage',{
    from : 'ur mom',
    text:  'i will beat ur ass'
  });

  socket.on('createEmail',(email)=>{
    console.log('createEmail' ,email);
  })

  socket.on('createMessage',(message)=>{
    console.log('createMessage' ,message);
  })

  socket.on('disconnect',()=>{
    console.log('User disconneted');
  });

});

server.listen(port, ()=>{
  console.log(`Started on port ${port}`);
});
