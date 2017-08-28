let style = require('../styles/bottomControlBar.scss')

import React from 'react';

class BottomControlBar extends React.Component {
  render() {
    let readyButton
    if (!this.props.ready) {
      readyButton = <div id="readyButton" onClick={this.props.onReadyClick}>准 备</div>
    }
    return (
      <div id="bottomControlBar">
        {readyButton}
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
