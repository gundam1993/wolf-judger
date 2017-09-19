import { combineReducers } from 'redux'
import join from './join'
import player from './player'
import room from './room'
import hint from './hint'
import modal from './modal'
import bottomControlBar from './bottomControlBar'

const gameApp = combineReducers({
  join,
  player,
  room,
  hint,
  modal,
  bottomControlBar,
})

export default gameApp
