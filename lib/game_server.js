const socketio = require('socket.io')
var io
var rooms = {
  default: {
    name: 'default',
    playerNumber: 0,
    playerLimit: 3,
    ready: 0,
    victimVote: [],
    victim: [],
    roles: {
      wolfman: 2,
      villagers: 1,
    },
    namesUsed: [],
    players: {}
  }
}

exports.listen = function (server) {
  io = socketio(server)
  io.on('connection', (socket) => {
    handleNewPlayer(socket, rooms)
    handleClientDisconnection(socket, rooms)
    handleClientleaveRoom(socket, rooms)
    handleClientReady(socket, rooms)
    handleVictimChoose(socket, rooms)
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
        live: true,
        ready: false
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
    var player, index
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
  console.log(roleList)
  randomAssign(room, roleList, 0)
  console.log(room)
}

// 归递随机分配角色
function randomAssign(room, roleList, playerIndex) {
  let len = roleList.length
  let players = Object.keys(room.players)
  if (len > 0) {
    let index = Math.floor(Math.random() * len)
    room.players[players[playerIndex]].role = roleList[index]
    roleList.splice(index, 1)
    playerIndex ++
    randomAssign(room, roleList, playerIndex)
  }
}


function handleVictimChoose(socket, rooms) {
  socket.on('victimChoose', function (victim) {
    console.log(victim)
    let roomName = Object.keys(socket.rooms)[1]
    let room = rooms[roomName]
    room.victimVote.push(victim)
    if (room.victimVote.length === room.roles.wolfman) {
      for (let i = 1; i < room.victimVote.length; i++) {
        if (room.victimVote[i].id !== room.victimVote[i - 1].id) {
          socket.emit('victimChooseInconsistent')
          socket.broadcast.in(roomName).emit('victimChooseInconsistent')
          room.victimVote = []
          return
        }
      }
      room.victim.push(victim)
      console.log(room.victim)
      socket.emit('victimChosed')
      socket.broadcast.in(roomName).emit('victimChosed')
    }
  })
}