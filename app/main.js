var controllerStyle = require('./controller.css')
var io = require('socket.io-client') 
import EE from './lib/eventEmitter'
import SocketEventListener from './lib/SocketEventListener'

import React from 'react';
import ReactDOM from 'react-dom'
import StateContainer from './components/stateContainer'
import ControlBar from './components/controlBar'
import HintBar from './components/hintBar'
import CountDown from './components/CountDown'
import DropCardChoose from './components/DropCardChoose'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentWillMount () {
    
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
    EE.on('drunkChosedDrop', (res) => {
      this.state.socket.emit('drunkChosedDrop', res)
    })
    EE.on('insomniacGetLastRole', () => {
      this.state.socket.emit('insomniacGetLastRole')
    })
    EE.on('minionGetWerewolf', () => {
      this.state.socket.emit('minionGetWerewolf')
    })
    EE.on('masonGetOtherMason', () => {
      this.state.socket.emit('masonGetOtherMason')
    })
    EE.on('masonGotResult', () => {
      this.state.socket.emit('masonGotResult')
    })
    EE.on('wereWolfGetOtherWereWolf', () => {
      this.state.socket.emit('wereWolfGetOtherWereWolf')
    })
    EE.on('wereWolfChosedDrop', (res) => {
      this.state.socket.emit('wereWolfChosedDrop', res)
    })
    EE.on('wereWolfGotResult', () => {
      this.state.socket.emit('wereWolfGotResult')
    })
    EE.on('doppelgangerChosedPlayer', (res) => {
      this.state.socket.emit('doppelgangerChosedPlayer', res)
    })
  }
  render() {
    return (
      <div>
        <StateContainer />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))