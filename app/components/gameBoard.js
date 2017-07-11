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
    // let players = this.props.roomInfo.players || new Array(8)
    let players = []
    let num = this.props.roomInfo.playerLimit || 0
    for (let i = 0; i < num; i++) {
      players.push(
        <PlayerBlock />
      )
    }
    console.log(this.props.roomInfo)
    return (
      <div id="gameBoard">
        {players}
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
