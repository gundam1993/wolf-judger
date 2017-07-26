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
    // let victimChoose = () => {
    //   console.log(this.props.player)
    //   EE.emit('victimChoose', this.props.player)
    //   EE.emit('chooseEnd')
    // }
    // let suspectsChoose = () => {
    //   console.log(this.props.player)
    //   EE.emit('suspectsChoose', this.props.player)
    //   EE.emit('chooseEnd')
    // }
    // let poisonChoose = () => {
    //   console.log(this.props.player)
    //   EE.emit('poisonChoose', this.props.player)
    //   EE.emit('chooseEnd')
    // }
    let seerChoosePlayer = () => {
      console.log(this.props.player)
      EE.emit('seerChosedPlayer', this.props.player)
      EE.emit('chooseEnd')
    }
    EE.on('seerChoosePlayer', () => {
      this.setState({playerBlockClick: seerChoosePlayer})
    })
    // EE.on('wolfChooseVictim', () => {
    //   this.setState({playerBlockClick: victimChoose})
    // })
    EE.on('chooseEnd', () => {
      this.setState({playerBlockClick: () => {}})
    })
    // EE.on('prophetChooseSuspects', () => {
    //   this.setState({playerBlockClick: suspectsChoose})
    // })
    // EE.on('witchUsePoison', () => {
    //   this.setState({playerBlockClick: poisonChoose})
    // })
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
