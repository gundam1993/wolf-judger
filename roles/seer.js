/**
 * 预言家流程处理模块
 */

// 预言家选择查看的对象
exports.chooseTargetType = function (res, room, socket) {
  console.log(res)
  let target = res[0]
  if (target) {
    let type = target === "0" ? "player" : "drop"
    socket.emit('seerChoseTargetType', { type: type })
  }
}
// 预言家查看玩家身份
exports.checkPlayerIdentity = function (player, room, socket) {
  console.log(player)
  let roomName = room.name
    player = room.players[player[0]]
    if (player.username) {
      socket.broadcast.in(roomName).emit('seerChoosePlayerResult')
      socket.emit('seerChoosePlayerResult', { role: player.role })
    }
}

//预言家查看弃牌
exports.checkDropIdentity = function (res, room, socket) {
  console.log(res)
  let roles = [room.dropRole[res[0]], room.dropRole[res[1]]]
  socket.broadcast.in(room.name).emit('seerChooseDropResult')
  socket.emit('seerChooseDropResult', { roles: roles })
}
