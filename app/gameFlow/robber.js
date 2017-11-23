import { phaseEnd } from './public'
import * as FlowHelper from './flowHelper'

export const robberStart = (store, actions) => {
  if (store.getState().player.role !== 'robber') {
    return
  }
  FlowHelper.judgeSay(store, actions, `请强盗选择是否要交换身份`)
  store.dispatch(actions.updateOptionsSrc([
    {src: "/img/cancel.png", content: "否"},    
    {src: "/img/confirm.png", content: "是"}
  ]))
  store.dispatch(actions.updateChosenLimit(1))
  store.dispatch(actions.updateSocketEvent('isRobberChangeRole'))
  store.dispatch(actions.displayModal())
}

export const robberExchangeIdentity = (store, actions) => {
  FlowHelper.judgeSay(store, actions, `请强盗选择交换身份的对象`)
  let players = store.getState().room.players
  let content = []
  console.table(players)
  for (let key in players) {
    console.log(players[key].id)
    console.log(store.getState().player)
    if (players[key].id === store.getState().player.id) continue
    content.push({
      src: players[key].avatar,
      content: players[key].username,
      value: players[key].id,
    })
  }
  store.dispatch(actions.updateOptionsSrc(content))
  store.dispatch(actions.updateChosenLimit(1))
  store.dispatch(actions.updateSocketEvent('robberChosedPlayer'))
  store.dispatch(actions.displayModal())
  console.log('end')
}

export const robberChangeRoleResult = (store, actions, res) => {
  if (store.getState().player.role === 'robber') {
    if (res.notChange && res.role === "") {
      FlowHelper.judgeSay(store, actions, `强盗选择不交换身份`)
    }
    if (!res.notChange && res.role && res.target) {
      FlowHelper.judgeSay(store, actions, `强盗与${res.target}交换了身份，强盗现在的身份是${res.role}`)
      store.dispatch(actions.updateLastRole(res.role))
    }
  }
  FlowHelper.delayEmitter(phaseEnd, [store, actions, {phase: 'robber'}], 1000)
}