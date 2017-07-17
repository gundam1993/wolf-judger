var controllerStyle = require('./controller.css')
var io = require('socket.io-client') 
import EE from './lib/eventEmitter'
import SocketEventListener from './lib/SocketEventListener'

import React from 'react';
import ReactDOM from 'react-dom'
import Join from './components/join'
import GameBoard from './components/gameBoard'
import ControlBar from './components/controlBar'
import HintBar from './components/hintBar'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      socket: io('http://localhost:3000'),
      socketEventListener: {},
      roomInfo: {},
      stage: 'join',
      player: {}
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
    EE.on('gameStart', (res) => {
      let id = this.state.socket.id
      this.setState({roomInfo: res.roomInfo})
      this.setState({player: res.roomInfo.players[id]})
    })
    EE.on('victimChoose', (res) => {
      this.state.socket.emit('victimChoose', res)
    })
    EE.on('victimChosed', (res) => {
      this.setState({roomInfo: res.roomInfo})
    })
    EE.on('suspectsChoose', (res) => {
      this.state.socket.emit('suspectsChoose', res)
    })
  }
  render() {
    let join = null
    this.state.stage === 'join' ? join = <Join socket={this.state.socket}/> : join == null
    return (
      <div>
        {join}
        <GameBoard roomInfo={this.state.roomInfo} socket={this.state.socket} />
        <ControlBar stage={this.state.stage} />
        <HintBar stage={this.state.stage} roomInfo={this.state.roomInfo} player={this.state.player} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'))