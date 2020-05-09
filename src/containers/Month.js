
import React, { useEffect } from "react"
import MonthPie from "../components/MonthPie";
import TransactionPanel from "../components/TransactionPanel";
import {connect} from 'react-redux'
import MonthGauge from "../components/MonthGauge";
import NoAccounts from "../components/NoAccounts"
import ToggleMonth from '../components/ToggleMonth'
import MonthSummary from '../components/MonthSummary'
import { usePromiseTracker } from "react-promise-tracker";
import PreLoader from "../components/PreLoader"

const Month = (props) => {

  useEffect( () => {
    props.handleMonthDisplay()
  }, [props.userView])




  const { promiseInProgress } = usePromiseTracker(); 

  return (
    promiseInProgress
    ? <PreLoader /> 
    : props.accounts.length
      ? props.transactions.length
        ? <div className="month-grid-container">
            <div className="month-summary">
              <MonthSummary />
            </div>
            <div className="month-chart">
              <ToggleMonth />
              {
                props.showCategories
                ? <MonthPie />
                : <MonthGauge />
              }
            </div>
            <div className="month-transactions">
            <button className="btn btn-block" style={{color: "white", backgroundColor: "#3E3E3E"}}> transactions </button>
              <TransactionPanel transactions={props.transactions} vh={80} />
            </div>
          </div>
        :<div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center"}}>
          <h2 style={{letterSpacing: "0.1em"}}> NO TRANSACTIONS FOR THIS MONTH </h2>
          <ToggleMonth />
        </div>
      : <NoAccounts />
  )
}

const mapStateToProps = (state) => {
  return {
    transactions: state.linkReducer.monthDisplay,

    accounts: state.linkReducer.accounts,
    account_id: state.authReducer.account.id,
    accounts: state.linkReducer.accounts,

    userView: state.linkReducer.userView,

    showCategories: state.linkReducer.showCategories
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    storeMonth: ((transactions) => dispatch({type:"storeMonth", transactions: transactions})),

    handleMonthDisplay: () => dispatch({type: "handleMonthDisplay"})
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(Month);


