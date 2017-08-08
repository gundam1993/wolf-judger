/**
 * 捣蛋鬼流程处理模块
 */

//捣蛋鬼不交换身份
exports.notExchangeIdentity = function (room, socket) {
  socket.broadcast.in(room.name).emit('troubleMakerExchangeRoleResult')
  socket.emit('troubleMakerExchangeRoleResult')
}

//捣蛋鬼交换身份 
exports.exchangeIdentity = function (res, room, socket) {
  let player1 = room.players[res.players[0]]
  let player2 = room.players[res.players[1]]
  player1.lastRole = player2.role
  player2.lastRole = player1.role
  socket.broadcast.in(room.name).emit('troubleMakerExchangeRoleResult')
  socket.emit('troubleMakerExchangeRoleResult')
}
