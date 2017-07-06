const Game = function(socket, username) {
  this.socket = socket
  this.username = username
  this.addInGame()

}

Game.prototype.addInGame = function() {
  // console.log(this.socket)
  this.socket.emit('join', {room: 'default', username: this.username})
};

module.exports = Game