/**
 * 狼人流程处理模块
 */

//狼人获取同伴名字
exports.getTeammate = function (room, socket) {
  let wereWolf = []
  for (let key in room.players) {
    let player = room.players[key]
    if (player.role === 'wereWolf' && player.id !== socket.id) {
      wereWolf.push(player.username)
    }
  }
  console.log(wereWolf)
  socket.emit('wereWolfGotPartner', {wereWolf: wereWolf})
}

//狼人无同伴，查看一张弃置的身份牌
exports.ChosedDrop = function (res, room, socket) {
  let index = res[0]
  if (index) {
    let result = room.dropRole[index]
    socket.emit('wereWolfChosedDropResult', {role: result})
    socket.broadcast.in(room.name).emit('wereWolfChosedDropResult')
  }
}

//狼人阶段结束
exports.gotResult = function (room, socket) {
  if (!room.wereWolfEnd) {
    room.wereWolfEnd = true
    socket.emit('wereWolfEnd')
    socket.broadcast.in(room.name).emit('wereWolfEnd')
  }
}
