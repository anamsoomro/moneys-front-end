import React from "react"
import AccountsPanel from './AccountsPanel'
import TransactionsPanel from './TransactionPanel'
import BalancePanel from './BalancePanel'

const Dash = () => {
  return (
    <div className="dash"> 
      <BalancePanel /> 
      <AccountsPanel /> 
      <TransactionsPanel /> 
    </div>
  )
}

export default Dash;


