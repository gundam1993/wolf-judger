const socketio = require('socket.io')
var io
var rooms = {
  default: {
    name: 'default',
    playerNumber: 0,
    playerLimit: 8,
    ready: 0,
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
  })
}

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
        live: true
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

function handleClientDisconnection(socket, rooms) {
  socket.on('disconnecting', function () {
    let roomName = Object.keys(socket.rooms)[1]
    let room = rooms[roomName]
    var player, index
    if (room) {
      player = room.players[socket.id]
      let nameIndex = room.namesUsed.indexOf(player.username)
      room.namesUsed.splice(nameIndex, 1)
      delete room.players[socket.id]
      room.playerNumber --
      socket.broadcast.to(roomName).emit('leave', {
        roomInfo: room
      })
    }
  })
}


function handleClientleaveRoom(socket, rooms) {
  socket.on('leave', function () {
    let roomName = Object.keys(socket.rooms)[1]
    let room = rooms[roomName]
    var player, index
    if (room) {
      player = room.players[socket.id]
      let nameIndex = room.namesUsed.indexOf(player.username)
      room.namesUsed.splice(nameIndex, 1)
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
