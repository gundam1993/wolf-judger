export const UPDATE_USERNAME = 'UPDATE_USERNAME'
export const UPDATE_USERID = 'UPDATE_USERID'
export const PLAYER_READY = 'PLAYER_READY'

//更新用户名
export function updateUsername (username) {
  return {type: UPDATE_USERNAME, username: username}
}

//更新用户Id
export function updateUserId (id) {
  return {type: UPDATE_USERID, id: id}
}

//用户准备
export function playerReady() {
  return {type: PLAYER_READY}
}