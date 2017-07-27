import React from 'react';
import ReactDOM from 'react-dom'
import EE from '../lib/eventEmitter'

class DropCardBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
  }
  dropCardBlockClick = () => {
    if (this.state.checked) {
      this.setState({checked: false})
      EE.emit('removeDropCard', this.props.index)
    } else {
      this.setState({checked: true})
      EE.emit('chooseDropCard', this.props.index)
    }
  }
  render() {
    let className = 'dropCardBlock'
    if (this.state.checked) {
      className += ' checked'
    }
    return (
      <div className={className} onClick={this.dropCardBlockClick}>{this.state.checked}</div>
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