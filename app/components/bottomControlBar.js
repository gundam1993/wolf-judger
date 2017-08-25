let style = require('../styles/bottomControlBar.scss')

import React from 'react';

class BottomControlBar extends React.Component {
  render() {
    if (this.props.ready) {
      return (<div></div>)
    }
    return (
      <div id="bottomControlBar">
        <button id="ready" onClick={this.props.onReadyClick}>准备</button>
      </div>
    )
  }
}

BottomControlBar.propTypes = {
  ready: React.PropTypes.bool.isRequired,
  onReadyClick: React.PropTypes.func.isRequired,
  onLeaveClick: React.PropTypes.func.isRequired,
}

BottomControlBar.defaultProps = {
  ready: true,
}

export default BottomControlBar
