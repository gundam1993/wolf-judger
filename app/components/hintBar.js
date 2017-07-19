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
      round: 1,
      buttonDisplay: false,
      hintButtonYes: () => {},
      hintButtonNo: () => {},

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
      this.emitter('prophetWillChooseSuspects', 1000)
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
        this.setState({content: `狼人请达成一致`})
        this.setState({display: true})
        this.emitter('wolfChooseVictim', 1000)
      }
    })
    EE.on('victimChosed', () => {
      this.setState({content: `狼人请闭眼`})
      this.setState({display: true})
      this.emitter('witchWillChooseMedicine', 1000)
    })
    EE.on('prophetWillChooseSuspects', () => {
      this.setState({content: `预言家请睁眼，并选择要验证的对象`})
      this.setState({subContent: ''})
      if (this.props.player.role === 'prophet') {
        this.emitter('prophetChooseSuspects', 1000)
      }
      if (!this.props.roomInfo.roles.prophet) {
        this.emitter('suspectsChosed', 1000)
      }
    })
    EE.on('prophetChooseSuspects', () => {
      this.setState({display: false})
    })
    EE.on('suspectsChosedResult', (res) => {
      this.setState({content: `你选择的人是:${res === 'good' ? '好人' : '坏人'}`})
      this.setState({subContent: `预言家请闭眼`})
      this.setState({display: true})
      this.emitter('wolfWillChooseVictim', 1000)
    })
    EE.on('suspectsChosed', () => {
      this.setState({content: `预言家请闭眼`})
      this.setState({subContent: ''})
      this.setState({display: true})
      this.emitter('wolfWillChooseVictim', 1000)
    })
    EE.on('witchWillChooseMedicine', () => {
      this.setState({content: `女巫请睁眼`})
      if (this.props.player.role === 'witch') {
        this.emitter('witchChooseMedicine', 1000)
      }
    })
    EE.on('witchChooseMedicine', () => {
      if (this.props.roomInfo.abilities.witch.medicine) {
        this.setState({content: `今晚死去的是${this.props.roomInfo.victim[0].username}`})
        this.setState({subContent: '要使用解药吗？'})
        this.setState({buttonDisplay: true})
        this.setState({hintButtonYes: () => {EE.emit('witchUseMedicine')}})
        this.setState({hintButtonNo: () => {EE.emit('witchChoosePoison')}})
      } else {
        this.setState({content: `女巫已经使用过解药了`})
        this.emitter('witchChoosePoison', 1000)
      }
    })
    EE.on('witchUseMedicine', () => {
      EE.emit('witchChoosePoison')
    })
    EE.on('witchChoosePoison', () => {
      if (this.props.roomInfo.abilities.witch.poison) {
        this.setState({content: `要使用毒药吗？`})
        this.setState({subContent: ''})
        this.setState({buttonDisplay: true})
        this.setState({hintButtonYes: () => {EE.emit('witchWillUsePoison')}})
        this.setState({hintButtonNo: () => {EE.emit('poisonChoose', {})}})
      } else {
        this.setState({content: `女巫已经使用过毒药了`})
        this.setState({hintButtonNo: () => {EE.emit('poisonChoose', {})}})
        // this.emitter('nightEnd', 1000)
      }
    })
    EE.on('witchWillUsePoison', () => {
      this.setState({content: `请选择要毒死的目标`})
      this.setState({buttonDisplay: false})
      this.emitter('witchUsePoison', 1000)
    })
    EE.on('witchUsePoison', () => {
      this.setState({display: false})
    })
  }
  emitter = (name, time) => {
    setTimeout(() => {
        EE.emit(name)
      }, time)
  }
  render() {
    let hint = this.state.display ? <div id="hint"><p>{this.state.content}</p><p>{this.state.subContent}</p></div> : ''
    let buttons = this.state.buttonDisplay ? <div id='hintButton'><button id="hintButtonYes" onClick={this.state.hintButtonYes}>是</button><button id="hintButtonNo" onClick={this.state.hintButtonNo}>否</button></div> : ''
    return (
      <div>
        {hint}
        {buttons}
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
