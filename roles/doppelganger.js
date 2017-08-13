/**
 * 化身幽灵流程处理模块
 */

// 化身幽灵获得新身份
exports.getNewIdentity = function (res, room, socket) {
  console.log(res)
  let target = room.players[res.player.id]
  let dpr = room.players[socket.id]
  if (target.hasOwnProperty('username')) {
    dpr.lastRole = target.role
  }
  socket.emit('doppelgangerChangeRoleResult', {role: dpr.lastRole})
}
