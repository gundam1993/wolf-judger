let style = require('../controller.css')

import React from 'react';
import ReactDOM from 'react-dom'
import EE from '../lib/eventEmitter'

class ControlBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  leave = () => {
    EE.emit('leaveRoom')
  }
  render() {
    return (
      <div id="controller">
        <button id="leave-button" onClick={this.leave}>退出房间</button>
        <button id="ready">准备</button>
      </div>
    )
  }
}

ControlBar.defaultProps = {
  player: {}
}

export default ControlBar
