const socketio = require('socket.io')
var io
var rooms = {
  default: {
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
      socket.join(room)
      let newJoiner = {
        username: username,
        role: '',
        live: true
      }
      socket.broadcast.to(room).emit('newJoin', {
        socketId: socket.id,
        joiner: newJoiner
      })
      currentRoom.namesUsed.push(username)
      currentRoom.players[socket.id] = newJoiner
      currentRoom.playerNumber ++
      socket.emit('joinSuccess', {roomInfo: currentRoom})
    } else {
      socket.emit('joinFail', {res: '对不起，该房间已经满员了'})
    }
  })
}
