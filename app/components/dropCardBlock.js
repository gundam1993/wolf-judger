import React from 'react';

class DropCardBlock extends React.Component {
  dropCardBlockClick = () => {
    this.props.click(this.props.index, this.props.chosen)
  }
  render() {
    let className = 'dropCardBlock'
    if (this.props.chosen.indexOf(this.props.index) !== -1) {
      className += ' checked'
    }
    return (
      <div className={className} onClick={this.dropCardBlockClick}></div>
    )
  }
}

DropCardBlock.propTypes = {
  index: React.PropTypes.number.isRequired,
  chosen: React.PropTypes.array.isRequired,
  click: React.PropTypes.func.isRequired,
}

DropCardBlock.defaultProps = {
  index: 0,
  chosen: [],
  click: () => {},
}

export default DropCardBlock