import * as FlowHelper from './flowHelper'
import { phaseEnd } from './public'

export const seerStart = (store, actions) => {
  if (store.getState().player.lastRole !== 'seer') {
    return
  }
  FlowHelper.judgeSay(store, actions, `请预言家选择要查看的对象`)
  store.dispatch(actions.updateOptionsSrc([
    {src: "/img/player.png", content: "一名玩家"}, 
    {src: "/img/drops.png", content: "两张弃牌"}
  ]))
  store.dispatch(actions.updateChosenLimit(1))
  store.dispatch(actions.updateSocketEvent('seerChooseTargetType'))
  store.dispatch(actions.displayModal())
}

export const seerStartToChoose = (store, actions, res) => {
  if (store.getState().player.lastRole !== 'seer') {
    return
  }
  if (res.type === "player") {
    seerChoosePlayer(store, actions, res)
  } else if (res.type === "drop") {
    seerChooseDrop(store, actions, res)
  }
}

const seerChoosePlayer = (store, actions, res) => {
  FlowHelper.judgeSay(store, actions, `预言家选择查看一名玩家的身份`)
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
  store.dispatch(actions.updateSocketEvent('seerChosedPlayer'))
  store.dispatch(actions.displayModal())
}

const seerChooseDrop = (store, actions, res) => {
  FlowHelper.judgeSay(store, actions, `预言家选择查看两张弃牌`)
  store.dispatch(actions.updateOptionsSrc([
    {src: "/img/ques.png", content: ""}, 
    {src: "/img/ques.png", content: ""}, 
    {src: "/img/ques.png", content: ""},
  ]))
  store.dispatch(actions.updateChosenLimit(2))
  store.dispatch(actions.updateSocketEvent('seerChosedDrop'))
  store.dispatch(actions.displayModal())
}

export const seerChoosePlayerResult = (store, actions, res) => {
  if (store.getState().player.lastRole === 'seer' && res) {
    FlowHelper.judgeSay(store, actions, `您所选择的玩家现在的身份是：${res.role}`)
  }
  FlowHelper.delayEmitter(phaseEnd, [store, actions, {phase: 'seer'}], 1000)
}

export const seerChooseDropResult = (store, actions, res) => {
  if (store.getState().player.lastRole === 'seer' && res.roles.length === 2) {
    FlowHelper.judgeSay(store, actions, `您所选择的弃牌是：${res.roles[0]}和${res.roles[1]}`)
  }
  FlowHelper.delayEmitter(phaseEnd, [store, actions, {phase: 'seer'}], 1000)
}