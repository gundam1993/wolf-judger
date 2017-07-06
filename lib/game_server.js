const socketio = require('socket.io')
var io
var nickNames = {}
var namesUsed = []
var rooms = {
  default: {
    playerNumber: 0,
    playerLimit: 0,
    players: []
  }
}

exports.listen = function (server) {
  io = socketio(server)
  io.on('connection', (socket) => {
    handleNewPlayer(socket, rooms, nickNames, namesUsed)
  })
}

function handleNewPlayer(socket, rooms, nickNames, namesUsed) {
  socket.on('join', function (message) {
    console.log(message)
    let room =message.room
    let username = message.username
    let currentRoom = rooms[room]
    if (currentRoom.playerNumber < currentRoom.playerLimit) {
      console.log('success for now')
    } else {
      socket.emit('joinFail', {res: '对不起，该房间已经满员了'})
    }
  })
}
