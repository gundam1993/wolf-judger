import { connect } from 'react-redux'
import actions from '../actions'
import JoinPage from '../components/join'

console.log(actions)
const mapStateToProps = (state) => {
  return {
    display: state.join.display,
    username: state.player.username,
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

const Join = connect(
  mapStateToProps,
  mapDispatchToProps,
)(JoinPage)

export default Join