
import React, { useEffect } from "react"
import AccountsPanel from './AccountsPanel'
import TransactionsPanel from '../components/TransactionPanel'
import BalancePanel from './BalancePanel'
import {connect} from 'react-redux'
import { usePromiseTracker } from "react-promise-tracker";
import PreLoader from "../components/PreLoader"


const Dash = (props) => {

  const { promiseInProgress } = usePromiseTracker(); // will return t or f 

  return (
    promiseInProgress // can also just check if there are accounts. mayeb throw noaccounts.js in here too 
    ? <PreLoader/>
    :(<div className="dash"> 
        <BalancePanel /> 
        <AccountsPanel /> 
        <TransactionsPanel transactions={props.transactions}/> 
      </div>)
  )
}

const mapStateToProps = (state) => {
  return { 
    transactions: state.linkReducer.transactionsDisplay,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Dash);


