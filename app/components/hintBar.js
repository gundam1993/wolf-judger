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
    EE.on('PhaseEnd', (role) => {
      this.setState({content: `${role}请闭眼`})
      EE.delayEmitter('nextGamePhase', 1000)
    })
    EE.on('wereWolfStart', () => {
      this.setState({content: '请狼人确认自己的同伴'})
      EE.delayEmitter(`PhaseEnd`, 1000, '狼人')
    })
    EE.on('seerStart', () => {
      this.setState({content: '请预言家选择要查看的对象'})
      if (this.props.player.role === 'seer') {
        this.setState({hintButtonYesContent: '查看一名玩家'})
        this.setState({hintButtonNoContent: '查看两张牌堆中的遗弃身份'})
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
    // EE.on('seerStart', () => {
    //   this.setState({content: '请预言家选择要验证的对象'})
    // })

    // EE.on('wolfWillChooseVictim', () => {
    //   this.setState({content: `狼人请睁眼，并选择要杀的对象`})
    //   this.setState({subContent: ''})
    //   if (this.props.player.role === 'wolfman') {
    //     this.emitter('wolfChooseVictim', 1000)
    //   }
    // })
    // EE.on('wolfChooseVictim', () => {
    //   this.setState({display: false})
    // })
    // EE.on('victimChooseInconsistent', () => {
    //   if (this.props.player.role === 'wolfman') {
    //     this.setState({content: `狼人请达成一致`})
    //     this.setState({display: true})
    //     this.emitter('wolfChooseVictim', 1000)
    //   }
    // })
    // EE.on('victimChosed', () => {
    //   this.setState({content: `狼人请闭眼`})
    //   this.setState({display: true})
    //   this.emitter('witchWillChooseMedicine', 1000)
    // })
    // EE.on('prophetWillChooseSuspects', () => {
    //   this.setState({content: `预言家请睁眼，并选择要验证的对象`})
    //   this.setState({subContent: ''})
    //   if (this.props.player.role === 'prophet') {
    //     this.emitter('prophetChooseSuspects', 1000)
    //   }
    //   if (!this.props.roomInfo.roles.prophet) {
    //     this.emitter('suspectsChosed', 1000)
    //   }
    // })
    // EE.on('prophetChooseSuspects', () => {
    //   this.setState({display: false})
    // })
    // EE.on('suspectsChosedResult', (res) => {
    //   this.setState({content: `你选择的人是:${res === 'good' ? '好人' : '坏人'}`})
    //   this.setState({subContent: `预言家请闭眼`})
    //   this.setState({display: true})
    //   this.emitter('wolfWillChooseVictim', 1000)
    // })
    // EE.on('suspectsChosed', () => {
    //   this.setState({content: `预言家请闭眼`})
    //   this.setState({subContent: ''})
    //   this.setState({display: true})
    //   this.emitter('wolfWillChooseVictim', 1000)
    // })
    // EE.on('witchWillChooseMedicine', () => {
    //   this.setState({content: `女巫请睁眼`})
    //   if (this.props.player.role === 'witch') {
    //     this.emitter('witchChooseMedicine', 1000)
    //   }
    // })
    // EE.on('witchChooseMedicine', () => {
    //   if (this.props.roomInfo.abilities.witch.medicine) {
    //     this.setState({content: `今晚死去的是${this.props.roomInfo.victim[0].username}`})
    //     this.setState({subContent: '要使用解药吗？'})
    //     this.setState({buttonDisplay: true})
    //     this.setState({hintButtonYes: () => {EE.emit('witchUseMedicine')}})
    //     this.setState({hintButtonNo: () => {
    //       EE.emit('witchChoosePoison')
    //     }})
    //   } else {
    //     this.setState({content: `女巫已经使用过解药了`})
    //     this.emitter('witchChoosePoison', 1000)
    //   }
    // })
    // EE.on('witchUseMedicine', () => {
    //   EE.emit('witchChoosePoison')
    // })
    // EE.on('witchChoosePoison', () => {
    //   if (this.props.roomInfo.abilities.witch.poison) {
    //     this.setState({content: `要使用毒药吗？`})
    //     this.setState({subContent: ''})
    //     this.setState({buttonDisplay: true})
    //     this.setState({hintButtonYes: () => {EE.emit('witchWillUsePoison')}})
    //     this.setState({hintButtonNo: () => {EE.emit('poisonChoose', {})}})
    //   } else {
    //     this.setState({content: `女巫已经使用过毒药了`})
    //     this.setState({hintButtonNo: () => {EE.emit('poisonChoose', {})}})
    //   }
    // })
    // EE.on('witchWillUsePoison', () => {
    //   this.setState({content: `请选择要毒死的目标`})
    //   this.setState({buttonDisplay: false})
    //   this.emitter('witchUsePoison', 1000)
    // })
    // EE.on('witchUsePoison', () => {
    //   this.setState({display: false})
    //   this.setState({buttonDisplay: false})
    // })
    // EE.on('nightResult', () => {
    //   this.setState({display: true})
    //   this.setState({content: `天亮了...`})
    //   this.setState({buttonDisplay: false})
    //   this.emitter('showVictim', 1000)
    // })
    // EE.on('showVictim', () => {
    //   this.setState({display: true})
    //   if (this.props.victim.length === 0) {
    //     this.setState({content: `今晚是平安夜`})
    //   } else {
    //     let victimsName = []
    //     this.props.victim.forEach((vic) => {victimsName.push(vic.username)})
    //     let nameList = victimsName.join('和')
    //     this.setState({content: `今晚死去的是${nameList}`})
    //     if (this.state.round === 1) { 
    //       this.emitter('victimLastWord', 1000)
    //     } else {
    //       this.emitter('discussProcessStart', 1000)
    //     }
    //   }
    // })
    // EE.on('victimLastWord', () => {
    //   let killedVictim = this.props.victim.filter((vic) => {return !vic.poisoned})[0]
    //   if (killedVictim) {
    //     this.setState({content: `请${killedVictim.username}发表遗言`})
    //     if (killedVictim.id === this.props.player.id) {
    //       EE.emit('sayMyWord')
    //     } else {
    //       EE.emit('discussProcessStart')
    //     }
    //   }
    // })
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
