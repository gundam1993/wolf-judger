let style = require('../hint.css')

import React from 'react';
import ReactDOM from 'react-dom'
import EE from '../lib/eventEmitter'

class HintBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '游戏开始',
      display: false,
      timmer: {}
    }
  }
  componentWillMount() {
    EE.on('gameStart', (res) => {
      this.setState({display: true})
      this.gameStart()
    })
  }
  gameStart = () => {
    return setTimeout(() => {
      this.setState({content: `你的角色是${this.props.player.role}`})
      setTimeout(() => {
        this.setState({display: false})
      },3000)
    }, 3000)
  }
  render() {
    let hint = this.state.display ? <div id="hint">{this.state.content}</div> : ""
    return (
      <div>
        {hint}
      </div>
    )
  }
}

HintBar.propTypes = {
  roomInfo: React.PropTypes.object,
  player: React.PropTypes.object,
  stage: React.PropTypes.string
}

HintBar.defaultProps = {
  roomInfo: {},
  player: {},
  stage: ''
}

export default HintBar
