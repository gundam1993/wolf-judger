let style = require('../styles/bottomControlBar.scss')

import React from 'react';

class BottomControlBar extends React.Component {
  inputTypeToggle = () => {
    if (this.props.inputType === 'text') {
      this.props.changeInputTypeToAudio()
      return
    }
    this.props.changeInputTypeToText()
  }
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
        <div id="inputTypeToggleButton" onClick={this.inputTypeToggle}>
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
  changeInputTypeToAudio: React.PropTypes.func.isRequired,
  changeInputTypeToText: React.PropTypes.func.isRequired,
}

BottomControlBar.defaultProps = {
  ready: true,
  inputType: 'text',
}

export default BottomControlBar
