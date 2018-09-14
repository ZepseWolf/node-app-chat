
var socket = io();
socket.on('disconnect',function(){
  console.log('Server down');
});
socket.on('connect',function(){

  console.log("This is untoucable");
});
socket.on('newMessage',function (message){
  console.log('message',message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});
// socket.on('newEmail',function(email){
//   console.log('New email',email);
// });


jQuery('#message-form').on('submit',function(e){
  e.preventDefault();

  socket.emit('createMessage',{
    from:'User',
    text: jQuery('[name=message]').val()
  },function(){

  });
});
