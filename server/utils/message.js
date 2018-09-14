var moment = require('moment');
var date = moment();
var generateMessage = (from,text)=>{
  return{
    from,
    text,
    createAt: date.format('h:mm a')
  }
};
var generateLocMessage = (from ,latitude, longitude)=>{
  return{
    from,
    url:`https://www.google.com/maps?q=${latitude},${longitude}`,
    createAt: date.format('h:mm a')
  }
}
module.exports = {generateMessage,generateLocMessage};
