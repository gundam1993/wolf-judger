import { connect } from 'react-redux'
import actions from '../actions'
import hintBarComponent from '../components/hintBar'

const mapStateToProps = (state) => {
  return {
    content: state.hint.content,
    display: state.hint.display,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // onReadyClick: (e) => {
    //   dispatch(actions.playerReady())
    // },
    // onLeaveClick: (e) => {
    //   dispatch(actions.leaveRoom())
    // }
  }
}

const hintBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(hintBarComponent)

export default hintBar