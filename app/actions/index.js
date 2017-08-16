/*
 * action 类型
 */
import * as player from './player'
import * as join from './join'

let action = Object.assign({}, player, join)

export default action