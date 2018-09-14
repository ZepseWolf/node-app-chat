class Person {
  constructor(){
    this.user = [];
  }
  addUser(name, room){
    var user = {name, room};
    this.user.push(user);

  }
  getUser(){
    return this.user;
  }
}

module.exports = {Person};
