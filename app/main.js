var controllerStyle = require('./controller.css')

import React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider }from 'react-redux'
import gameApp from './reducers'
import StateContainer from './components/stateContainer'

let store = createStore(gameApp)

render(
  <Provider store={store}>
    <StateContainer />
  </Provider>, 
  document.getElementById('app')
)