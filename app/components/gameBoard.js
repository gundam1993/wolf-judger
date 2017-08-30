let style = require('../styles/gameBoard.scss')
let playerBlockStyle = require('../styles/playerBlock.scss')

import React from 'react';
import PlayerBlock from './playerBlock'
import HintBar from '../containers/hintBar'

class GameBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chooseList: []
    }
  }
  componentWillMount () {
    // EE.on('troubleMakerChosingPlayer', (res) => {
    //   if (res.id === this.props.player.id) {
    //     console.log('请勿选择自己')
    //     this.setState({chooseList: []})
    //     EE.emit('playerBlockChooseFail')
    //     return
    //   }
    //   let choose = [].concat(this.state.chooseList)
    //   choose.push(res.id)
    //   this.setState({chooseList: choose})
    //   if (choose.length === 2) {
    //     EE.emit('troubleMakerChosedPlayer', {players: choose})
    //     this.setState({chooseList: []})
    //   }
    // })
    // EE.on('troubleMakerDropingPlayer', (res) => {
    //   let choose = [].concat(this.state.chooseList)
    //   let index = choose.indexOf(res.id)
    //   if (index !== -1) {
    //     choose.splice(index,1)
    //     this.setState({chooseList: choose})
    //   }
    // })
    // EE.on('doppelgangerChosingPlayer', (res) => {
    //   console.log(res)
    //   if (res.id === this.props.player.id) {
    //     console.log('请勿选择自己')
    //     EE.emit('doppelgangerChoosePlayer')
    //     return
    //   }
    //   EE.emit('doppelgangerChosedPlayer', {player: res})
    //   EE.emit('chooseEnd')
    // })
  }
  render() {
    let leftPlayers = []
    let rightPlayers = []
    let limit = this.props.playerLimit
    let players = Object.values(this.props.players)
    for (let i = 0; i < 10; i++) {
      let playerBlock = <PlayerBlock locked={(i + 1 < limit)} player={players[i]} index={i + 1}/>
      if (i % 2) {
        rightPlayers.push(playerBlock)
      } else {
        leftPlayers.push(playerBlock)
      }
    }
    
    return (
      <div id="gameBoard">
        <div id="leftPlayers" className="playersList">
          {leftPlayers}
        </div>
        <HintBar />
        <div id="rightPlayers" className="playersList">
          {rightPlayers}
        </div>
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
