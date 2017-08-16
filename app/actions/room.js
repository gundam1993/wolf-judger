export const UPDATE_ROOM = 'UPDATE_ROOM'
export const ADD_NEW_PLAYER = 'ADD_NEW_PLAYER'

//更新房间状态
export function updateRoom (room) {
  return {type: UPDATE_ROOM, roomInfo: room}
}

//更新用户Id
export function addNewPlayer (player) {
  return {type: ADD_NEW_PLAYER, player: player}
}