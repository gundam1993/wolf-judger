import { connect } from 'react-redux'
import actions from '../actions'
import ModalComponent from '../components/modal'
import { chooseItem } from '../actions/modal';

const mapStateToProps = (state) => {
  return {
    display: state.modal.display,
    chosenItem: state.modal.chosenItem,
    chosenLimit: state.modal.chosenLimit,
    socketEvent: state.modal.socketEvent,
    optionsSrc: state.modal.optionsSrc,
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    onSelectorChoose: (chosenItem, chosenLimit, e) => {
      if (chosenLimit === 1) {
        dispatch(actions.cleanChosen())
        dispatch(actions.chooseItem(e.target.value))
        return 
      }
      if (e.target.checked) {
        if (chosenItem.length < chosenLimit) {
          dispatch(actions.chooseItem(e.target.value))
        } else {
          e.preventDefault()
          e.stopPropagation()
          return false
        }
      } else {
        dispatch(actions.removeItem(e.target.value))
      }
    },
    onModalButtonClick: (chosenItem, chosenLimit, socketEvent, option) => {
      console.log(chosenItem)
      if (chosenItem.length !== chosenLimit) {
        console.log(`请选择${chosenLimit}项`)
        return
      }
      dispatch({ 
        type: 'SUBMIT_SOCKET_EVENT', 
        socketEvent: socketEvent,
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