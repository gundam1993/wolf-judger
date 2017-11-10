let style = require('../styles/selector.scss')

import React from 'react';

class Selector extends React.Component {
  clickHandler = (e) => {
    this.props.onChoose(this.props.chosenItem, this.props.chosenLimit, e)
  }
  render() {
    let options = this.props.options.map((opt, index) => {
      return (
        <div>
          <input type={this.props.chosenLimit > 1 ? "checkbox" : "radio"} id={`opt${index}`} name="Selector" value={opt.value || index} onClick={this.clickHandler}/>
          <label htmlFor={`opt${index}`}>
            <img src={opt.src} alt=""/>
            <p>{opt.content}</p>
          </label>  
        </div>
      )
    })
    return (
      <div id="SelectorBlock">
        {options}
      </div>
    )
  }
}

Selector.propTypes = {
  options: React.PropTypes.array.isRequired,
  onChoose: React.PropTypes.func.isRequired,
  chosenItem: React.PropTypes.array.isRequired,
  chosenLimit: React.PropTypes.number.isRequired,
}

Selector.defaultProps = {
  options: [],
  onChoose: () => {},
  chosenItem: [],
  chosenLimit: 0,
}

export default Selector