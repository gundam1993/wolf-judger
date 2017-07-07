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
  EE.on('joinSuccess', this.enterGameUI)

}

UiUploader.prototype.showHint = function(message) {
  console.log(message)
}

UiUploader.prototype.enterGameUI = (roomInfo) => {
  let usernameBlock = document.getElementById('username-block')
  let app = document.getElementById('app')
  app.removeChild(usernameBlock)
  console.log(roomInfo)
  let gameBoard = document.createElement('div')
  gameBoard.id = 'gameBoard'
  let controller = document.createElement('div')
  controller.id = 'controller'
  app.appendChild(gameBoard)
  app.appendChild(controller)
};

export default new UiUploader()