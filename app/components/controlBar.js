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
  ready = () => {
    console.log(this.props)
    EE.emit('ready')
  }
  render() {
    if (this.props.ready) {
      return (<div></div>)
    }
    return (
      <div id="controller">
        <button id="ready" onClick={this.props.onReadyClick}>准备</button>
        <button id="leave-button" onClick={this.leave}>退出房间</button>
      </div>
    )
  }
}

ControlBar.propTypes = {
  ready: React.PropTypes.bool.isRequired,
  onReadyClick: React.PropTypes.func.isRequired,
}

ControlBar.defaultProps = {
  player: {},
  stage: ''
}

export default ControlBar
