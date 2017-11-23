/**
 * 强盗流程处理模块
 */

//强盗不交换身份
exports.notChangeIdentity = function (room, socket) {
  console.log('robber not change identity')
  socket.broadcast.in(room.name).emit('robberChangeRoleResult')
  socket.emit('robberChangeRoleResult', {role: "", notChange: true})
}

//强盗交换身份
exports.changeIdentity = function (player, room, socket) {
  // player = room.players[player.id]
  player = room.players[player[0]]
  let robber = room.players[socket.id]
  if (player.hasOwnProperty("username")) {
    robber.lastRole = player.role
    player.lastRole = 'robber'
  }
  socket.broadcast.in(room.name).emit('robberChangeRoleResult')
  socket.emit('robberChangeRoleResult', {role: robber.lastRole, target: player.username,  notChange: false})
}
