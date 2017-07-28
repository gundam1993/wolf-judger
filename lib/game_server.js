const socketio = require('socket.io')
var io
var rooms = {
  default: {
    name: 'default',
    playerNumber: 0,
    playerLimit: 3,
    ready: 0,
    roles: {
      wereWolf: 3,
      // villager: 1,
      // troubleMaker: 1,
      minion: 3,
      // robber: 1,
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
    handleSeerChooseDrop(socket, rooms)
    handleRobberNotChange(socket, rooms)
    handleRobberChoosePlayer(socket, rooms)
    handleTroubleMakerNotExchange(socket, rooms)
    handleTroubleMakerChosedPlayer(socket, rooms)
    handleDrunkChosedDrop(socket, rooms)
    handleInsomniacGetLastRole (socket, rooms)
    handleMinionGetWerewolf(socket, rooms)
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
        lastRole: '',
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
    room.players[players[playerIndex]].role = roleList[index]
    room.players[players[playerIndex]].lastRole = roleList[index]
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
        for (let key in room.players) {
          if (room.players[key].role === nowMoveRole) {
            socket.broadcast.in(roomName).emit('newGamePhase', {
              roomInfo: room,
              phase: nowMoveRole
            })
            socket.emit('newGamePhase', {
              roomInfo: room,
              phase: nowMoveRole
            })
            return
          }
        }
        socket.broadcast.in(roomName).emit('jumpPhase', {
          roomInfo: room,
          phase: nowMoveRole
        })
        socket.emit('jumpPhase', {
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
//预言家查看玩家身份
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
//预言家查看弃牌
function handleSeerChooseDrop(socket, rooms) {
  socket.on('seerChosedDrop', function (res) {
    let roomName = Object.keys(socket.rooms)[1]
    let room = rooms[roomName]
    let roles = [room.dropRole[res.dropRole[0]], room.dropRole[res.dropRole[1]]]
    console.log(roles)
    socket.broadcast.in(roomName).emit('SeerChooseDropResult')
    socket.emit('SeerChooseDropResult', { roles: roles })
  })
}
//强盗不交换身份
function handleRobberNotChange(socket, rooms) {
  socket.on('robberNotChange', function () {
    let roomName = Object.keys(socket.rooms)[1]
    let room = rooms[roomName]
    socket.broadcast.in(roomName).emit('robberChangeRoleResult')
    socket.emit('robberChangeRoleResult')
  })
}
//强盗交换身份
function handleRobberChoosePlayer(socket, rooms) {
  socket.on('robberChosedPlayer', function (player) {
    let roomName = Object.keys(socket.rooms)[1]
    let room = rooms[roomName]
    player = room.players[player.id]
    let robber = room.players[socket.id]
    if (player.username) {
      robber.lastRole = player.role
      player.lastRole = 'robber'
    }
    console.log(room)
    socket.broadcast.in(roomName).emit('robberChangeRoleResult')
    socket.emit('robberChangeRoleResult', {role: robber.lastRole})
  })
}
//捣蛋鬼不交换身份
function handleTroubleMakerNotExchange(socket, rooms) {
  socket.on('troubleMakerNotExchange', function () {
    let roomName = Object.keys(socket.rooms)[1]
    let room = rooms[roomName]
    socket.broadcast.in(roomName).emit('troubleMakerExchangeRoleResult')
    socket.emit('troubleMakerExchangeRoleResult')
  })
}
//捣蛋鬼交换身份
function handleTroubleMakerChosedPlayer(socket, rooms) {
  socket.on('troubleMakerChosedPlayer', function (res) {
    let roomName = Object.keys(socket.rooms)[1]
    let room = rooms[roomName]
    let player1 = room.players[res.players[0]]
    let player2 = room.players[res.players[1]]
    player1.lastRole = player2.role
    player2.lastRole = player1.role
    console.log(room)
    socket.broadcast.in(roomName).emit('troubleMakerExchangeRoleResult')
    socket.emit('troubleMakerExchangeRoleResult')
  })
}
//酒鬼交换身份
function handleDrunkChosedDrop (socket, rooms) {
  socket.on('drunkChosedDrop', function (res) {
    let roomName = Object.keys(socket.rooms)[1]
    let room = rooms[roomName]
    let index = res.dropRole[0]
    let player = room.players[socket.id]
    if (index) {
      player.lastRole = room.dropRole[index]
    }
    console.log(room)
    socket.broadcast.in(roomName).emit('drunkChosedDropResult')
    socket.emit('drunkChosedDropResult')
  })
}
//失眠者获取最终身份
function handleInsomniacGetLastRole (socket, rooms) {
  socket.on('insomniacGetLastRole', function () {
    let roomName = Object.keys(socket.rooms)[1]
    let room = rooms[roomName]
    let player = room.players[socket.id]
    socket.emit('insomniacLastRoleResult', {role: player.lastRole})
    socket.broadcast.in(roomName).emit('insomniacLastRoleResult')
  })
}
//爪牙获得狼人身份
function handleMinionGetWerewolf(socket, rooms) {
  socket.on('minionGetWerewolf', function () {
    let roomName = Object.keys(socket.rooms)[1]
    let room = rooms[roomName]
    let wolf = []
    for (let key in room.players) {
      if (room.players[key].role === 'wereWolf') {
        wolf.push(room.players[key])
      }
    }
    socket.emit('minionGetWerewolfResult', {wolf: wolf})
    socket.broadcast.in(roomName).emit('minionGetWerewolfResult')
  })
}