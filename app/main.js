var style = require('./main.css')
var gameBoardStyle = require('./gameboard.css')
var controllerStyle = require('./controller.css')

var io = require('socket.io-client') 
import Game from './Game'
import UiUploader from './ui'
const socket = io('http://localhost:3000')
let startButtom  = document.getElementById('submit-username')
let usernameInputer = document.getElementById('username')
var newGame

// startButtom.addEventListener('click', (ev) => {
//   console.log(usernameInputer.value)
//   newGame = new Game(socket, usernameInputer.value)
// })


import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <h1>Hello, World!</h1>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));