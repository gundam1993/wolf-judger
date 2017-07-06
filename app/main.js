var style = require('./main.css')
// var Game = require('./Game')
import { Game } from './Game'

let startButtom  = document.getElementById('submit-username')
let usernameInputer = document.getElementById('username')
let usernameBlock = document.getElementById('username-block')
var newGame

startButtom.addEventListener('click', (ev) => {
  console.log(usernameInputer.value)
  newGame = new Game(usernameInputer.value)
})