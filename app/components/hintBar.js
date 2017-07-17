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
      this.emitter('gameStartDisplayed', 1000)
    })
    EE.on('gameStartDisplayed', () => {
      this.setState({content: `你的角色是${this.props.player.role}`})
      this.emitter('roundStart', 1000)
    })
    EE.on('roundStart', () => {
      this.setState({content: `第${this.state.round}夜`})
      this.setState({subContent: '天黑请闭眼'})
      this.emitter('wolfWillChooseVictim', 1000)
    })
    EE.on('wolfWillChooseVictim', () => {
      this.setState({content: `狼人请睁眼，并选择要杀的对象`})
      this.setState({subContent: ''})
      if (this.props.player.role === 'wolfman') {
        this.emitter('wolfChooseVictim', 1000)
      }
    })
    EE.on('wolfChooseVictim', () => {
      this.setState({display: false})
    })
    EE.on('victimChooseInconsistent', () => {
      if (this.props.player.role === 'wolfman') {
        this.setState({display: true})
        this.setState({content: `狼人请达成一致`})
        this.emitter('wolfChooseVictim', 1000)
      }
    })
    EE.on('victimChosed', () => {
      this.setState({display: true})
      this.setState({content: `狼人请闭眼`})
      this.emitter('prophetWillChooseSuspects', 1000)
    })
    EE.on('prophetWillChooseSuspects', () => {
      this.setState({content: `预言家请睁眼，并选择要验证的对象`})
      this.emitter('prophetChooseSuspects', 1000)
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
