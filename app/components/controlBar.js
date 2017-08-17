let style = require('../controller.css')

import React from 'react';

class ControlBar extends React.Component {
  render() {
    if (this.props.ready) {
      return (<div></div>)
    }
    return (
      <div id="controller">
        <button id="ready" onClick={this.props.onReadyClick}>准备</button>
        <button id="leave-button" onClick={this.props.onLeaveClick}>退出房间</button>
      </div>
    )
  }
}

ControlBar.propTypes = {
  ready: React.PropTypes.bool.isRequired,
  onReadyClick: React.PropTypes.func.isRequired,
  onLeaveClick: React.PropTypes.func.isRequired,
}

ControlBar.defaultProps = {
  ready: true,
}

export default ControlBar
