// 延迟调用函数
export const delayEmitter =  (func, args, time) => {
  setTimeout(() => {
      func(...args)
    }, time)
  }

// 显示系统提醒 
export const systemHint = (store, actions, message) => {
  store.dispatch(actions.addHintContent({
    from: 'system',
    content: message,
  }))
}

// 法官发言
export const judgeSay = (store, actions, message) => {
  store.dispatch(actions.addHintContent({
    from: '法官',
    content: message,
  }))
}