import { combineReducers } from 'redux'
import join from './join'
import player from './player'

const gameApp = combineReducers({
  join,
  player,
})

export default gameApp
