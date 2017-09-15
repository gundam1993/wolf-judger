import * as FlowHelper from './flowHelper'

export const seerStart = (store, actions) => {
  if (store.getState().player.lastRole !== 'seer') {
    return
  }
  FlowHelper.judgeSay(store, actions, `请预言家选择要查看的对象`)
  // store.dispatch(actions.updateHintContent('请预言家选择要查看的对象'))
  // store.dispatch(actions.updateSubContent(``))
}