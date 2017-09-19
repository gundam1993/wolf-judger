import { connect } from 'react-redux'
import actions from '../actions'
import ModalComponent from '../components/modal'

const mapStateToProps = (state) => {
  return {
    display: state.modal.display,
    chosenItem: state.modal.chosenItem,
    chosenLimit: state.modal.chosenLimit,
    socketEvent: state.modal.socketEvent,
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    onRadioChoose: (e) => {
      dispatch(actions.cleanChosen())
      dispatch(actions.chooseItem(e.target.value))
    },
    onModalButtonClick: (chosenItem, chosenLimit, socketEvent) => {
      if (chosenItem.length !== chosenLimit) {
        console.log(`请选择${chosenLimit}个遗弃身份`)
        return
      }
      dispatch({ 
        type: 'SUBMIT_SOCKET_EVENT', 
        event: socketEvent, 
        payload: chosenItem,
      })
      dispatch(actions.hideModal())
      dispatch(actions.cleanChosen())
      
    }
  }
}

const Modal = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalComponent)

export default Modal