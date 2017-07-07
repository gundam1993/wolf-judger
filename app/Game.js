/**
 * 游戏主模块，保存游戏信息
 */
import SocketEventListener from './SocketEventListener'

const Game = function(socket, username) {
  this.socket = socket
  this.username = username
  this.eventListener = new SocketEventListener(socket)
  this.addInGame()

}

Game.prototype.addInGame = function() {
  // console.log(this.socket)
  this.socket.emit('join', {room: 'default', username: this.username})
};

export default Game