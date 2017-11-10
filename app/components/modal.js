let style = require('../styles/modal.scss')

import React from 'react';
import Selector from './selector'

class Modal extends React.Component {
  buttonHandler = () => {
    this.props.onModalButtonClick(this.props.chosenItem, this.props.chosenLimit, this.props.socketEvent)
  }
  render() {
    if (this.props.display) {
      return (
        <div id="Modal">
          <div id="ModalContainer">
            <Selector 
              options={this.props.optionsSrc} 
              chosenLimit={this.props.chosenLimit}
              chosenItem={this.props.chosenItem}
              onChoose={this.props.onSelectorChoose} />
            <div id='ModalButtonContainer'>
              <button id='ModalButton' onClick={this.buttonHandler}>确定</button>
            </div>
          </div>
          <div id="ModalMask"></div>          
        </div>
      )
    }
    return (
      <div></div>
    )
  }
}

Modal.propTypes = {
  display: React.PropTypes.bool.isRequired,
  chosenItem: React.PropTypes.array.isRequired,
  optionsSrc: React.PropTypes.array.isRequired,
  chosenLimit: React.PropTypes.number.isRequired,
  socketEvent: React.PropTypes.string.isRequired,
  onDropCardConfirm: React.PropTypes.func.isRequired,
  onSelectorChoose: React.PropTypes.func.isRequired,
}

Modal.defaultProps = {
  display: false,
  chosenItem: [],
  chosenLimit: 0,
  socketEvent: '',
  onDropCardConfirm: () => {},
  onSelectorChoose: () => {},
}

export default Modal