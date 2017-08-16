import { connect } from 'react-redux'
import actions from '../actions'
import GameBoardPage from '../components/gameBoard'

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

const GameBoard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameBoardPage)

export default GameBoard