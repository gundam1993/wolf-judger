import { connect } from 'react-redux'
import { showJoin, hideJoin } from '../actions'
import Join from '../components/join'


const mapStateToProps = (state) => {
  return {
    display: state.join.display
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onJoinClick: () => {
      dispatch(hideJoin())
    }
  }
}

const JoinPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Join)

export default JoinPage