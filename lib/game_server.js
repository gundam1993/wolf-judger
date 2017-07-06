const socketio = require('socket.io')
var io
var PlayerNumber = 1
var nickNames = {}
var namesUsed = []
var currentRoom = {}

exports.listen = function (server) {
  io = socketio(server)
  io.on('connection', (socket) => {
    console.log(socket)
  })
}