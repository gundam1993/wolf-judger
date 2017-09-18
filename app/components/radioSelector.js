let style = require('../styles/radioSelector.scss')

import React from 'react';

class RadioSelector extends React.Component {
  render() {
    console.log(this.props.options)
    let options = this.props.options.map((opt, index) => {
      return (
        <div>
          <input type="radio" id={`opt${index}`} name="RadioSelector" value={index} />
          <label htmlFor={`opt${index}`}>
            <img src={opt.src} alt=""/>
          </label>  
        </div>
      )
    })
    console.log(options)
    return (
      <div id="RadioSelector">
        {options}
      </div>
    )
  }
}

RadioSelector.propTypes = {
  options: React.PropTypes.array.isRequired,
}

RadioSelector.defaultProps = {
  options: []
}

export default RadioSelector