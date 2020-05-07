
import React from "react"
import AccountsPanel from '../components/AccountsPanel'
import TransactionsPanel from '../components/TransactionPanel'
import BalancePanel from '../components/BalancePanel'
import {connect} from 'react-redux'
import { usePromiseTracker } from "react-promise-tracker";
import PreLoader from "../components/PreLoader"
import NoAccounts from "../components/NoAccounts"



const Dash = (props) => {

  const { promiseInProgress } = usePromiseTracker()

  return (
    promiseInProgress 
    ? <PreLoader/>
    : props.accounts.length
      ? (
        <div className="dash-grid-container">
          <div className="dash-balance">
            <BalancePanel /> 
          </div>
          <div className="dash-accounts">
            <button className="btn btn-block" style={{color: "white", backgroundColor: "#3E3E3E"}}> accounts </button>
            <AccountsPanel /> 
          </div>
          <div className="dash-transactions">
            <button className="btn btn-block" style={{color: "white", backgroundColor: "#3E3E3E"}}> transactions </button>
            <TransactionsPanel transactions={props.transactions} vh={53}/> 
          </div>
        </div>
      )
      : <NoAccounts />
  )
}

const mapStateToProps = (state) => {
  return { 
    transactions: state.linkReducer.transactionsDisplay,
    accounts: state.linkReducer.accounts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Dash);


