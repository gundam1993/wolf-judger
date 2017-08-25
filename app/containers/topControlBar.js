import { connect } from 'react-redux'
import actions from '../actions'
import topControlBarComponent from '../components/topControlBar'

const mapStateToProps = (state) => {
  return {
    roomName: state.room.name,
    playerLimit: state.room.playerLimit,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLeaveClick: (e) => {
      dispatch(actions.leaveRoom())
    }
  }
}

const topControlBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(topControlBarComponent)

export default topControlBar