import { wereWolfStart } from './werewolf'

// 游戏开始，显示身份信息
export const gameStart = (store, actions, res) => {
  console.log(res)
  store.dispatch(actions.updateRole(res.role))
  store.dispatch(actions.updateLastRole(res.lastRole))
  store.dispatch(actions.updateHintContent('游戏开始'))
  store.dispatch(actions.updateSubContent(`您的身份是${res.role}`))
  store.dispatch(actions.displayHint())
  delayEmitter(closeEye, [store, actions], 1000)
}

// 显示闭眼信息
const closeEye = (store, actions) => {
  store.dispatch(actions.updateHintContent('天黑请闭眼'))
  store.dispatch(actions.updateSubContent(''))
  delayEmitter(nextGamePhase, [store, actions], 1000)
}

// 向服务端发送确认信息
const nextGamePhase = (store, actions) => {
  store.dispatch({type: 'NEXT_GAME_PHASE'})
}

// 新游戏阶段开始，显示睁眼信息
export const newGamePhaseStart = (store, actions, res) => {
  store.dispatch(actions.updateHintContent(`${res.phase}请睁眼`))
  switch (res.phase) {
    case 'wereWolf' :
      delayEmitter(wereWolfStart, [store, actions], 1000)
      break
  }
}

// 新游戏阶段开始，但是无人需要睁眼，显示睁眼信息，等待后显示闭眼信息
export const jumpPhase = (store, actions, res) => {
  store.dispatch(actions.updateHintContent(`${res.phase}请睁眼`))
  delayEmitter(phaseEnd, [store, actions, res], 1000)
}

// 阶段结束，显示闭眼信息，通知服务器开始新阶段
export const phaseEnd = (store, actions, res) => {
  store.dispatch(actions.updateHintContent(`${res.phase}请闭眼`))
  store.dispatch(actions.updateSubContent(''))
  delayEmitter(nextGamePhase, [store, actions], 1000)
}

// 延迟调用函数
const delayEmitter =  (func, args, time) => {
  setTimeout(() => {
      func(...args)
    }, time)
  }
