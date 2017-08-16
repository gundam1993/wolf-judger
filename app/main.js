var controllerStyle = require('./controller.css')

import React from 'react';
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider }from 'react-redux'
import gameApp from './reducers'
import StateContainer from './components/stateContainer'
import io from 'socket.io-client' 
import createSocketMiddleware from './middleware/socketMiddleware'

var socket = io("http://localhost:3000")
var socketMiddleware = createSocketMiddleware(socket)
let store = createStore(gameApp, applyMiddleware(socketMiddleware))

render(
  <Provider store={store}>
    <StateContainer />
  </Provider>, 
  document.getElementById('app')
)