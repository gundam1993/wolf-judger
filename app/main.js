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

startButtom.addEventListener('click', (ev) => {
  console.log(usernameInputer.value)
  newGame = new Game(socket, usernameInputer.value)
})