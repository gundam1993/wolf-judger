import React from 'react';
import ReactDOM from 'react-dom'
import EE from '../lib/eventEmitter'

class PlayerBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="playerBlock"></div>
    )
  }
}

PlayerBlock.defaultProps = {
  player: {}
}

export default PlayerBlock
