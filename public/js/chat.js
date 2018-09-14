
var socket = io();
socket.on('disconnect',function(){
  console.log('Server down');
});
socket.on('connect',function(){
  var param = jQuery.deparam(window.location.search);
  console.log("Welcome to the server ",param);
  socket.emit('join',param,function(e){
    if (e){
      alert(e);
      window.location.href ="/";
    }else {

    }
  });
});
socket.on('newMessage',function (message){
  console.log('message',message);
  var li = jQuery('<li></li>');
  li.text(`${message.from} ${message.createAt} : ${message.text} `);
  jQuery('#messages').append(li);
});
// socket.on('newEmail',function(email){
//   console.log('New email',email);
// });
socket.on('newLocationMessage',function(message){
  console.log('location ',message);
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();

  socket.emit('createMessage',{
    from:'User',
    text: jQuery('[name=message]').val()
  },function(){

  });
});

var locationBut = jQuery('#send-location');
locationBut.on('click',function(){
  if(!navigator.geolocation){
    return alert('Ger not supported');
  }
   navigator.geolocation.getCurrentPosition(function(position){
     socket.emit('createLocMessage',{
       latitude: position.coords.latitude ,
       longitude: position.coords.longitude
     })
     console.log(`${position.coords.latitude} , ${position.coords.longitude}`);
   },function(){
     alert('unable to fetch data');
   });
});
