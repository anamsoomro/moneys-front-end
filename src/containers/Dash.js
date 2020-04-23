import React from "react"
import AccountsPanel from './AccountsPanel'
import TransactionsPanel from './TransactionPanel'
import BalancePanel from './BalancePanel'

const Dash = (props) => {
  console.log(props)
  return (
    // <div className="dash"> 
    <div > 
      <button onClick={() => localStorage.clear()}> Logout </button>
      <BalancePanel /> 
      <AccountsPanel /> 
      <TransactionsPanel /> 
    </div>
  )
}

export default Dash;


