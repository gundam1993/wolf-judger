let style = require('../styles/join.scss')
import React from 'react';

class Join extends React.Component {
  render() {
    if (this.props.display) {
      return (
        <div id="username-block">
          <h1>请输入您的昵称：</h1>
          <input id="username" 
                 type="text" 
                 ref="usernameInput"
                 onInput={this.props.onJoinInput}/>
          <button id="submit-username"
                  onClick={this.props.onJoinClick}>开始游戏</button>
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
  username: React.PropTypes.string.isRequired,
  onJoinClick: React.PropTypes.func.isRequired,
  onJoinInput: React.PropTypes.func.isRequired,
}

Join.defaultProps = {
  display: false,
  username: '',
}

export default Join
