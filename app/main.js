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
import CountDown from './components/CountDown'
import DropCardChoose from './components/DropCardChoose'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      socket: io('http://localhost:3000'),
      socketEventListener: {},
      roomInfo: {},
      stage: 'join',
      player: {},
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
    EE.on('nextGamePhase', (res) => {
      this.state.socket.emit('nextGamePhase')
    })
    EE.on('newGamePhase', (res) => {
      this.setState({roomInfo: res.roomInfo})
    })
    EE.on('seerChosedPlayer', (res) => {
      this.state.socket.emit('seerChosedPlayer', res)
    })
    EE.on('seerChosedDrop', (res) => {
      this.state.socket.emit('seerChosedDrop', res)
    })
    EE.on('robberNotChange', () => {
      this.state.socket.emit('robberNotChange')
    })
    EE.on('robberChosedPlayer', (res) => {
      this.state.socket.emit('robberChosedPlayer', res)
    })
    EE.on('troubleMakerNotExchange', () => {
      this.state.socket.emit('troubleMakerNotExchange')
    })
    EE.on('troubleMakerChosedPlayer', (res) => {
      this.state.socket.emit('troubleMakerChosedPlayer', res)
    })
  }
  render() {
    let join = null
    this.state.stage === 'join' ? join = <Join socket={this.state.socket}/> : join == null
    return (
      <div>
        {join}
        <GameBoard roomInfo={this.state.roomInfo} socket={this.state.socket} player={this.state.player} />
        <ControlBar stage={this.state.stage} />
        <HintBar stage={this.state.stage} roomInfo={this.state.roomInfo} player={this.state.player} victim={this.state.victim}/>
        <CountDown />
        <DropCardChoose dropRole={this.state.roomInfo.dropRole}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'))