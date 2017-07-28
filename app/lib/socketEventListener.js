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
  this.socket.on('newGamePhase', (res) => {
    console.log(res)
    EE.emit('newGamePhase', res)
  })
  this.socket.on('jumpPhase', (res) => {
    EE.emit(`jumpPhase`, res)
  })
  this.socket.on('SeerChoosePlayerResult', (res) => {
    if (res) {
      EE.emit('SeerChoosePlayerResult', res)
    } else {
      EE.delayEmitter(`PhaseEnd`, 1000, '预言家')
    }
  })
  this.socket.on('SeerChooseDropResult', (res) => {
    if (res) {
      EE.emit('SeerChooseDropResult', res)
    } else {
      EE.delayEmitter(`PhaseEnd`, 1000, '预言家')
    }
  })
  this.socket.on('robberChangeRoleResult', (res) => {
    if (res) {
      EE.emit('robberChangeRoleResult', res)
    } else {
      EE.delayEmitter(`PhaseEnd`, 1000, '强盗')
    }
  })
  this.socket.on('troubleMakerExchangeRoleResult', () => {
    EE.emit(`PhaseEnd`, '捣蛋鬼')
  })
  this.socket.on('drunkChosedDropResult', () => {
    EE.emit(`PhaseEnd`, '酒鬼')
  })
  this.socket.on('insomniacLastRoleResult', (res) => {
    if (res) {
      EE.emit('insomniacLastRoleResult', res)
    } else {
      EE.delayEmitter(`PhaseEnd`, 1000, '失眠者')
    }
  })
  this.socket.on('minionGetWerewolfResult', (res) => {
    if (res) {
      EE.emit('minionGetWerewolfResult', res)
    } else {
      EE.delayEmitter(`PhaseEnd`, 1000, '爪牙')
    }
  })
}

export default SocketEventListener