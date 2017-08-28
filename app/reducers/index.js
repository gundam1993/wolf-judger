import { combineReducers } from 'redux'
import join from './join'
import player from './player'
import room from './room'
import hint from './hint'
import drop from './drop'
import bottomControlBar from './bottomControlBar'

const gameApp = combineReducers({
  join,
  player,
  room,
  hint,
  drop,
  bottomControlBar,
})

export default gameApp
