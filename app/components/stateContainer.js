var io = require('socket.io-client') 
import EE from '../lib/eventEmitter'
import SocketEventListener from '../lib/SocketEventListener'

import React from 'react';
import ReactDOM from 'react-dom'

import Join from './join'
import GameBoard from './gameBoard'
import ControlBar from './controlBar'
import HintBar from './hintBar'

class StateContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      socket: io("http://localhost:3000"),
      socketEventListener: {},
      roomInfo: {},
      stage: 'join',
      player: {},
      join: {
        display: true
      },
    }
  }
  componentWillMount () {
    this.setState({socketEventListener: new SocketEventListener(this.state.socket)})
    EE.on('userLogin', (res) => {
      this.state.socket.emit('join', res)
    })
    EE.on('joinSuccess', (res) => {
      this.setState({roomInfo: res.roomInfo})
      this.setState({stage: 'prepare'})
      this.setState({join: {display: false}})
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
        <Join display={this.state.join.display} />
        <GameBoard roomInfo={this.state.roomInfo} player={this.state.player} />
        <ControlBar stage={this.state.stage} />
        <HintBar stage={this.state.stage} roomInfo={this.state.roomInfo} player={this.state.player} />
      </div>
    )
  }
}

export default StateContainer