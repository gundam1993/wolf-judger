const SocketEventListener = function (socket) {
  this.socket = socket
}

SocketEventListener.prototype.init() = function() {
  this.socket.on('joinFail', this.showHint())
};