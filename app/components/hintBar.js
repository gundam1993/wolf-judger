let style = require('../hint.css')

import React from 'react';
import ReactDOM from 'react-dom'
import EE from '../lib/eventEmitter'

class HintBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '游戏开始',
      subContent: '',
      display: false,
      round: 1
    }
  }
  componentWillMount() {
    EE.on('gameStart', (res) => {
      this.setState({display: true})
      this.emitter('gameStartDisplayed', 3000)
    })
    EE.on('gameStartDisplayed', () => {
      this.setState({content: `你的角色是${this.props.player.role}`})
      this.emitter('roleDisplayed', 3000)
    })
    EE.on('roleDisplayed', () => {
      this.setState({content: `第${this.state.round}夜`})
      this.setState({subContent: '天黑请闭眼'})
      this.emitter('roundStart', 5000)
    })
    EE.on('roundStart', () => {
      this.setState({content: `狼人请睁眼，并选择要杀的对象`})
      this.setState({subContent: ''})
      this.emitter('roundStart', 3000)
    })
  }
  emitter = (name, time) => {
    setTimeout(() => {
        EE.emit(name)
      }, time)
  }
  render() {
    let hint = this.state.display ? <div id="hint"><p>{this.state.content}</p><p>{this.state.subContent}</p></div> : ""
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
