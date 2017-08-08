/**
 * 预言家流程处理模块
 */

//预言家查看玩家身份
exports.checkPlayerIdentity = function (player, room, socket) {
  let roomName = room.name
    player = room.players[player.id]
    if (player.username) {
      socket.broadcast.in(roomName).emit('SeerChoosePlayerResult')
      socket.emit('SeerChoosePlayerResult', { role: player.role })
    }
}

//预言家查看弃牌
exports.checkDropIdentity = function (res, room, socket) {
  let roles = [room.dropRole[res.dropRole[0]], room.dropRole[res.dropRole[1]]]
  socket.broadcast.in(room.name).emit('SeerChooseDropResult')
  socket.emit('SeerChooseDropResult', { roles: roles })
}
