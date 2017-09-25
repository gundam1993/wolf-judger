import { phaseEnd } from './public'
import * as FlowHelper from './flowHelper'

// 守卫发送消息确认行动开始
export const masonStart = (store, actions) => {
  if (store.getState().player.lastRole === 'mason') {
    store.dispatch({type: 'MASON_GET_OTHER_MASON'})
  }
}

export const masonGetOtherMason = (store, actions, res) => {
  console.log(res)
  if (store.getState().player.lastRole === 'mason') {
    let info = res.mason ? `目前身份是守卫的玩家有：您和${res.mason}。` : '目前场上除您以外没有守卫'
    FlowHelper.judgeSay(store, actions, info)
  }
  store.dispatch({type: 'MASON_GOT_RESULT'})
}

export const masonGotResult = (store, actions) => {
  FlowHelper.delayEmitter(phaseEnd, [store, actions, {phase: 'mason'}], 1000)
}