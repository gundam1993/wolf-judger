/**
 * 游戏主模块，保存游戏信息
 */
import SocketEventListener from './SocketEventListener'
import EE from './eventEmitter'

const Game = function(socket, username) {
  this.socket = socket
  this.username = username
  this.roomInfo = {}
  this.eventListener = new SocketEventListener(socket)
  this.bindEvent()
  this.addInGame()
}

Game.prototype.bindEvent = function() {
  EE.on('joinSuccess', (res) => {
    this.roomInfo = res.roomInfo
  })
}

Game.prototype.addInGame = function() {
  this.socket.emit('join', {room: 'default', username: this.username})
}

export default Game