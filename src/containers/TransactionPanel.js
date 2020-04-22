
import React from "react"
import { connect } from 'react-redux'


const TransactionPanel = () => {

  return (
    <div className="trans"> I am TransactionPanel </div>
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

export default connect(mapStateToProps, mapDispacthToProps)(TransactionPanel)