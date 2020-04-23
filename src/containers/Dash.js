import React from "react"
import AccountsPanel from './AccountsPanel'
import TransactionsPanel from './TransactionPanel'
import BalancePanel from './BalancePanel'
import {connect} from 'react-redux'

const Dash = (props) => {

  const logout = () => {
    localStorage.clear()
    props.clearCurrentUser()
  }
  // console.log(props)
  return (
    // <div className="dash"> 
    <div > 
      <button onClick={logout}> Logout </button>
      <BalancePanel /> 
      <AccountsPanel /> 
      <TransactionsPanel /> 
    </div>
  )
}

const mapStateToProps = (state) => {
  return { 
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCurrentUser: ( () => dispatch({type: "clearCurrentUser"}) )
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Dash);


