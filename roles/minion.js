/**
 * 爪牙流程处理模块
 */

//爪牙获得狼人身份
exports.getWerewolf = function (room, socket) {
  let wolf = []
  for (let key in room.players) {
    if (room.players[key].role === 'wereWolf') {
      wolf.push(room.players[key])
    }
  }
  socket.emit('minionGetWerewolfResult', {wolf: wolf})
  socket.broadcast.in(room.name).emit('minionGetWerewolfResult')
}
