export const UPDATE_ROOM = 'UPDATE_ROOM'
export const ADD_NEW_PLAYER = 'ADD_NEW_PLAYER'
export const PLAYER_LEAVE = 'PLAYER_LEAVE'

//更新房间状态
export function updateRoom (room) {
  return {type: UPDATE_ROOM, roomInfo: room}
}

//更新用户Id
export function addNewPlayer (player) {
  return {type: ADD_NEW_PLAYER, player: player}
}

//玩家离开，更新玩家列表
export function playerLeave(players) {
  return {type: PLAYER_LEAVE, players: players}
}
