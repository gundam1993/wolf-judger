const socketio = require('socket.io')
const _ = require('lodash')
var io
var rooms = {
  default: {
    name: 'default',
    playerNumber: 0,
    playerLimit: 3,
    ready: 0,
    roles: {
      wereWolf: 1,
      villager: 1,
      troubleMaker: 1,
      seer: 1,
      robber: 1,
      drunk: 1,
    },
    dropRole: [],
    namesUsed: [],
    players: {},
    roleQueue: ['doppelganger', 'wereWolf', 'minion', 'mason', 'seer', 'robber', 'troubleMaker', 'drunk', 'insomniac']
  }
}

exports.listen = function (server) {
  io = socketio(server)
  io.on('connection', (socket) => {
    handleNewPlayer(socket, rooms)
    handleClientDisconnection(socket, rooms)
    handleClientleaveRoom(socket, rooms)
    handleClientReady(socket, rooms)
    handleNextGamePhase(socket, rooms)
    handleSeerChoosePlayer(socket, rooms)
    // handleVictimChoose(socket, rooms)
    // handleSuspectsChoose(socket, rooms)
    // handleWitchUseMedicine(socket, rooms)
    // handlePoisonChoose(socket, rooms)
    // handleNightEnd(socket, rooms)
    // handleWordOver(socket, rooms)
  })
}

// 处理客户端加入事件
function handleNewPlayer(socket, rooms) {
  socket.on('join', function (message) {
    console.log(message)
    let room =message.room
    let username = message.username
    let currentRoom = rooms[room]
    if (currentRoom.playerNumber < currentRoom.playerLimit) {
      for (let i = 0; i < currentRoom.namesUsed.length; i++) {
        if (username === currentRoom.namesUsed[i]) {
          socket.emit('joinFail', {res: '对不起，该昵称已经被使用了'})
          return
        }
      }
      socket.join(room, () => {
        let rooms = Object.keys(socket.rooms)
        console.log(rooms)
      })
      let newJoiner = {
        id: socket.id,
        username: username,
        role: '',
        ready: false,
      }
      currentRoom.namesUsed.push(username)
      currentRoom.players[socket.id] = newJoiner
      currentRoom.playerNumber ++
      socket.broadcast.to(room).emit('newJoin', {
        roomInfo: currentRoom
      })
      socket.emit('joinSuccess', {roomInfo: currentRoom})
    } else {
      socket.emit('joinFail', {res: '对不起，该房间已经满员了'})
    }
  })
}

// 处理客户端断开连接事件
function handleClientDisconnection(socket, rooms) {
  socket.on('disconnecting', function () {
    let roomName = Object.keys(socket.rooms)[1]
    let room = rooms[roomName]
    var player
    if (room && room.players[socket.id]) {
      console.log(room)
      player = room.players[socket.id]
      let nameIndex = room.namesUsed.indexOf(player.username)
      room.namesUsed.splice(nameIndex, 1)
      if (room.players[socket.id].ready) {
        room.ready --
      }
      delete room.players[socket.id]
      room.playerNumber --
      socket.broadcast.to(roomName).emit('leave', {
        roomInfo: room
      })
    }
  })
}

// 处理客户端离开房间事件
function handleClientleaveRoom(socket, rooms) {
  socket.on('leave', function () {
    let roomName = Object.keys(socket.rooms)[1]
    let room = rooms[roomName]
    var player, index
    if (room) {
      player = room.players[socket.id]
      let nameIndex = room.namesUsed.indexOf(player.username)
      room.namesUsed.splice(nameIndex, 1)
      if (room.players[socket.id].ready) {
        room.ready --
      }
      delete room.players[socket.id]
      room.playerNumber --
      socket.leave(room, () => {
        let rooms = Object.keys(socket.rooms)
        console.log(rooms)
      })
      socket.broadcast.to(roomName).emit('leave', {
        roomInfo: room
      })
    }
  })
}

// 处理客户端准备完成事件
function handleClientReady(socket, rooms) {
  socket.on('ready', function () {
    let roomName = Object.keys(socket.rooms)[1]
    let room = rooms[roomName]
    let player = room.players[socket.id]
    room.ready ++
    room.players[socket.id].ready = true
    if (room.ready < room.playerLimit) {
      socket.broadcast.to(roomName).emit('playerReady', {
        roomInfo: room
      })
    } else {
      room.ready = 0
      playerRoleAssign(room)
      socket.broadcast.in(roomName).emit('gameStart', {
        roomInfo: room
      })
      socket.emit('gameStart', {
        roomInfo: room
      })
    }
  })
}

// 分配玩家角色
function playerRoleAssign(room) {
  let roleList = []
  let roleTypes = Object.keys(room.roles)
  roleTypes.forEach((role) => {
    roleList.push(new Array(room.roles[role]).fill(role))
  })
  roleList = [].concat(...roleList)
  randomAssign(room, roleList, 0)
  room.dropRole = roleList
  console.log(room)
}

// 归递随机分配角色
function randomAssign(room, roleList, playerIndex) {
  let len = roleList.length
  let players = Object.keys(room.players)
  if (len > 3) {
    let index = Math.floor(Math.random() * len)
    console.log(room.players[players[playerIndex]].role)
    room.players[players[playerIndex]].role = roleList[index]
    roleList.splice(index, 1)
    playerIndex ++
    randomAssign(room, roleList, playerIndex)
  }
}

//流程控制
function handleNextGamePhase(socket, rooms) {
  socket.on('nextGamePhase', function () {
    let roomName = Object.keys(socket.rooms)[1]
    let room = rooms[roomName]
    room.ready ++
    if (room.ready === room.playerLimit) {
      let nowMoveRole = room.roleQueue.shift()
      while (!room.roles[nowMoveRole] ) {
        nowMoveRole = room.roleQueue.shift()
      }
      if (nowMoveRole !== undefined) {
        room.ready = 0
        socket.broadcast.in(roomName).emit('newGamePhase', {
          roomInfo: room,
          phase: nowMoveRole
        })
        socket.emit('newGamePhase', {
          roomInfo: room,
          phase: nowMoveRole
        })
      } else {
        room.ready = 0
        socket.broadcast.in(roomName).emit('nightEnd', { roomInfo: room })
        socket.emit('nightEnd', { roomInfo: room })
      }
    }
  })
}

function handleSeerChoosePlayer(socket, rooms) {
  socket.on('seerChosedPlayer', function (player) {
    let roomName = Object.keys(socket.rooms)[1]
    let room = rooms[roomName]
    player = room.players[player.id]
    if (player.username) {
      socket.broadcast.in(roomName).emit('SeerChoosePlayerResult')
      socket.emit('SeerChoosePlayerResult', { role: player.role })
    }
  })
}


// function handleVictimChoose(socket, rooms) {
//   socket.on('victimChoose', function (victim) {
//     console.log(victim)
//     let roomName = Object.keys(socket.rooms)[1]
//     let room = rooms[roomName]
//     room.victimVote.push(victim)
//     if (room.roles.wolfman === 1) {
//       room.victim.push(victim)
//       room.victimVote = []
//       console.log(room.victim)
//       socket.emit('victimChosed', {roomInfo: room})
//       socket.broadcast.in(roomName).emit('victimChosed', {roomInfo: room})
//     } else if (room.victimVote.length === room.roles.wolfman) {
//       for (let i = 1; i < room.victimVote.length; i++) {
//         if (room.victimVote[i].id !== room.victimVote[i - 1].id) {
//           socket.emit('victimChooseInconsistent')
//           socket.broadcast.in(roomName).emit('victimChooseInconsistent')
//           room.victimVote = []
//           return
//         }
//       }
//       room.victim.push(victim)
//       room.victimVote = []
//       console.log(room.victim)
//       console.log(room)
//       socket.emit('victimChosed', {roomInfo: room})
//       socket.broadcast.in(roomName).emit('victimChosed', {roomInfo: room})
//     }
//   })
// }

// function handleSuspectsChoose(socket, rooms) {
//   socket.on('suspectsChoose', function (suspects) {
//     console.log(suspects)
//     let roomName = Object.keys(socket.rooms)[1]
//     let room = rooms[roomName]
//     let suspectsRole = room.players[suspects.id].role
//     console.log(suspectsRole)
//     if (suspectsRole === "wolfman") {
//       socket.emit('suspectsChosedResult', 'bad')
//     } else {
//       socket.emit('suspectsChosedResult', 'good')
//     }
//     socket.broadcast.in(roomName).emit('suspectsChosed')
//   })
// }

// function handleWitchUseMedicine(socket, rooms) {
//   socket.on('witchUseMedicine', function () {
//     let roomName = Object.keys(socket.rooms)[1]
//     let room = rooms[roomName]
//     if (room.victim.length === 1 && room.victim[0]) {
//       room.victim.pop()
//     }
//     socket.emit('witchUseMedicineResult', {roomInfo: room})
//     socket.broadcast.in(roomName).emit('witchUseMedicineResult', {roomInfo: room})
//   })
// }

// function handlePoisonChoose(socket, rooms) {
//   socket.on('poisonChoose', function (poison) {
//     console.log(poison)
//     let roomName = Object.keys(socket.rooms)[1]
//     let room = rooms[roomName]
//     if (poison.id && room.players[poison.id]) {
//       room.players[poison.id].poisoned = true
//       room.victim.push(room.players[poison.id])
//     }
//     socket.emit('witchUsePoisonResult', {roomInfo: room})
//     socket.broadcast.in(roomName).emit('witchUsePoisonResult', {roomInfo: room})
//   })
// }

// function handleNightEnd(socket, rooms) {
//   socket.on('nightEnd', function () {
//     let roomName = Object.keys(socket.rooms)[1]
//     let room = rooms[roomName]
//     let player = room.players[socket.id]
//     room.ready ++
//     if (room.ready === room.playerLimit) {
//       for ( let i = 0; i < room.victim.length; i++) {
//         if (room.players[room.victim[i].id]) {
//           room.players[room.victim[i].id].live = false
//           room.victim[i].live = false
//         }
//       }
//       let victim = [].concat(room.victim)
//       room.victim = []
//       let result = winCheck(room)
//       if (!result) {
//         socket.emit('nightResult', {roomInfo: room, victim:victim})
//         socket.broadcast.in(roomName).emit('nightResult', {roomInfo: room, victim:victim})
//       } else {
//         socket.emit('gameResult', {roomInfo: room, victim:victim, result: result})
//         socket.broadcast.in(roomName).emit('gameResult', {roomInfo: room, victim:victim, result: result})
//       }
//     }
//   })
// }

// function winCheck(room) {
//   let playersArray = Object.values(room.players)
//   let livePlayer = playersArray.filter((player) => { return player.live})
//   let liveWolf = livePlayer.filter((player) => { return player.role === 'wolfman'})
//   let liveVillager = livePlayer.filter((player) => { return player.role === 'villagers'})
//   if (liveWolf.length === 0 && liveVillager.length !== 0) {
//     return 'villagers win'
//   } else if (liveVillager.length === 0 && liveWolf.length !== 0) {
//     return 'wolfmans win'
//   } else {
//     return false
//   }
// }

// function handleWordOver(socket, rooms) {
//   socket.on('myWordOver', function (res) {
//     let roomName = Object.keys(socket.rooms)[1]
//     let room = rooms[roomName]
//     let player = room.players[socket.id]
//     let livePlayers = Object.values(room.players).filter((player) => { return player.live}) 
//     if (res.stage === 'lastWord') {
//       if (player.speaked) {
//         socket.emit('nextRound', {roomInfo: room})
//         socket.broadcast.in(roomName).emit('nextRound', {roomInfo: room})
//         return
//       } else {
//         socket.emit('discussProcessStart', {})
//         socket.broadcast.in(roomName).emit('discussProcessStart')
//       }
//     }
//   })
// }

// function buildDiscussQueue(room, player) {
//   let players = Object.values(room.players)
//   let index 
  
// }