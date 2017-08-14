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