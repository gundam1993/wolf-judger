let style = require('../styles/bottomControlBar.scss')

import React from 'react';

class BottomControlBar extends React.Component {
  render() {
    let readyButton, inputBox, audioButton, toggleIcon
    if (!this.props.ready) {
      readyButton = <div id="readyButton" onClick={this.props.onReadyClick}>准 备</div>
    }
    if (this.props.inputType === 'text') {
      toggleIcon = <i className="iconfont icon-yuyin"></i>
    } else {
      toggleIcon = <i className="iconfont icon-duanluo"></i>
    }
    return (
      <div id="bottomControlBar">
        {readyButton}
        <div id="inputTypeToggleButton">
          {toggleIcon}
        </div>
      </div>
    )
  }
}

BottomControlBar.propTypes = {
  ready: React.PropTypes.bool.isRequired,
  inputType: React.PropTypes.string.isRequired,
  onReadyClick: React.PropTypes.func.isRequired,
  onLeaveClick: React.PropTypes.func.isRequired,
}

BottomControlBar.defaultProps = {
  ready: true,
  inputType: 'text',
}

export default BottomControlBar
