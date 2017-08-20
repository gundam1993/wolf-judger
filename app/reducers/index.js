import { combineReducers } from 'redux'
import join from './join'
import player from './player'
import room from './room'
import hint from './hint'

const gameApp = combineReducers({
  join,
  player,
  room,
  hint,
})

export default gameApp
