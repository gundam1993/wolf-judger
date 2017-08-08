const socketio = require('socket.io')
const WereWolf = require('./roles/wereWolf')
const Mason = require('./roles/mason')
const Minion = require('./roles/minion')
const Insomniac = require('./roles/insomniac')
const Drunk = require('./roles/drunk')
const TroubleMaker = require('./roles/troubleMaker')


var io
var rooms = {
  default: {
    name: 'default',
    playerNumber: 0,
    playerLimit: 3,
    ready: 0,
    masonEnd: false,
    wereWolfEnd: false,
    roles: {
      wereWolf: 2,
      villager: 2,
      // troubleMaker: 1,
      // doppelganger: 1,
      // minion: 3,
      mason: 2
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
    socket.use((packet, next) => {
      let roomName = Object.keys(socket.rooms)[1]
      let room = rooms[roomName]
      console.log('=====packet=====')
      packet.push(room)
      packet.push(socket)
      console.log(packet)
      console.log('=========')
      return next()
    })
    handleNewPlayer(socket, rooms)
    handleClientDisconnection(socket, rooms)
    handleClientleaveRoom(socket, rooms)
    handleClientReady(socket, rooms)
    handleNextGamePhase(socket, rooms)
    handleSeerChoosePlayer(socket, rooms)
    handleSeerChooseDrop(socket, rooms)
    handleRobberNotChange(socket, rooms)
    handleRobberChoosePlayer(socket, rooms)
    socket.on('wereWolfGetOtherWereWolf', WereWolf.getTeammate)
    socket.on('wereWolfChosedDrop', WereWolf.ChosedDrop)
    socket.on('wereWolfGotResult', WereWolf.gotResult)
    socket.on('masonGetOtherMason', Mason.getOtherMason)
    socket.on('masonGotResult', Mason.gotResult)
    socket.on('minionGetWerewolf', Minion.getWerewolf)
    socket.on('insomniacGetLastRole', Insomniac.getLastRole)
    socket.on('drunkChosedDrop', Drunk.exchangeIdentity)
    socket.on('troubleMakerChosedPlayer', TroubleMaker.exchangeIdentity)
    socket.on('troubleMakerNotExchange', TroubleMaker.notExchangeIdentity)

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
function handleClientDisconnection(socket) {
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
function handleClientleaveRoom(socket) {
  socket.on('leave', function (room) {
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
function handleClientReady(socket) {
  socket.on('ready', function (room) {
    let roomName = room.name
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
function handleNextGamePhase(socket) {
  socket.on('nextGamePhase', function (room) {
    let roomName = room.name
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
function handleSeerChoosePlayer(socket) {
  socket.on('seerChosedPlayer', function (player, room) {
    let roomName = room.name
    player = room.players[player.id]
    if (player.username) {
      socket.broadcast.in(roomName).emit('SeerChoosePlayerResult')
      socket.emit('SeerChoosePlayerResult', { role: player.role })
    }
  })
}
//预言家查看弃牌
function handleSeerChooseDrop(socket) {
  socket.on('seerChosedDrop', function (res, room) {
    let roles = [room.dropRole[res.dropRole[0]], room.dropRole[res.dropRole[1]]]
    console.log(roles)
    socket.broadcast.in(room.name).emit('SeerChooseDropResult')
    socket.emit('SeerChooseDropResult', { roles: roles })
  })
}
//强盗不交换身份
function handleRobberNotChange(socket) {
  socket.on('robberNotChange', function (room) {
    socket.broadcast.in(room.name).emit('robberChangeRoleResult')
    socket.emit('robberChangeRoleResult')
  })
}
//强盗交换身份
function handleRobberChoosePlayer(socket) {
  socket.on('robberChosedPlayer', function (player) {
    player = room.players[player.id]
    let robber = room.players[socket.id]
    if (player.username) {
      robber.lastRole = player.role
      player.lastRole = 'robber'
    }
    console.log(room)
    socket.broadcast.in(room.name).emit('robberChangeRoleResult')
    socket.emit('robberChangeRoleResult', {role: robber.lastRole})
  })
}

