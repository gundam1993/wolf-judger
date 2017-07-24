/**
 * ws通讯接收模块，接收服务器发来的消息，通过EventEmitter分发出去
 * 
 */
import EE from './eventEmitter'
const SocketEventListener = function (socket) {
  this.socket = socket
  this.init()
}

SocketEventListener.prototype.init = function() {
  this.socket.on('joinFail', (res) => {
    EE.emit('joinFail', res)
  })
  this.socket.on('joinSuccess', (res) => {
    EE.emit('joinSuccess', res)
  })
  this.socket.on('newJoin', (res) => {
    EE.emit('newJoin', res)
  })
  this.socket.on('leave', (res) => {
    EE.emit('playerLeave', res)
  })
  this.socket.on('gameStart', (res) => {
    EE.emit('gameStart', res)
  })
  this.socket.on('victimChooseInconsistent', () => {
    EE.emit('victimChooseInconsistent')
  })
  this.socket.on('victimChosed', (res) => {
    console.log(res)
    EE.emit('victimChosed', res)
  })
  this.socket.on('suspectsChosed', () => {
    EE.emit('suspectsChosed')
  })
  this.socket.on('suspectsChosedResult', (res) => {
    console.log(res)
    EE.emit('suspectsChosedResult', res)
  })
  this.socket.on('witchUseMedicineResult', (res) => {
    console.log(res)
    EE.emit('witchUseMedicineResult', res)
  })
  this.socket.on('witchUsePoisonResult', (res) => {
    EE.emit('witchUsePoisonResult', res)
  })
  this.socket.on('gameResult', (res) => {
    console.log(res.result)
  })
}

export default SocketEventListener