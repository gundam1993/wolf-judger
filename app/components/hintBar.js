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
      buttonDisplay: false,
      hintButtonYesContent: '',
      hintButtonNoContent: '',
      hintButtonYes: () => {},
      hintButtonNo: () => {},
    }
  }
  componentWillMount() {
    EE.on('gameStart', (res) => {
      this.setState({display: true})
      EE.delayEmitter('gameStartDisplayed', 1000)
    })
    EE.on('gameStartDisplayed', () => {
      this.setState({content: `你的角色是${this.props.player.role}`})
      EE.delayEmitter('closeEye', 1000)
    })
    EE.on('closeEye', () => {
      this.setState({content: '天黑请闭眼'})
      EE.delayEmitter('nextGamePhase', 1000)
    })
    EE.on('newGamePhase', (res) => {
      this.setState({content: `${res.phase}请睁眼`})
      EE.delayEmitter(`${res.phase}Start`, 1000)
    })
    EE.on('jumpPhase', (res) => {
      this.setState({content: `${res.phase}请睁眼`})
      EE.delayEmitter('PhaseEnd', 5000, res.phase)
    })
    EE.on('PhaseEnd', (role) => {
      this.setState({content: `${role}请闭眼`})
      EE.delayEmitter('nextGamePhase', 1000)
    })
    EE.on('wereWolfStart', () => {
      this.setState({content: '请狼人确认自己的同伴'})
      EE.delayEmitter(`PhaseEnd`, 1000, '狼人')
    })
    EE.on('seerStart', () => {
      if (this.props.player.role === 'seer') {
        this.setState({content: '请预言家选择要查看的对象'})
        this.setState({hintButtonYesContent: '查看一名玩家'})
        this.setState({hintButtonNoContent: '查看两张牌堆中的遗弃身份'})
        this.setState({hintButtonYes: () => {
          EE.emit('seerChoosePlayer')
          this.setState({display: false})
          this.setState({buttonDisplay: false})
          this.setState({hintButtonYes: () => {}})
        }})
        this.setState({hintButtonNo: () => {
          EE.emit('seerChooseDrop')
          this.setState({display: false})
          this.setState({buttonDisplay: false})
          this.setState({hintButtonNo: () => {}})
        }})
        this.setState({buttonDisplay: true})
      }
    })
    EE.on('SeerChoosePlayerResult', (res) => {
      this.setState({content: `你所选择的玩家是${res.role}`})
      this.setState({display: true})
      EE.delayEmitter(`PhaseEnd`, 1000, '预言家')
    })
    EE.on('SeerChooseDropResult', (res) => {
      this.setState({content: `你所选择的遗弃身份是${res.roles[0]}和${res.roles[1]}`})
      this.setState({display: true})
      EE.delayEmitter(`PhaseEnd`, 1000, '预言家')
    })
    EE.on('robberStart', () => {
      if (this.props.player.role === 'robber') {
        this.setState({content: '请强盗选择是否要交换身份'})
        this.setState({hintButtonYesContent: '是'})
        this.setState({hintButtonNoContent: '否'})
        this.setState({hintButtonYes: () => {
          EE.emit('robberChoosePlayer')
          this.setState({display: false})
          this.setState({buttonDisplay: false})
          this.setState({hintButtonYes: () => {}})
        }})
        this.setState({hintButtonNo: () => {
          EE.emit('robberNotChange')
          this.setState({buttonDisplay: false})
          this.setState({hintButtonNo: () => {}})
        }})
        this.setState({buttonDisplay: true})
      }
    })
    EE.on('robberChangeRoleResult', (res) => {
      this.setState({content: `你现在的身份是${res.role}`})
      this.setState({display: true})
      EE.delayEmitter(`PhaseEnd`, 2000, '强盗')
    })
  }
  render() {
    let hint = ''
    let buttons = ''
    if (this.state.display) {
      hint = <div id="hint">
               <p>{this.state.content}</p>
               <p>{this.state.subContent}</p>
             </div>
    }
    if (this.state.buttonDisplay) {
      buttons = <div id='hintButton'>
                  <button id="hintButtonYes" onClick={this.state.hintButtonYes}>{this.state.hintButtonYesContent}</button>
                  <button id="hintButtonNo" onClick={this.state.hintButtonNo}>{this.state.hintButtonNoContent}</button>
                </div>
    }
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
  stage: React.PropTypes.string,
  victim: React.PropTypes.array
}

HintBar.defaultProps = {
  roomInfo: {},
  player: {},
  stage: '',
  victim: []
}

export default HintBar
