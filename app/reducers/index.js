import { combineReducers } from 'redux'
import join from './join'
import player from './player'
import room from './room'
import hint from './hint'
import drop from './drop'

const gameApp = combineReducers({
  join,
  player,
  room,
  hint,
  drop,
})

export default gameApp
