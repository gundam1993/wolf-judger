/**
 * 守卫流程处理函数
 */

//守卫获得队友身份
exports.getOtherMason = function (room, socket) {
  let mason = ''
  for (let key in room.players) {
    let player = room.players[key]
    if (player.role === 'mason' && player.id !== socket.id) {
      mason = player.username
    }
  }
  socket.emit('masonGetOtherMasonResult', {mason: mason})
}

//守卫阶段结束
exports.gotResult = function (room, socket) {
  if (!room.masonEnd) {
    room.masonEnd = true
    socket.emit('masonEnd')
    socket.broadcast.in(room.name).emit('masonEnd')
  }
}
