let style = require('../dropCardChoose.css')

import React from 'react';

import DropCardBlock from './dropCardBlock'

class DropCardChoose extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: false,
      chosedDrop: [],
      DropCardChooseButtonHandlr: () => {}
    }
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
          <div id="DropCardContainer">
            <div id="DropCardChoose">
            <DropCardBlock index= "0" />
            <DropCardBlock index= "1" />
            <DropCardBlock index= "2" />
            </div>
            <div id='DropCardChooseButtonContainer'>
              <button id='DropCardChooseButton' onClick={this.state.DropCardChooseButtonHandlr}>确定</button>
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
  display: React.PropTypes.bool.isRequired
}

DropCardChoose.defaultProps = {
  display: false
}

export default DropCardChoose