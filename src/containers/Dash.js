
import React from "react"
import AccountsPanel from '../components/AccountsPanel'
import TransactionsPanel from '../components/TransactionPanel'
import BalancePanel from '../components/BalancePanel'
import {connect} from 'react-redux'
import { usePromiseTracker } from "react-promise-tracker";
import PreLoader from "../components/PreLoader"
import NoAccounts from "../components/NoAccounts"



const Dash = (props) => {

  const { promiseInProgress } = usePromiseTracker(); // will return t or f. tracking promise in app useEffect 
  return (
    promiseInProgress 
    ? <PreLoader/>
    : props.accounts.length
      ? (
        <div class="dash-grid-container">
          <div class="dash-balance">
            <BalancePanel /> 
          </div>
          <div class="dash-accounts">
            <h5>ACCOUNTS</h5>
            <AccountsPanel /> 
          </div>
          <div class="dash-transactions">
            <h5>ACCOUNTS</h5>
            <TransactionsPanel transactions={props.transactions}/> 
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


