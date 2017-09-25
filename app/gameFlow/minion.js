import { phaseEnd } from './public'
import * as FlowHelper from './flowHelper'

// 爪牙发送消息确认行动开始
export const minionStart = (store, actions) => {
  if (store.getState().player.lastRole === 'minion') {
    store.dispatch({type: 'MINION_GET_WEREWOLF'})
  }
}

// 爪牙获得狼人信息,显示后结束阶段
export const minionGetWerewolf = (store, actions, res) => {
  console.log(res)
  if (res.wereWolf) {
    let info = res.wereWolf.length ? `目前身份是狼人的玩家有：${res.wereWolf.join('和')}。` : '目前场上没有狼人'
    FlowHelper.judgeSay(store, actions, info)
    FlowHelper.delayEmitter(phaseEnd, [store, actions, {phase: 'minion'}], 1000)
  }
}