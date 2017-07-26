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
    // EE.on('victimChoose', (res) => {
    //   this.state.socket.emit('victimChoose', res)
    // })
    // EE.on('victimChosed', (res) => {
    //   this.setState({roomInfo: res.roomInfo})
    // })
    // EE.on('suspectsChoose', (res) => {
    //   this.state.socket.emit('suspectsChoose', res)
    // })
    // EE.on('witchUseMedicine', () => {
    //   this.state.socket.emit('witchUseMedicine')
    // })
    // EE.on('witchUseMedicineResult', (res) => {
    //   this.setState({roomInfo: res.roomInfo})
    // })
    // EE.on('poisonChoose', (res) => {
    //   this.state.socket.emit('poisonChoose', res)
    // })
    // EE.on('witchUsePoisonResult', (res) => {
    //   this.setState({roomInfo: res.roomInfo})
    //   this.state.socket.emit('nightEnd', res)
    // })
    // EE.on('nightResult', (res) => {
    //   this.setState({roomInfo: res.roomInfo})
    //   this.setState({victim: res.victim})
    //   this.setState({stage: 'lastWord'})
    // })
    // EE.on('myWordOver', () => {
    //   this.state.socket.emit('myWordOver', {stage: this.state.stage})
    // })
  }
  render() {
    let join = null
    this.state.stage === 'join' ? join = <Join socket={this.state.socket}/> : join == null
    return (
      <div>
        {join}
        <GameBoard roomInfo={this.state.roomInfo} socket={this.state.socket} />
        <ControlBar stage={this.state.stage} />
        <HintBar stage={this.state.stage} roomInfo={this.state.roomInfo} player={this.state.player} victim={this.state.victim}/>
        <CountDown />
        <DropCardChoose dropRole={this.state.roomInfo.dropRole}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'))