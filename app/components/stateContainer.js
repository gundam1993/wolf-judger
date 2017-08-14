var io = require('socket.io-client') 
import EE from '../lib/eventEmitter'
import SocketEventListener from '../lib/SocketEventListener'

import React from 'react';
import ReactDOM from 'react-dom'

import Join from './join'
import GameBoard from './gameBoard'
import ControlBar from './controlBar'
import HintBar from './hintBar'
import DropCardChoose from './DropCardChoose'


class StateContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      socket: io("http://localhost:3000"),
      socketEventListener: {},
      roomInfo: {},
      stage: 'join',
      player: {},
      joinDisplay: true,
      hintBarContent: '',
      hintBarDisplay: false,
      hintBarBtnDisplay: false,
      hintBtnContent1: '',
      hintBtnContent2: '',
      hintBtnFunc1: () => {},
      hintBtnFunc2: () => {},
    }
  }
  componentWillMount () {
    this.setState({socketEventListener: new SocketEventListener(this.state.socket)})
    EE.on('userLogin', (res) => {
      this.state.socket.emit('join', res)
    })
    EE.on('joinSuccess', (res) => {
      this.setState({roomInfo: res.roomInfo})
      this.setState({stage: 'prepare'})
      this.setState({joinDisplay: false})
    })
    EE.on('newJoin', (res) => {
      this.setState({roomInfo: res.roomInfo})
    })
    EE.on('leaveRoom', () => {
      this.state.socket.emit('leave')
      this.setState({roomInfo: {}})
      this.setState({stage: 'join'})
    })
    EE.on('playerLeave', (res) => {
      this.setState({roomInfo: res.roomInfo})
    })
    EE.on('ready', (res) => {
      this.state.socket.emit('ready')
      this.setState({stage: 'ready'})
    })
    EE.on('gameStart', (res) => {
      let id = this.state.socket.id
      this.setState({roomInfo: res.roomInfo})
      this.setState({player: res.roomInfo.players[id]})
      this.setState({hintBarContent: '游戏开始'})
      this.setState({hintBarDisplay: true})
      EE.delayEmitter('gameStartDisplayed', 1000)
    })
    EE.on('gameStartDisplayed', () => {
      this.setState({hintBarContent: `你的角色是${this.state.player.role}`})
      EE.delayEmitter('closeEye', 1000)
    })
    EE.on('closeEye', () => {
      this.setState({hintBarContent: `天黑请闭眼`})
      EE.delayEmitter('nextGamePhase', 1000)
    })
    EE.on('nextGamePhase', (res) => {
      this.state.socket.emit('nextGamePhase')
    })
    EE.on('newGamePhase', (res) => {
      this.setState({roomInfo: res.roomInfo})
      this.setState({hintBarContent: `${res.phase}请睁眼`})
      EE.delayEmitter(`${res.phase}Start`, 1000)
    })
    EE.on('jumpPhase', (res) => {
      this.setState({hintBarContent: `${res.phase}请睁眼`})
      EE.delayEmitter('PhaseEnd', 5000, res.phase)
    })
    EE.on('PhaseEnd', (role) => {
      this.setState({hintBarContent: `${role}请闭眼`})
      EE.delayEmitter('nextGamePhase', 1000)
    })

    EE.on('wereWolfStart', () => {
      if (this.state.player.role === 'wereWolf') {
        this.state.socket.emit('wereWolfGetOtherWereWolf')
      }
    })
    EE.on('wereWolfGetOtherWereWolfResult', (res) => {
      if (res.wereWolf.username) {
        this.setState({hintBarContent: `目前身份是狼人的有：您和${res.wereWolf.username}`})
        EE.delayEmitter(`wereWolfGotResult`, 1000)
      } else {
        this.setState({hintBarContent: `除您以外目前场上没有狼人，请选择您要查看的遗弃身份`})
        EE.delayEmitter(`wereWolfChooseDrop`, 1000)
      }
    })
    EE.on('wereWolfChosedDropResult', (res) => {
      this.setState({hintBarContent: `您选择的遗弃的身份是${res.role}`})
      EE.delayEmitter(`PhaseEnd`, 1000, '狼人')
    })
    EE.on('wereWolfChosedDrop', (res) => {
      this.state.socket.emit('wereWolfChosedDrop', res)
    })
    EE.on('wereWolfGotResult', () => {
      this.state.socket.emit('wereWolfGotResult')
    })


    EE.on('seerStart', () => {
      if (this.state.player.role === 'seer') {
        this.setState({hintBarContent: '请预言家选择要查看的对象'})
        this.setState({hintBtnContent1: '查看一名玩家'})
        this.setState({hintBtnContent2: '查看两张牌堆中的遗弃身份'})
        this.setState({hintBtnFunc1: () => {
          EE.emit('seerChoosePlayer')
          this.setState({hintBarDisplay: false})
          this.setState({hintBarBtnDisplay: false})
          this.setState({hintBtnFunc1: () => {}})
        }})
        this.setState({hintBtnFunc2: () => {
          EE.emit('seerChooseDrop')
          this.setState({hintBarDisplay: false})
          this.setState({hintBarBtnDisplay: false})
          this.setState({hintBtnFunc2: () => {}})
        }})
        this.setState({hintBarBtnDisplay: true})
      }
    })
    EE.on('SeerChoosePlayerResult', (res) => {
      this.setState({hintBarContent: `你所选择的玩家是${res.role}`})
      this.setState({hintBarDisplay: true})
      EE.delayEmitter(`PhaseEnd`, 1000, '预言家')
    })
    EE.on('SeerChooseDropResult', (res) => {
      this.setState({contehintBarContentnt: `你所选择的遗弃身份是${res.roles[0]}和${res.roles[1]}`})
      this.setState({hintBarDisplay: true})
      EE.delayEmitter(`PhaseEnd`, 1000, '预言家')
    })
    EE.on('seerChosedPlayer', (res) => {
      this.state.socket.emit('seerChosedPlayer', res)
    })
    EE.on('seerChosedDrop', (res) => {
      this.state.socket.emit('seerChosedDrop', res)
    })

    EE.on('robberStart', () => {
      if (this.state.player.role === 'robber') {
        this.setState({hintBarContent: '请强盗选择是否要交换身份'})
        this.setState({hintBtnContent1: '是'})
        this.setState({hintBtnContent2: '否'})
        this.setState({hintBtnFunc1: () => {
          EE.emit('robberChoosePlayer')
          this.setState({hintBarDisplay: false})
          this.setState({hintBarBtnDisplay: false})
          this.setState({hintBtnFunc1: () => {}})
        }})
        this.setState({hintBtnFunc2: () => {
          this.state.socket.emit('robberNotChange')
          this.setState({hintBarBtnDisplay: false})
          this.setState({hintBtnFunc2: () => {}})
        }})
        this.setState({hintBarBtnDisplay: true})
      }
    })
    EE.on('robberChangeRoleResult', (res) => {
      this.setState({hintBarContent: `你现在的身份是${res.role}`})
      this.setState({hintBarDisplay: true})
      EE.delayEmitter(`PhaseEnd`, 2000, '强盗')
    })
    EE.on('robberChosedPlayer', (res) => {
      this.state.socket.emit('robberChosedPlayer', res)
    })


    EE.on('troubleMakerNotExchange', () => {
      this.state.socket.emit('troubleMakerNotExchange')
    })
    EE.on('troubleMakerChosedPlayer', (res) => {
      this.state.socket.emit('troubleMakerChosedPlayer', res)
    })


    EE.on('drunkChosedDrop', (res) => {
      this.state.socket.emit('drunkChosedDrop', res)
    })


    EE.on('insomniacGetLastRole', () => {
      this.state.socket.emit('insomniacGetLastRole')
    })


    EE.on('minionGetWerewolf', () => {
      this.state.socket.emit('minionGetWerewolf')
    })


    EE.on('masonGetOtherMason', () => {
      this.state.socket.emit('masonGetOtherMason')
    })
    EE.on('masonGotResult', () => {
      this.state.socket.emit('masonGotResult')
    })
    
    EE.on('doppelgangerChosedPlayer', (res) => {
      this.state.socket.emit('doppelgangerChosedPlayer', res)
    })
  }
  render() {
    return (
      <div>
        <Join display = {this.state.joinDisplay} />
        <GameBoard roomInfo = {this.state.roomInfo} player = {this.state.player} />
        <ControlBar stage = {this.state.stage} />
        <HintBar content = {this.state.hintBarContent} 
                 display = {this.state.hintBarDisplay} 
                 player = {this.state.player}
                 btnDisplay = {this.state.hintBarBtnDisplay}
                 btnContent1 = {this.state.hintBtnContent1}
                 btnContent2 = {this.state.hintBtnContent2}
                 btnFunc1 =  {this.state.hintBtnFunc1}
                 btnFunc2 =  {this.state.hintBtnFunc2}/>
        <DropCardChoose dropRole={this.state.roomInfo.dropRole}/>
      </div>
    )
  }
}

export default StateContainer