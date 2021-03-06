let style = require('../styles/hintInfo.scss')
import React from 'react'

class HintInfo extends React.Component {
  render() {
    let from = <div className="hintFrom">
                 <div className={`fromMark ${this.props.from === '法官' ? 'system' : ''}`}>{this.props.from === '法官' ? '系统' : '玩家'}</div>
                  {this.props.from}
               </div>
    let content = <div className="hintContent">{this.props.content}</div>
    if (this.props.from === 'system') {
      from = ''
      content = <div className="systemHint">{this.props.content}</div>
    }
    return (
      <div className="hintInfoContainer">
        {from}
        {content}
      </div>
    )
  }
}

HintInfo.propTypes = {
  from: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
}

HintInfo.defaultProps = {
  content: '',
}

export default HintInfo