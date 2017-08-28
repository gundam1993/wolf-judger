import { connect } from 'react-redux'
import actions from '../actions'
import bottomControlBarComponent from '../components/bottomControlBar'

const mapStateToProps = (state) => {
  return {
    ready: state.player.ready,
    inputType: state.bottomControlBar.inputType
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onReadyClick: (e) => {
      dispatch(actions.playerReady())
    },
    changeInputTypeToText: () => {
      dispatch(actions.changeInputTypeToText())
    },
    changeInputTypeToAudio: () => {
      dispatch(actions.changeInputTypeToAudio())
    }
  }
}

const bottomControlBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(bottomControlBarComponent)

export default bottomControlBar