let style = require('../styles/modal.scss')

import React from 'react';

import RadioSelector from './radioSelector'

class Modal extends React.Component {
  DropCardChooseButtonHandler = () => {
    this.props.onDropCardConfirm(this.props.chosenDrop, this.props.chosenLimit, this.props.socketEvent)
  }
  render() {
    if (this.props.display) {
      return (
        <div>
          <div id="ModalMask"></div>
          <div id="ModalContainer">
            <RadioSelector options={[0,1,2]}/>
            <div id='ModalButtonContainer'>
              <button id='ModalButton' onClick={this.DropCardChooseButtonHandler}>确定</button>
            </div>
          </div>
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
  chosenDrop: React.PropTypes.array.isRequired,
  onDropCardClick: React.PropTypes.func.isRequired,
  chosenLimit: React.PropTypes.number.isRequired,
  socketEvent: React.PropTypes.string.isRequired,
  onDropCardConfirm: React.PropTypes.func.isRequired,
}

Modal.defaultProps = {
  display: false,
  chosenDrop: [],
  onDropCardClick: () => {},
  chosenLimit: 0,
  socketEvent: '',
  onDropCardConfirm: () => {},
}

export default Modal