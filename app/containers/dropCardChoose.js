import { connect } from 'react-redux'
import actions from '../actions'
import DropCardChooseCompoment from '../components/dropCardChoose'

const mapStateToProps = (state) => {
  return {
    display: state.drop.display,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // onJoinInput: (e) => {
    //   dispatch(actions.updateUsername(e.target.value))
    // },
    // onJoinClick: (e) => {
    //   dispatch(actions.joinNewRoom())
    // }
  }
}

const DropCard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DropCardChooseCompoment)

export default DropCard