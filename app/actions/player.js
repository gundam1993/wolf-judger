export const UPDATE_USERNAME = 'UPDATE_USERNAME'
export const UPDATE_USER_ID = 'UPDATE_USER_ID'
export const PLAYER_READY = 'PLAYER_READY'
export const UPDATE_ROLE = 'UPDATE_ROLE'
export const UPDATE_LAST_ROLE = 'UPDATE_LAST_ROLE'

//更新用户名
export function updateUsername (username) {
  return {type: UPDATE_USERNAME, username: username}
}
//更新用户Id
export function updateUserId (id) {
  return {type: UPDATE_USER_ID, id: id}
}
//用户准备
export function playerReady() {
  return {type: PLAYER_READY }
}
// 更新用户初始身份
export function updateRole(role) {
  return {type: UPDATE_ROLE, role: role}
}
// 更新用户最终身份
export function updateLastRole(role) {
  return {type: UPDATE_LAST_ROLE, lastRole: role}
}
