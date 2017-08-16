let style = require('../main.css')

import React from 'react';
import ReactDOM from 'react-dom'
import EE from '../lib/eventEmitter'

class Join extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ''
    }
  }
  componentDidMount () {
    EE.on('joinFail', this.showHint)
  }
  usernameChange = () => {
    this.setState({username: this.refs.usernameInput.value})
  }
  connect = () => {
    if (this.state.username === '') {
      console.log('昵称不能为空')
      return
    }
    EE.emit('userLogin', {room: 'default', username: this.state.username})
    this.refs.usernameInput.value = ''
    this.setState({username: this.refs.usernameInput.value})
  }
  showHint = (message) => {
    console.log(message)
  }
  render() {
    if (this.props.display) {
      return (
        <div id="username-block">
          <h1>请输入您的昵称：</h1>
          <input id="username" 
                 type="text" 
                 ref="usernameInput"
                 defaultValue={this.state.username} 
                 onChange={this.usernameChange}/>
          <button id="submit-username"
                  onClick={this.connect}>开始游戏</button>
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
}

// PropTypes 验证，若传入的 props type 不是 object 将会显示错误
Join.propTypes = {
  display: React.PropTypes.bool.isRequired,
  onJoinClick: React.PropTypes.func.isRequired,
}

Join.defaultProps = {
  display: false,
}

export default Join
