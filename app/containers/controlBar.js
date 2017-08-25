import { connect } from 'react-redux'
import actions from '../actions'
import bottomControlBarComponent from '../components/bottomControlBar'

const mapStateToProps = (state) => {
  return {
    ready: state.player.ready,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onReadyClick: (e) => {
      dispatch(actions.playerReady())
    },
    onLeaveClick: (e) => {
      dispatch(actions.leaveRoom())
    }
  }
}

const bottomControlBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(bottomControlBarComponent)

export default bottomControlBar