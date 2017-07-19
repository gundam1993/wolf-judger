/**
 * 游戏主模块，保存游戏信息
 */
import EE from './eventEmitter'

const Game = function(roomInfo, player) {
  this.ROLE = ['prophet', 'wolfman', 'witch']
  this.roomInfo = roomInfo
  this.self = player
  // this.bindEvent()
  this.init()
}



// Game.prototype.bindEvent = function() {
//   EE.on('joinSuccess', (res) => {
//     console.log(res)
//     this.roomInfo = res.roomInfo
//   })
//   EE.on('newJoin', (res) => {
//     this.roomInfo.players[res.socketId] = res.joiner
//     this.roomInfo.playerNumber ++
//     console.log(this.roomInfo)
//   })
// }

export default Game