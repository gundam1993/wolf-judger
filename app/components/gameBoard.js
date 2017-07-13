let style = require('../gameboard.css')

import React from 'react';
import ReactDOM from 'react-dom'
import EE from '../lib/eventEmitter'
import PlayerBlock from './playerBlock'

class GameBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    let playerBlocks = []
    let num = this.props.roomInfo.playerLimit || 0
    let playersInfo = this.props.roomInfo.players || []
    let players = Object.values(playersInfo)
    for (let i = 0; i < num; i++) {
      playerBlocks.push(
        <PlayerBlock player={players[i]}/>
      )
    }
    return (
      <div id="gameBoard">
        {playerBlocks}
      </div>
    )
  }
}

GameBoard.propTypes = {
  roomInfo: React.PropTypes.object,
  socket: React.PropTypes.object,
}

GameBoard.defaultProps = {
  roomInfo: {},
  socket: {},
}

export default GameBoard
