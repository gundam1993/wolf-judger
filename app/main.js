var gameBoardStyle = require('./gameboard.css')
var controllerStyle = require('./controller.css')
var io = require('socket.io-client') 
import EE from './lib/eventEmitter'
import SocketEventListener from './lib/SocketEventListener'
// let startButtom  = document.getElementById('submit-username')
// let usernameInputer = document.getElementById('username')

// startButtom.addEventListener('click', (ev) => {
//   console.log(usernameInputer.value)
//   newGame = new Game(socket, usernameInputer.value)
// })

import React from 'react';
import ReactDOM from 'react-dom'
import Join from './components/join'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      socket: io('http://localhost:3000'),
      socketEventListener: {}
    }
  }
  componentWillMount () {
    this.setState({socketEventListener: new SocketEventListener(this.state.socket)})
  }
  render() {
    return (
      <div>
        <Join socket={this.state.socket}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));