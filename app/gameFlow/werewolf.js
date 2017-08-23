import { phaseEnd } from './public'

// 狼人发送消息确认行动开始
export const wereWolfStart = (store, actions) => {
  if (store.getState().player.lastRole === 'wereWolf') {
    store.dispatch({type: 'WEREWOLF_GET_PARTNER'})
  }
}

// 狼人获得同伴信息，若没有同伴，选择遗弃身份
export const wereWolfGotPartner = (store, actions, res) => {
  console.log(res)
  if (res.wereWolf.length) {
    store.dispatch(actions.updateHintContent('除了您以外，目前身份是狼人的玩家有：'))
    store.dispatch(actions.updateSubContent(res.wereWolf.join('和')))
    delayEmitter(wereWolfGotResult, [store, actions], 1000)
  } else {
    store.dispatch(actions.updateHintContent('除您以外目前场上没有狼人'))
    store.dispatch(actions.updateSubContent('您可以查看一张遗弃身份'))
    delayEmitter(wereWolfChooseDrop, [store, actions], 1000)
  }
}

// 狼人选择遗弃身份
const wereWolfChooseDrop = (store, actions) => {
  store.dispatch(actions.updateDropLimit(1))
  store.dispatch(actions.updateSocketEvent('wereWolfChosedDrop'))
  store.dispatch(actions.displayDrop())
}

// 狼人获得遗弃身份信息，阶段结束
export const wereWolfChosedDropResult = (store, actions, res) => {
  if (res && res.role) {
    store.dispatch(actions.updateHintContent('您所选择的遗弃身份是：'))
    store.dispatch(actions.updateSubContent(`${res.role}`))
    store.dispatch(actions.displayHint())
  }
  delayEmitter(phaseEnd, [store, actions, {phase: '狼人'}], 1000)
}

// 狼人获得同伴信息后，阶段结束
const wereWolfGotResult = (store, actions) => {
  store.dispatch({type: 'SUBMIT_SOCKET_EVENT', event: 'wereWolfGotResult'})
}

// 延迟调用函数
const delayEmitter =  (func, args, time) => {
  setTimeout(() => {
      func(...args)
    }, time)
  }
