/**
 * 强盗流程处理模块
 */

//强盗不交换身份
exports.notChangeIdentity = function (room, socket) {
  socket.broadcast.in(room.name).emit('robberChangeRoleResult')
  socket.emit('robberChangeRoleResult')
}

//强盗交换身份
exports.changeIdentity = function (player, room, socket) {
  player = room.players[player.id]
  let robber = room.players[socket.id]
  if (player.username) {
    robber.lastRole = player.role
    player.lastRole = 'robber'
  }
  socket.broadcast.in(room.name).emit('robberChangeRoleResult')
  socket.emit('robberChangeRoleResult', {role: robber.lastRole})
}
