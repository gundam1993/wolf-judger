var controllerStyle = require('./controller.css')

import React from 'react';
import ReactDOM from 'react-dom'
import StateContainer from './components/stateContainer'

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