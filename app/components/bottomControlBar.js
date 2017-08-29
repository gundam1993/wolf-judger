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
    let readyButton, inputBox, audioButton, sendButton, toggleIcon
    if (!this.props.ready) {
      readyButton = <div id="readyButton" onClick={this.props.onReadyClick}>准 备</div>
    }
    if (this.props.inputType === 'text') {
      toggleIcon = <i className="iconfont icon-yuyin"></i>
      inputBox = <input id="inputBox" />
      sendButton = <div className="roundButton" id="sendButton"><i className="iconfont icon-send"></i></div>
    } else {
      toggleIcon = <i className="iconfont icon-duanluo"></i>
      audioButton = <div id="audioButton">
                      <i className="iconfont icon-yuyin"></i>按住说话
                    </div>
    }
    return (
      <div id="bottomControlBar">
        {readyButton}
        <div className="roundButton" id="inputTypeToggleButton" onClick={this.inputTypeToggle}>
          {toggleIcon}
        </div>
        <div id="inputContainer">
          {inputBox}
          {audioButton}
        </div>
        {sendButton}
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
