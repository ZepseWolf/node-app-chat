

class Person {
  constructor(){
    this.user = [];

  }
  addUser(id, name, room){
    var user = {id,name, room};
    this.user.push(user);

    return user;
  }
  getUser(id){
    return this.user.filter((user) => user.id === id)[0];
  }
  removeUser(id){
    var user = this.getUser(id);
    if(user){
      this.user = this.user.filter((user)=>user.id !== id);
    }
    return user;
  }
  getUserList(room){
    var users = this.user.filter((user)=> user.room === room);
    var arr = users.map((user) => user.name); // return name in all user
    console.log("this si",arr);
    return arr;
  }
}

module.exports = {Person};
