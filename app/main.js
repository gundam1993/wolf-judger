var style = require('./main.css')
var io = require('socket.io-client') 
import Game from './Game'
const socket = io('http://localhost:3000')
let startButtom  = document.getElementById('submit-username')
let usernameInputer = document.getElementById('username')
let usernameBlock = document.getElementById('username-block')
var newGame

startButtom.addEventListener('click', (ev) => {
  console.log(usernameInputer.value)
  newGame = new Game(socket, usernameInputer.value)
})