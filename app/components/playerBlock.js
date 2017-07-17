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
    let victimChoose = () => {
      console.log(this.props.player)
      EE.emit('victimChoose', this.props.player)
    }
    EE.on('wolfChooseVictim', () => {
      this.setState({playerBlockClick: victimChoose})
    })
    EE.on('victimChoose', () => {
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
