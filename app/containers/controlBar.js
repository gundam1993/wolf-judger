import { connect } from 'react-redux'
import actions from '../actions'
import controlBarComponent from '../components/controlBar'

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
    onJoinClick: (e) => {
      dispatch(actions.joinNewRoom())
    }
  }
}

const controlBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(controlBarComponent)

export default controlBar