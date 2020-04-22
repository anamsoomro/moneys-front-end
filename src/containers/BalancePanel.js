import React from "react"
import { connect } from 'react-redux'

const BalancePanel = () => {

  return (
    <div className="bal"> I am BalancePanel </div>
  )

}

const mapStateToProps = (state) => {
  return {
    state
    // count: state.CounterReducer.count
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    dispatch
    // inc: (() => dispatch({type: "inc"}))
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(BalancePanel)