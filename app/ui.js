/**
 * UI更新模块，接收从EventEmitter发来的消息，更新页面
 */
import EE from './eventEmitter'
const UiUploader = function () {
  console.log('ui uploader ready')
  this.init()
}

UiUploader.prototype.init = function() {
  EE.on('joinFail', this.showHint)
  EE.on('joinSuccess', this.buildGameUI)

}

UiUploader.prototype.showHint = function(message) {
  console.log(message)
}

UiUploader.prototype.buildGameUI = (res) => {
  let usernameBlock = document.getElementById('username-block')
  let app = document.getElementById('app')
  app.removeChild(usernameBlock)
  console.log(Object.keys(res.roomInfo.players))
  let inner = '<div id="gameBoard">'
  for (var i = 0; i < res.roomInfo.playerLimit; i++) {
    inner += `<div class="playerBlock" id="${}"></div>`
  }
  inner += '</div><div id="playerBlock"></div>'
  app.innerHTML = inner
};

export default new UiUploader()