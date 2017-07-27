import React from 'react';
import ReactDOM from 'react-dom'
import EE from '../lib/eventEmitter'

class PlayerBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playerBlockClick: () => {},
      chosed: false
    }
  }
  componentWillMount () {
    let seerChoosePlayer = () => {
      EE.emit('seerChosedPlayer', this.props.player)
      EE.emit('chooseEnd')
    }
    let robberChoosePlayer = () => {
      EE.emit('robberChosedPlayer', this.props.player)
      EE.emit('chooseEnd')
    }
    let troubleMakerChoosePlayers = () => {
      if (this.state.chosed) {
        this.setState({chosed: false})
        EE.emit('troubleMakerDropingPlayer', this.props.player)
      } else {
        this.setState({chosed: true})
        EE.emit('troubleMakerChosingPlayer', this.props.player)
      }
    }
    EE.on('seerChoosePlayer', () => {
      this.setState({playerBlockClick: seerChoosePlayer})
    })
    EE.on('robberChoosePlayer', () => {
      this.setState({playerBlockClick: robberChoosePlayer})
    })
    EE.on('troubleMakerChoosePlayers', () => {
      this.setState({playerBlockClick: troubleMakerChoosePlayers})
    })
    EE.on('chooseEnd', () => {
      this.setState({playerBlockClick: () => {}})
      this.setState({chosed: false})
    })
    EE.on('playerBlockChooseFail', () => {
      this.setState({chosed: false})
    })
  }
  render() {
    let className = 'playerBlock'
    if (this.state.checked) {
      className += ' checked'
    }
    return (
      <div className={className} onClick={this.state.playerBlockClick}>
        <div className="playerAvatar"></div>
        {this.props.player.username}
      </div>
    )
  }
}

PlayerBlock.defaultProps = {
  player: {},
  click: {}
}

export default PlayerBlock
