let style = require('../dropCardChoose.css')

import React from 'react';
import ReactDOM from 'react-dom'
import EE from '../lib/eventEmitter'

class DropCardChoose extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: false
    }
  }
  render() {
    return (
      <div>
        {}
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