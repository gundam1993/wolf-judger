import { combineReducers } from 'redux'
import join from './join'
import player from './player'
import room from './room'

const gameApp = combineReducers({
  join,
  player,
  room,
})

export default gameApp
