let topControlBarStyle = require('../styles/topControlBar.scss')

import React from 'react'

class TopControlBar extends React.Component {
  render () {
    return (
      <div id="topControlBar">
        <div id="exitRoomButtom">退出</div>
        <div id="roomInfo">
          <p>{this.props.roomName}</p>
          <p>{this.props.playerLimit}人局</p>
        </div>
      </div>
    )
  }
}

export default TopControlBar