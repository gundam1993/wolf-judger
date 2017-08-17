/*
 * action 类型
 */
import * as publics from './public'
import * as player from './player'
import * as join from './join'
import * as room from './room'

let action = Object.assign({}, publics, player, join, room)

export default action