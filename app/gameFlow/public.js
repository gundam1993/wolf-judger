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

//新游戏阶段开始，显示睁眼信息
export const newGamePhase = (store, actions, res) => {
  store.dispatch(actions.updateHintContent(`${res.phase}请睁眼`))
}

//新游戏阶段开始，但是无人需要睁眼，显示睁眼信息，等待后跳过
export const jumpPhase = (store, actions, res) => {
  store.dispatch(actions.updateHintContent(`${res.phase}请睁眼`))
  delayEmitter(nextGamePhase, [store, actions], 1000)
}

const delayEmitter =  (func, args, time) => {
  setTimeout(() => {
      func(...args)
    }, time)
}