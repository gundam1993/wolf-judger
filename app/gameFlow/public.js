import { wereWolfStart } from './werewolf'
import { seerStart } from './seer'
import { minionStart } from './minion'
import { masonStart } from './mason'
import { insomniacStart } from './insomniac'
import * as FlowHelper from './flowHelper'

const RoleEntrance = {
  wereWolf: wereWolfStart,
  seer: seerStart,
  minion: minionStart,
  mason: masonStart,
  insomniac: insomniacStart,
}

// 游戏开始，显示身份信息
export const gameStart = (store, actions, res) => {
  console.log(res)
  store.dispatch(actions.updateRole(res.role))
  store.dispatch(actions.updateLastRole(res.lastRole))
  FlowHelper.systemHint(store, actions, '游戏开始')
  FlowHelper.systemHint(store, actions, `您的身份是${res.role}`)
  FlowHelper.judgeSay(store, actions, '天黑请闭眼。')
  FlowHelper.delayEmitter(closeEye, [store, actions], 1000)
}

// 显示闭眼信息
const closeEye = (store, actions) => {
  // store.dispatch(actions.updateHintContent('天黑请闭眼'))
  // store.dispatch(actions.updateSubContent(''))
  delayEmitter(nextGamePhase, [store, actions], 1000)
}

// 向服务端发送确认信息
const nextGamePhase = (store, actions) => {
  store.dispatch({type: 'NEXT_GAME_PHASE'})
}

// 新游戏阶段开始，显示睁眼信息
export const newGamePhaseStart = (store, actions, res) => {
  if (store.getState().player.lastRole === res.phase) {
    FlowHelper.judgeSay(store, actions, `${res.phase}请睁眼`)
    delayEmitter(RoleEntrance[res.phase], [store, actions], 1000)
  }
}

// 阶段结束，显示闭眼信息，通知服务器开始新阶段
export const phaseEnd = (store, actions, res) => {
  if (store.getState().player.lastRole === res.phase) {
    FlowHelper.judgeSay(store, actions, `${res.phase}请闭眼`)
  }
  delayEmitter(nextGamePhase, [store, actions], 1000)  
}

// 延迟调用函数
export const delayEmitter =  (func, args, time) => {
  setTimeout(() => {
    func(...args)
  }, time)
}
