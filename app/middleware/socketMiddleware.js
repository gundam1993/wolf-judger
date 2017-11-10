import actions from '../actions'
import * as publicFlow from '../gameFlow/public'
import * as wereWolfFlow from '../gameFlow/werewolf'  
import * as minionFlow from '../gameFlow/minion' 
import * as masonFlow from '../gameFlow/mason'
import * as insomniacFlow from '../gameFlow/insomniac'
import * as seerFlow from '../gameFlow/seer'

function createSocketMiddleware(socket) {
  var eventFlag = false
  return store => next => action => {
    console.log('dispatching', action)
    if (!eventFlag) {
      eventFlag = true
      socket.on('joinFail', () => {
        console.log('join fail')
      })
      socket.on('error', (error) => {
        console.log(error)
      })
      socket.on('joinSuccess', (res) => {
        console.log(res)
        store.dispatch(actions.updateUserId(res.player.id))
        store.dispatch(actions.updateRoom(res.roomInfo))
        next(actions.hideJoin())
      })
      socket.on('newJoin', (res) => {
        store.dispatch(actions.addHintContent({
          from: 'system',
          content: `${res.player.username}进入了房间`,
        }))
        next(actions.addNewPlayer(res.player))
      })
      socket.on('playerLeave', (res) => {
        console.log(res)
        store.dispatch(actions.addHintContent({
          from: 'system',
          content: `${res.leaveUsername}离开了房间`,
        }))
        next(actions.playerLeave(res.players))
      })
      socket.on('gameStart', (res) => {
        publicFlow.gameStart(store, actions, res)
        next(action)
      })
      socket.on('newGamePhase', (res) => {
        publicFlow.newGamePhaseStart(store, actions, res)
        next(action)
      })
      socket.on('wereWolfGotPartner', (res) => {
        wereWolfFlow.wereWolfGotPartner(store, actions, res)
        next(action)
      })
      socket.on('wereWolfChosedDropResult', (res) => {
        wereWolfFlow.wereWolfChosedDropResult(store, actions, res)
      })
      socket.on('minionGetWerewolfResult', (res) => {
        minionFlow.minionGetWerewolf(store, actions, res)
      })
      socket.on('masonGetOtherMasonResult', (res) => {
        masonFlow.masonGetOtherMason(store, actions, res)
      })
      socket.on('masonEnd', (res) => {
        masonFlow.masonGotResult(store, actions, res)
      })
      socket.on('insomniacLastRoleResult', (res) => {
        insomniacFlow.insomniacGotLastRole(store, actions, res)
      })
      socket.on('seerChoseTargetType', (res) => {
        seerFlow.seerStartToChoose(store, actions, res)
      })
      socket.on('seerChoosePlayerResult', (res) => {
        seerFlow.seerChoosePlayerResult(store, actions, res)
      })
      socket.on('seerChooseDropResult', (res) => {
        seerFlow.seerChooseDropResult(store, actions, res)
      })
      socket.on('phaseEnd', (res) => {
        publicFlow.phaseEnd(store, actions, res)
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
      case 'WEREWOLF_GET_PARTNER' :
        socket.emit('wereWolfGetPartner')
        break
      case 'MINION_GET_WEREWOLF' :
        socket.emit('minionGetWerewolf')
        break
      case 'MASON_GET_OTHER_MASON' :
        socket.emit('masonGetOtherMason')
        break
      case 'MASON_GOT_RESULT' :
        socket.emit('masonGotResult')
        break
      case 'INSOMNIAC_GET_LAST_ROLE' :
        socket.emit('insomniacGetLastRole')
        break
      case 'SUBMIT_SOCKET_EVENT' :
        if (action.payload) {
          socket.emit(action.socketEvent, action.payload)
        } else {
          socket.emit(action.socketEvent)
        }
        break
    }
    return next(action)
  }
}

export default createSocketMiddleware