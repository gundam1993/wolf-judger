/*
 * action 类型
 */
import * as publics from './public'
import * as player from './player'
import * as join from './join'
import * as room from './room'
import * as hint from './hint'
import * as drop from './drop'

let action = Object.assign({}, publics, player, join, room, hint, drop)

export default action