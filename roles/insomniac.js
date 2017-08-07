/**
 * 失眠者流程处理模块
 */

//失眠者获取最终身份
exports.getLastRole = function (room, socket) {
  let player = room.players[socket.id]
  socket.emit('insomniacLastRoleResult', {role: player.lastRole})
  socket.broadcast.in(room.name).emit('insomniacLastRoleResult')
}
