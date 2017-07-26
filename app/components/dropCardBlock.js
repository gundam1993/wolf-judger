import React from 'react';
import ReactDOM from 'react-dom'
import EE from '../lib/eventEmitter'

class DropCardBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dropCardBlockClick: () => {}
    }
  }
  render() {
    return (
      <div className="dropCardBlock" onClick={this.state.dropCardBlockClick}></div>
    )
  }
}

DropCardBlock.propTypes = {
  index: React.PropTypes.number
}

DropCardBlock.defaultProps = {
  index: 0
}

export default DropCardBlock