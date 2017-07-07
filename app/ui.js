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
  EE.on('joinSuccess', this.showHint)

}

UiUploader.prototype.showHint = function(message) {
  console.log(message)
}

export default new UiUploader()