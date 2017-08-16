import { connect } from 'react-redux'
import actions from '../actions'
import Join from '../components/join'

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

const JoinPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Join)

export default JoinPage