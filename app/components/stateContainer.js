var io = require('socket.io-client') 
import EE from '../lib/eventEmitter'
import SocketEventListener from '../lib/SocketEventListener'

import React from 'react';
import ReactDOM from 'react-dom'

import Join from './join'

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
  }
  render() {
    return (
      <div>
        <Join display={this.state.join.display} socket={this.socket} />
      </div>
    )
  }
}

export default StateContainer