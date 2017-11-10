let style = require('../styles/checkboxSelector.scss')

import React from 'react';

class CheckboxSelector extends React.Component {
  checkboxHandler = (e) => {
    this.props.onChoose(this.props.chosenItem, this.props.chosenLimit, e)
  }
  render() {
    let options = this.props.options.map((opt, index) => {
      return (
        <div>
          <input type="checkbox" id={`opt${index}`} name="RadioSelector" value={opt.value || index} onClick={this.checkboxHandler}/>
          <label htmlFor={`opt${index}`}>
            <img src={opt.src} alt=""/>
            <p>{opt.content}</p>
          </label>  
        </div>
      )
    })
    return (
      <div id="CheckboxSelector">
        {options}
      </div>
    )
  }
}

CheckboxSelector.propTypes = {
  options: React.PropTypes.array.isRequired,
  onChoose: React.PropTypes.func.isRequired,
  chosenItem: React.PropTypes.array.isRequired,
  chosenLimit: React.PropTypes.number.isRequired,
}

CheckboxSelector.defaultProps = {
  options: [],
  onChoose: () => {},
  chosenItem: [],
  chosenLimit: 0,
}

export default CheckboxSelector