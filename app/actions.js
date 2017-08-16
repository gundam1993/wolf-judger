/*
 * action 类型
 */
export const SHOW_JOIN = 'SHOW_JOIN'
export const HIDE_JOIN = 'HIDE_JOIN'

// 显示 Join 界面
export function showJoin() {
  return {type: SHOW_JOIN}
}

// 隐藏 Join 界面
export function hideJoin() {
  return {type: HIDE_JOIN}
}