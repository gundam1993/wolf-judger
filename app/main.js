var gameBoardStyle = require('./gameboard.css')
var controllerStyle = require('./controller.css')
var io = require('socket.io-client') 
import EE from './lib/eventEmitter'
import SocketEventListener from './lib/SocketEventListener'

import React from 'react';
import ReactDOM from 'react-dom'
import Join from './components/join'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      socket: io('http://localhost:3000'),
      socketEventListener: {},
      roomInfo: {},
      satge: 'join'
    }
  }
  componentWillMount () {
    this.setState({socketEventListener: new SocketEventListener(this.state.socket)})
    EE.on('joinSuccess', (res) => {
      console.log(res)
      this.setState({roomInfo: res.roomInfo})
      this.setState({satge: 'prepare'})
    })
  }
  render() {
    let join = null
    this.state.satge === 'join' ? join = <Join socket={this.state.socket}/> : join == null
    return (
      <div>
        {join}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'))