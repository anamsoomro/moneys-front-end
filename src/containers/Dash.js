
import React, { useEffect } from "react"
import AccountsPanel from './AccountsPanel'
import TransactionsPanel from '../components/TransactionPanel'
import BalancePanel from './BalancePanel'
import {connect} from 'react-redux'

const Dash = () => {

  return (
    <div className="dash"> 
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
    dispatch
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Dash);


