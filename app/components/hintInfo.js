let style = require('../styles/hintInfo.scss')
import React from 'react'

class HintInfo extends React.Component {
  render() {

  }
}

HintInfo.propTypes = {
  from: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
}

HintInfo.defaultProps = {
  content: '',
}

export default HintInfo