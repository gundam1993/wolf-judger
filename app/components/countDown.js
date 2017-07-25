let style = require('../countDown.css')

import React from 'react';
import ReactDOM from 'react-dom'
import EE from '../lib/eventEmitter'

class CountDown extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      timeLimit: 300,
      countDownDisplay: false,
      buttonDisplay: false,
      countDownhandle: () => {},
      countDownFunction: {}
    }
  }
  getMinute = () => {
    return parseInt(this.state.timeLimit / 60)
  }
  getSecond = () => {
    let minute = parseInt(this.state.timeLimit / 60)
    let second = this.state.timeLimit - minute * 60
    if ((second + '').length < 2) {
      return ('0' + second)
    }
    return second
  }
  emitter = (name, time) => {
    setTimeout(() => {
        EE.emit(name)
      }, time)
  }
  countDown = () => {
    return setInterval(() => {
        this.setState({timeLimit: this.state.timeLimit - 1})
      }, 1000)
  }
  componentWillMount() {
    EE.on('victimLastWord', () => {
      this.setState({countDownDisplay: true})
      this.setState({countDownFunction: this.countDown()})
    })
  }
  render () {
    let countDownBlock = this.state.countDownDisplay ? <div id="countDownBlock">{this.getMinute()}:{this.getSecond()}</div> : ''
    let countDownButton = this.state.buttonDisplay ? <button id="countDownButton" onClick={this.state.countDownhandle}>发言结束</button> : ''
    return (
      <div id="countDownContainer">
        {countDownBlock}
        <div id='countDownButtonBlock'>
          {countDownButton}
        </div>
      </div>
    )
  }
}

export default CountDown
