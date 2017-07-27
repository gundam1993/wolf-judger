let style = require('../dropCardChoose.css')

import React from 'react';
import ReactDOM from 'react-dom'
import EE from '../lib/eventEmitter'

import DropCardBlock from './dropCardBlock'

class DropCardChoose extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: false,
      chosedDrop: [],
      DropCardChooseButtonHandlr: () => {}
    }
  }
  componentWillMount() {
    EE.on('removeDropCard', (res) => {
      let choose = [].concat(this.state.chosedDrop)
      let index = choose.indexOf(res)
      if (index !== -1) {
        choose.splice(index,1)
        this.setState({chosedDrop: choose})
      }
    })
    EE.on('chooseDropCard', (res) => {
      // if () {}
    })
    EE.on('seerChooseDrop', () => {
      this.setState({display: true})
      EE.on()
    })
    EE.on('seerChoosingDrop', (res) => {
      
    })
  }
  render() {
    let container = ''
    if (this.state.display) {
      let cards = []
      for (let i = 0; i < this.props.dropRole.length; i++) {
        cards.push(<DropCardBlock index={i} />)
      }
      container = <div id="DropCardContainer">
                    <div id="DropCardChoose">{cards}</div>
                    <div id='DropCardChooseButtonContainer'>
                      <button id='DropCardChooseButton' onClick={this.state.DropCardChooseButtonHandlr}>确定</button>
                    </div>
                  </div>
    }
    return (
      <div>
        {container}
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