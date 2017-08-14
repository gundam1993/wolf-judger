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
      this.setState({display: true})
      this.setState({content: `${role}请闭眼`})
      EE.delayEmitter('nextGamePhase', 1000)
    })
    EE.on('doppelgangerStart', () => {
      if (this.props.player.role === 'doppelganger') {
        this.setState({content: '请化身幽灵选择一个玩家查看身份'})
        EE.delayEmitter('doppelgangerChoosePlayer', 1000)
      }
    })
    EE.on('doppelgangerChoosePlayer', () => {
      this.setState({display: false})
    })
    EE.on('doppelgangerChangeRoleResult', (res) => {
      this.setState({content: `化身幽灵选择的身份是${res.role}`})
      this.setState({display: true})
      if (['villager', 'tanner', 'hunter', 'wereWolf', 'mason'].includes(res.role)) {
        EE.delayEmitter('doppelgangerNoFutherMove', 1000)
      } else if (res.role === 'seer') {
        
      }
    })
    EE.on('wereWolfStart', () => {
      if (this.props.player.role === 'wereWolf') {
        EE.emit('wereWolfGetOtherWereWolf')
      }
    })
    EE.on('wereWolfGetOtherWereWolfResult', (res) => {
      if (res.wereWolf.username) {
        this.setState({content: `目前身份是狼人的有：您和${res.wereWolf.username}`})
        EE.delayEmitter(`wereWolfGotResult`, 1000)
      } else {
        this.setState({content: `除您以外目前场上没有狼人，请选择您要查看的遗弃身份`})
        EE.delayEmitter(`wereWolfChooseDrop`, 1000)
      }
    })
    EE.on('wereWolfChosedDropResult', (res) => {
      this.setState({content: `您选择的遗弃的身份是${res.role}`})
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
    EE.on('troubleMakerStart', () => {
      if (this.props.player.role === 'troubleMaker') {
        this.setState({content: '请捣蛋鬼选择是否要交换身份'})
        this.setState({hintButtonYesContent: '是'})
        this.setState({hintButtonNoContent: '否'})
        this.setState({hintButtonYes: () => {
          EE.emit('troubleMakerChoosePlayers')
          this.setState({display: false})
          this.setState({buttonDisplay: false})
          this.setState({hintButtonYes: () => {}})
        }})
        this.setState({hintButtonNo: () => {
          EE.emit('troubleMakerNotExchange')
          this.setState({buttonDisplay: false})
          this.setState({hintButtonNo: () => {}})
        }})
        this.setState({buttonDisplay: true})
      }
    })
    EE.on('drunkStart', () => {
      if (this.props.player.role === 'drunk') {
        this.setState({content: '请选择要交换的身份'})
        EE.delayEmitter(`drunkChooseDrop`, 1000)
      }
    })
    EE.on('insomniacStart', () => {
      if (this.props.player.role === 'insomniac') {
        EE.emit('insomniacGetLastRole')
      }
    })
    EE.on('insomniacLastRoleResult', (res) => {
      this.setState({content: `失眠者最后的身份是${res.role}`})
      EE.delayEmitter(`PhaseEnd`, 1000, '失眠者')
    })
    EE.on('minionStart', () => {
      if (this.props.player.role === 'minion') {
        EE.emit('minionGetWerewolf')
      }
    })
    EE.on('minionGetWerewolfResult', (res) => {
      if (res.wolf.length === 0) {
        this.setState({content: `场上目前没有狼人`})
      } else {
        let names = []
        res.wolf.forEach((player) => {names.push(player.username)})
        let result = names.join('和')
        this.setState({content: `目前身份是狼人的有：${result}`})
      }
      EE.delayEmitter(`PhaseEnd`, 1000, '爪牙')
    })
    EE.on('masonStart', () => {
      if (this.props.player.role === 'mason') {
        EE.emit('masonGetOtherMason')
      }
    })
    EE.on('masonGetOtherMasonResult', (res) => {
      if (res.mason.username) {
        this.setState({content: `目前身份是守卫的有：您和${res.mason.username}`})
      } else {
        this.setState({content: `除您以外目前场上没有守卫`})
      }
      EE.delayEmitter(`masonGotResult`, 1000)
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
}

HintBar.defaultProps = {
  roomInfo: {},
  player: {},
  stage: '',
}

export default HintBar
