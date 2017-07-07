import UiUploader from './ui'
const SocketEventListener = function (socket) {
  this.socket = socket
  this.init()
}

SocketEventListener.prototype.init = function() {
  this.socket.on('joinFail', UiUploader.showHint)
  this.socket.on('joinSuccess', UiUploader.showHint)
  this.socket.on('newJoin', UiUploader.showHint)
}

export default SocketEventListener