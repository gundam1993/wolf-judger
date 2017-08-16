import { connect } from 'react-redux'
import { showJoin, hideJoin, joinNewRoom } from '../actions'
import Join from '../components/join'


const mapStateToProps = (state) => {
  return {
    display: state.join.display
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onJoinClick: () => {
      dispatch(joinNewRoom({room: 'default', username: '1'}))
    }
  }
}

const JoinPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Join)

export default JoinPage