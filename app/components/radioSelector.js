let style = require('../styles/radioSelector.scss')

import React from 'react';

class RadioSelector extends React.Component {
  render() {
    let options = this.props.options.map((opt, index) => {
      return (
        <div>
          <input type="radio" id={`opt${index}`} name="RadioSelector" value={index} onClick={this.props.onChoose}/>
          <label htmlFor={`opt${index}`}>
            <img src={opt.src} alt=""/>
          </label>  
        </div>
      )
    })
    return (
      <div id="RadioSelector">
        {options}
      </div>
    )
  }
}

RadioSelector.propTypes = {
  options: React.PropTypes.array.isRequired,
  onChoose: React.PropTypes.func.isRequired,
}

RadioSelector.defaultProps = {
  options: [],
  onChoose: () => {},
}

export default RadioSelector