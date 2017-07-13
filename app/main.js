var controllerStyle = require('./controller.css')
var io = require('socket.io-client') 
import EE from './lib/eventEmitter'
import SocketEventListener from './lib/SocketEventListener'

import React from 'react';
import ReactDOM from 'react-dom'
import Join from './components/join'
import GameBoard from './components/gameBoard'
import ControlBar from './components/controlBar'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      socket: io('http://localhost:3000'),
      socketEventListener: {},
      roomInfo: {},
      stage: 'join'
    }
  }
  componentWillMount () {
    this.setState({socketEventListener: new SocketEventListener(this.state.socket)})
    EE.on('joinSuccess', (res) => {
      this.setState({roomInfo: res.roomInfo})
      this.setState({stage: 'prepare'})
    })
    EE.on('newJoin', (res) => {
      this.setState({roomInfo: res.roomInfo})
    })
    EE.on('leaveRoom', () => {
      this.state.socket.emit('leave')
      this.setState({roomInfo: {}})
      this.setState({stage: 'join'})
    })
    EE.on('playerLeave', (res) => {
      this.setState({roomInfo: res.roomInfo})
    })
    EE.on('ready', (res) => {
      this.state.socket.emit('ready')
      this.setState({stage: 'ready'})
    })
  }
  render() {
    let join = null
    this.state.stage === 'join' ? join = <Join socket={this.state.socket}/> : join == null
    return (
      <div>
        {join}
        <GameBoard roomInfo={this.state.roomInfo} socket={this.state.socket} />
        <ControlBar stage={this.state.stage} player={{}}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'))