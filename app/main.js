var controllerStyle = require('./controller.css')
var io = require('socket.io-client') 
import EE from './lib/eventEmitter'
import SocketEventListener from './lib/SocketEventListener'

import React from 'react';
import ReactDOM from 'react-dom'
import StateContainer from './components/stateContainer'
import CountDown from './components/CountDown'
import DropCardChoose from './components/DropCardChoose'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
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