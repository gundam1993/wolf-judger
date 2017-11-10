let style = require('../styles/modal.scss')

import React from 'react';

import RadioSelector from './radioSelector'
import CheckboxSelector from './checkboxSelector'

class Modal extends React.Component {
  buttonHandler = () => {
    this.props.onModalButtonClick(this.props.chosenItem, this.props.chosenLimit, this.props.socketEvent)
  }
  render() {
    let radio = this.props.chosenLimit === 1 ? 
      <RadioSelector options={this.props.optionsSrc} onChoose={this.props.onRadioChoose} /> : 
      <CheckboxSelector 
        options={this.props.optionsSrc} 
        chosenLimit={this.props.chosenLimit}
        chosenItem={this.props.chosenItem}
        onChoose={this.props.onCheckboxChoose} />
    if (this.props.display) {
      return (
        <div id="Modal">
          <div id="ModalContainer">
            {radio}
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
  onRadioChoose: React.PropTypes.func.isRequired,
  chosenLimit: React.PropTypes.number.isRequired,
  socketEvent: React.PropTypes.string.isRequired,
  onDropCardConfirm: React.PropTypes.func.isRequired,
  onCheckboxChoose: React.PropTypes.func.isRequired,
}

Modal.defaultProps = {
  display: false,
  chosenItem: [],
  onRadioChoose: () => {},
  chosenLimit: 0,
  socketEvent: '',
  onDropCardConfirm: () => {},
  onCheckboxChoose: () => {},
}

export default Modal