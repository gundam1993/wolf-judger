import { connect } from 'react-redux'
import actions from '../actions'
import ModalComponent from '../components/modal'

const mapStateToProps = (state) => {
  return {
    display: state.drop.display,
    chosenDrop: state.drop.chosenDrop,
    chosenLimit: state.drop.chosenLimit,
    socketEvent: state.drop.socketEvent,
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    onDropCardClick: (index, chosenDrop) => {
      if (chosenDrop.indexOf(index) !== -1) {
        dispatch(actions.removeDrop(index))
        return
      }
      dispatch(actions.chooseDrop(index))
    },
    onDropCardConfirm: (chosenDrop, chosenLimit, socketEvent) => {
      if (chosenDrop.length !== chosenLimit) {
        console.log(`请选择${chosenLimit}个遗弃身份`)
        return
      }
      dispatch({ 
        type: 'SUBMIT_SOCKET_EVENT', 
        event: socketEvent, 
        payload: chosenDrop,
      })
      dispatch(actions.hideDrop())
      dispatch(actions.cleanDrop())
      
    }
  }
}

const Modal = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalComponent)

export default Modal