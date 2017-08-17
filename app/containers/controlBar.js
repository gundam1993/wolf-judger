import { connect } from 'react-redux'
import actions from '../actions'
import controlBarComponent from '../components/controlBar'

const mapStateToProps = (state) => {
  return {
    playerLimit: state.room.playerLimit,
    players: state.room.players,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onJoinInput: (e) => {
      dispatch(actions.updateUsername(e.target.value))
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