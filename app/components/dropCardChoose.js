let style = require('../dropCardChoose.css')

import React from 'react';
import ReactDOM from 'react-dom'
import EE from '../lib/eventEmitter'

import DropCardBlock from './dropCardBlock'

class DropCardChoose extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: false
    }
  }
  render() {
    let container = ''
    if (this.state.display) {
      let cards = []
      for (let i = 0; i < num; i++) {
        cards.push(<DropCardBlock index={i} />)
      }
      container = <div id="DropCardChoose">{cards}</div>
    }
    return (
      <div>
        {container}
      </div>
    )
  }
}

DropCardChoose.propTypes = {
  dropRole: React.PropTypes.array
}

DropCardChoose.defaultProps = {
  dropRole: []
}

export default DropCardChoose