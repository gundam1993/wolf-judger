let style = require('../gameboard.css')

import React from 'react';
import ReactDOM from 'react-dom'
import EE from '../lib/eventEmitter'
import PlayerBlock from './playerBlock'

class GameBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chooseList: []
    }
  }
  componentWillMount () {
    EE.on('troubleMakerChosingPlayer', (res) => {
      if (res.id === this.props.player.id) {
        console.log('请勿选择自己')
        this.setState({chooseList: []})
        EE.emit('playerBlockChooseFail')
        return
      }
      let choose = [].concat(this.state.chooseList)
      choose.push(res.id)
      this.setState({chooseList: choose})
      if (choose.length === 2) {
        EE.emit('troubleMakerChosedPlayer', {players: choose})
        this.setState({chooseList: []})
      }
    })
    EE.on('troubleMakerDropingPlayer', (res) => {
      let choose = [].concat(this.state.chooseList)
      let index = choose.indexOf(res.id)
      if (index !== -1) {
        choose.splice(index,1)
        this.setState({chooseList: choose})
      }
    })
    EE.on('doppelgangerChosingPlayer', (res) => {
      console.log(res)
      if (res.id === this.props.player.id) {
        console.log('请勿选择自己')
        EE.emit('doppelgangerChoosePlayer')
        return
      }
      EE.emit('doppelgangerChosedPlayer', {player: res})
      EE.emit('chooseEnd')
    })
  }
  render() {
    let playerBlocks = []
    let num = this.props.playerLimit || 0
    let playersInfo = this.props.players || []
    let players = Object.values(playersInfo)
    for (let i = 0; i < num; i++) {
      playerBlocks.push(
        <PlayerBlock player={players[i]} />
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
  playerLimit: React.PropTypes.number.isRequired,
  players: React.PropTypes.object.isRequired,
}

GameBoard.defaultProps = {
  playerLimit: 0,
  players: {},
}

export default GameBoard
