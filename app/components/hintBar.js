let style = require('../styles/hintBar.scss')

import React from 'react'
import HintInfo from './hintInfo'

class HintBar extends React.Component {
  render() {
    let buttons = ''
    if (this.props.btnDisplay) {
      buttons = <div id='hintButton'>
                  <button id="hintButtonYes" onClick={this.props.btnFunc1}>{this.props.btnContent1}</button>
                  <button id="hintButtonNo" onClick={this.props.btnFunc2}>{this.props.btnContent2}</button>
                </div>
    }
    let hints = this.props.content.map((content) => {
      return <HintInfo from={content.from} content={content.content} />
    })
    return (
      <div id="hintBar">
        <div id="hint">
          {hints}
        </div>
        {buttons}
      </div>
    )
  }
}

HintBar.propTypes = {
  content: React.PropTypes.array.isRequired,
  display: React.PropTypes.bool.isRequired,
  // subContent: React.PropTypes.string.isRequired,
  btnDisplay: React.PropTypes.boolean,
  btnContent1: React.PropTypes.string,
  btnContent2: React.PropTypes.string,
  btnFunc1: React.PropTypes.object,
  btnFunc2: React.PropTypes.object,
}

HintBar.defaultProps = {
  content: '',
  display: false,
  btnDisplay: false,
  btnContent1: '',
  btnContent2: '',
  btnFunc1: {},
  btnFunc2: {},
}

export default HintBar
