var io = require('socket.io-client') 

import React from 'react';
import ReactDOM from 'react-dom'

class StateContainer extends React.Component {
  constructor (props) {
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
  }
}

export default StateContainer