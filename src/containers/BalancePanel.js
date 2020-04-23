import React from "react"
import { connect } from 'react-redux'

const BalancePanel = () => {

  return (
    // <div className="bal"> 
    <div > 
      <h2>I am BalancePanel</h2>
    </div>
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