import actions from '../actions'
import * as publicFlow from '../gameFlow/public' 

function createSocketMiddleware(socket) {
  var eventFlag = false
  return store => next => action => {
    console.log('dispatching', action)
    if (!eventFlag) {
      eventFlag = true
      socket.on('joinFail', () => {
        console.log('join fail')
      })
      socket.on('joinSuccess', (res) => {
        console.log(res)
        store.dispatch(actions.updateUserId(res.player.id))
        store.dispatch(actions.updateRoom(res.roomInfo))
        next(actions.hideJoin())
      })
      socket.on('newJoin', (res) => {
        next(actions.addNewPlayer(res.player))
      })
      socket.on('playerLeave', (res) => {
        console.log(res)
        next(actions.playerLeave(res))
      })
      socket.on('gameStart', (res) => {
        publicFlow.gameStart(store, actions, res)
        next(action)
      })
      socket.on('newGamePhase', (res) => {
        publicFlow.newGamePhase(store, actions, res)
        next(action)
      })
      socket.on('jumpPhase', (res) => {
        publicFlow.jumpPhase(store, actions, res)
        next(action)
      })
    }
    switch (action.type) {
      case 'JOIN_NEW_ROOM' :
        let username = store.getState().player.username
        socket.emit('join', {room: 'default', username: username})
        break
      case 'PLAYER_READY' :
        socket.emit('ready')
        break
      case 'LEAVE_ROOM' :
        socket.emit('leave')
        return next(actions.showJoin())
      case 'NEXT_GAME_PHASE' :
        socket.emit('nextGamePhase')
        break
    }
    return next(action)
  }
}

export default createSocketMiddleware