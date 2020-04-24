import React from "react"
import AccountsPanel from './AccountsPanel'
import TransactionsPanel from './TransactionPanel'
import BalancePanel from './BalancePanel'
import {connect} from 'react-redux'

const Dash = (props) => {


  return (
    // <div className="dash"> 
    <div > 
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


