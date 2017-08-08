/**
 * 酒鬼流程处理模块
 */

//酒鬼交换身份
exports.exchangeIdentity = function (res, room, socket) {
  let index = res.dropRole[0]
  let player = room.players[socket.id]
  if (index) {
    player.lastRole = room.dropRole[index]
  }
  socket.broadcast.in(room.name).emit('drunkChosedDropResult')
  socket.emit('drunkChosedDropResult')
}