
var socket = io();
socket.on('disconnect',function(){
  console.log('Server down');
});
socket.on('connect',function(){
  console.log('Server conneted');
  socket.emit('createMessage',{
    From: 'andrew',
    text: 'heyyyyy i sux'
  });
});

socket.on('newEmail',function(email){
  console.log('New email',email);
});

socket.on('newMessage',function (message){
  console.log('message',message);
});
