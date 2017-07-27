import React from 'react';
import ReactDOM from 'react-dom'
import EE from '../lib/eventEmitter'

class PlayerBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playerBlockClick: () => {}
    }
  }
  componentWillMount () {
    let seerChoosePlayer = () => {
      console.log(this.props.player)
      EE.emit('seerChosedPlayer', this.props.player)
      EE.emit('chooseEnd')
    }
    let robberChoosePlayer = () => {
      console.log(this.props.player)
      EE.emit('robberChosedPlayer', this.props.player)
      EE.emit('chooseEnd')
    }
    EE.on('seerChoosePlayer', () => {
      this.setState({playerBlockClick: seerChoosePlayer})
    })
    EE.on('robberChoosePlayer', () => {
      this.setState({playerBlockClick: robberChoosePlayer})
    })
    EE.on('chooseEnd', () => {
      this.setState({playerBlockClick: () => {}})
    })
  }
  render() {
    return (
      <div className="playerBlock" onClick={this.state.playerBlockClick}>
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
