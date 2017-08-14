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
    if (!this.props.display) {
      return (<div></div>)
    }
    let buttons = ''
    if (this.props.btnDisplay) {
      buttons = <div id='hintButton'>
                  <button id="hintButtonYes" onClick={this.props.btnFunc1}>{this.props.btnContent1}</button>
                  <button id="hintButtonNo" onClick={this.props.btnFunc2}>{this.props.btnContent2}</button>
                </div>
    }
    return (
      <div>
        <div id="hint">
          <p>{this.props.content}</p>
          <p>{this.state.subContent}</p>
        </div>
        {buttons}
      </div>
    )
  }
}

HintBar.propTypes = {
  player: React.PropTypes.object,
  content: React.PropTypes.string,
  display: React.PropTypes.boolean,
  btnDisplay: React.PropTypes.boolean,
  btnContent1: React.PropTypes.string,
  btnContent2: React.PropTypes.string,
  btnFunc1: React.PropTypes.object,
  btnFunc2: React.PropTypes.object,
}

HintBar.defaultProps = {
  player: {},
  content: '',
  display: false,
  btnDisplay: false,
  btnContent1: '',
  btnContent2: '',
  btnFunc1: {},
  btnFunc2: {},
}

export default HintBar
