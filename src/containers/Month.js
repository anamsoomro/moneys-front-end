import React, { useEffect } from "react"
import MonthPie from "../components/MonthPie";
import TransactionPanel from "../components/TransactionPanel";
import {connect} from 'react-redux'
import MonthGauge from "../components/MonthGauge";
import NoAccounts from "../components/NoAccounts"
import ToggleMonth from '../components/ToggleMonth'
import MonthSummary from '../components/MonthSummary'

const Month = (props) => {

  useEffect( () => {
    props.handleMonthDisplay()
  }, [props.userView])



  return (
    props.accounts.length
    ? props.transactions.length
      ? <div className="month-grid-container">
          <div className="month-summary">
            <MonthSummary />
          </div>
          <div className="month-chart">
            <MonthGauge />
            {/* conditionally render <MonthPie  /> */}
          </div>
          <div className="month-transactions">
            <TransactionPanel transactions={props.transactions} />
          </div>
        </div>
      :<div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center"}}>
        <h1> no transactions for this month </h1>
        <ToggleMonth />
      </div>
    : <NoAccounts />
  )
}

const mapStateToProps = (state) => {
  return {
    // transactions: state.linkReducer.monthTransactions,
    transactions: state.linkReducer.monthDisplay,

    accounts: state.linkReducer.accounts,
    account_id: state.authReducer.account.id,
    accounts: state.linkReducer.accounts,

    userView: state.linkReducer.userView
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    storeMonth: ((transactions) => dispatch({type:"storeMonth", transactions: transactions})),

    handleMonthDisplay: () => dispatch({type: "handleMonthDisplay"})
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(Month);


