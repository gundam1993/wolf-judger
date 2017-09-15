let style = require('../styles/dropCardChoose.scss')

import React from 'react';

import DropCardBlock from './dropCardBlock'

class DropCardChoose extends React.Component {
  DropCardChooseButtonHandler = () => {
    this.props.onDropCardConfirm(this.props.chosenDrop, this.props.chosenLimit, this.props.socketEvent)
  }
  // componentWillMount() {
  //   EE.on('removeDropCard', (res) => {
  //     let choose = [].concat(this.state.chosedDrop)
  //     let index = choose.indexOf(res)
  //     if (index !== -1) {
  //       choose.splice(index,1)
  //       this.setState({chosedDrop: choose})
  //     }
  //   })
  //   EE.on('chooseDropCard', (res) => {
  //     let choose = [].concat(this.state.chosedDrop)
  //     console.log(choose)
  //     choose.push(res)
  //     this.setState({chosedDrop: choose})
  //     console.log(this.state.chosedDrop)
  //   })
  //   EE.on('seerChooseDrop', () => {
  //     this.setState({display: true})
  //     this.setState({DropCardChooseButtonHandlr: () => {
  //       if (this.state.chosedDrop.length !== 2) {
  //         console.log('请选择两张身份卡')
  //       } else {
  //         EE.emit('seerChosedDrop', {dropRole: this.state.chosedDrop})
  //         this.setState({display: false})
  //       }
  //     }})
  //   })
  //   EE.on('drunkChooseDrop', () => {
  //     this.setState({display: true})
  //     this.setState({DropCardChooseButtonHandlr: () => {
  //       if (this.state.chosedDrop.length !== 1) {
  //         console.log('请选择一张身份卡')
  //       } else {
  //         EE.emit('drunkChosedDrop', {dropRole: this.state.chosedDrop})
  //         this.setState({display: false})
  //       }
  //     }})
  //   })
  //   EE.on('wereWolfChooseDrop', () => {
  //     this.setState({display: true})
  //     this.setState({DropCardChooseButtonHandlr: () => {
  //       if (this.state.chosedDrop.length !== 1) {
  //         console.log('请选择一张身份卡')
  //       } else {
  //         EE.emit('wereWolfChosedDrop', {dropRole: this.state.chosedDrop})
  //         this.setState({display: false})
  //       }
  //     }})
  //   })
  // }
  render() {
    if (this.props.display) {
      return (
        <div>
          <div id="DropMask"></div>
          <div id="DropCardContainer">
            <div id="dropHint">请选择</div>
            <div id="DropCardChoose">
            <DropCardBlock index= {0} chosen={this.props.chosenDrop} click={this.props.onDropCardClick} />
            <DropCardBlock index= {1} chosen={this.props.chosenDrop} click={this.props.onDropCardClick} />
            <DropCardBlock index= {2} chosen={this.props.chosenDrop} click={this.props.onDropCardClick} />
            </div>
            <div id='DropCardChooseButtonContainer'>
              <button id='DropCardChooseButton' onClick={this.DropCardChooseButtonHandler}>确定</button>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div></div>
    )
  }
}

DropCardChoose.propTypes = {
  display: React.PropTypes.bool.isRequired,
  chosenDrop: React.PropTypes.array.isRequired,
  onDropCardClick: React.PropTypes.func.isRequired,
  chosenLimit: React.PropTypes.number.isRequired,
  socketEvent: React.PropTypes.string.isRequired,
  onDropCardConfirm: React.PropTypes.func.isRequired,
}

DropCardChoose.defaultProps = {
  display: false,
  chosenDrop: [],
  onDropCardClick: () => {},
  chosenLimit: 0,
  socketEvent: '',
  onDropCardConfirm: () => {},
}

export default DropCardChoose