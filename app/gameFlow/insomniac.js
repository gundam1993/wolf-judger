import { phaseEnd } from './public'
import * as FlowHelper from './flowHelper'

// 失眠者发送消息确认行动开始
export const insomniacStart = (store, actions) => {
  if (store.getState().player.lastRole === 'insomniac') {
    store.dispatch({type: 'INSOMNIAC_GET_LAST_ROLE'})
  }
}

export const insomniacGotLastRole = (store, actions, res) => {
  console.log(res)
  if (store.getState().player.lastRole === 'insomniac') {
    let info = `您最后的身份为${res.role}`
    FlowHelper.judgeSay(store, actions, info)
  }
  FlowHelper.delayEmitter(phaseEnd, [store, actions, {phase: 'insomniac'}], 1000)
}
