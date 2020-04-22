import React from "react"
import { connect } from 'react-redux'


const AccountsPanel = () => {

  return (
    <div className="acc" > I am AccountsPanel </div>
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

export default connect(mapStateToProps, mapDispacthToProps)(AccountsPanel)