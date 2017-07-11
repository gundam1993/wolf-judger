const socketio = require('socket.io')
var io
var rooms = {
  default: {
    name: 'default',
    playerNumber: 0,
    playerLimit: 8,
    ready: 0,
    namesUsed: [],
    players: []
  }
}

exports.listen = function (server) {
  io = socketio(server)
  io.on('connection', (socket) => {
    handleNewPlayer(socket, rooms)
    handleClientDisconnection(socket, rooms)
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
      socket.broadcast.to(room).emit('newJoin', {
        joiner: newJoiner
      })
      currentRoom.namesUsed.push(username)
      currentRoom.players.push(newJoiner)
      currentRoom.playerNumber ++
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
      for (let i = 0; i < room.players.length; i++) {
        if (room.players[i].id === socket.id) {
          player = room.players[i]
          index = i
          break
        }
      }
      let nameIndex = room.namesUsed.indexOf(player.username)
      room.namesUsed.splice(nameIndex, 1)
      room.players.splice(index, 1)
      // delete room.namesUsed[nameIndex]
      // delete room.players[index]
      socket.broadcast.to(roomName).emit('leave', {
        roomInfo: room
      })
    }
  })
}
