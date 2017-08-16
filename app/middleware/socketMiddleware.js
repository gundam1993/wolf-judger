import { showJoin, hideJoin } from '../actions'

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
        next(hideJoin())
      })
    }
    switch (action.type) {
      case 'JOIN_NEW_ROOM' :
        socket.emit('join', action.info)
    }
  }
}

export default createSocketMiddleware