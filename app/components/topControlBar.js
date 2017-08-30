let topControlBarStyle = require('../styles/topControlBar.scss')

import React from 'react'

class TopControlBar extends React.Component {
  render () {
    return (
      <div id="topControlBar">
        <div id="exitRoomButtom" onClick={this.props.onLeaveClick}>
          <i className="iconfont icon-fanhui"></i>
        </div>
        <div id="roomInfo">
          <p>{this.props.roomName}</p>
          <p>{this.props.playerLimit}人局</p>
        </div>
      </div>
    )
  }
}

export default TopControlBar