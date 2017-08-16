export const SHOW_JOIN = 'SHOW_JOIN'
export const HIDE_JOIN = 'HIDE_JOIN'
export const JOIN_NEW_ROOM = 'JOIN_NEW_ROOM'

// 显示 Join 界面
export function showJoin() {
  return {type: SHOW_JOIN}
}

// 隐藏 Join 界面
export function hideJoin() {
  return {type: HIDE_JOIN}
}

// 加入新房间
export function joinNewRoom() {
  return {type: JOIN_NEW_ROOM}
}