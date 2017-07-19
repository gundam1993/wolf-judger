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
    let readyButton = this.props.stage === "prepare" ? <button id="ready" onClick={this.ready}>准备</button> : ""
    let leaveButton = this.props.stage === "prepare" ? <button id="leave-button" onClick={this.leave}>退出房间</button> : ""
    return (
      <div id="controller">
        {leaveButton}
        {readyButton}
      </div>
    )
  }
}

ControlBar.propTypes = {
  player: React.PropTypes.object,
  stage: React.PropTypes.string
}

ControlBar.defaultProps = {
  player: {},
  stage: ''
}

export default ControlBar
