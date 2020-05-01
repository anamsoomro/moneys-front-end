import React from "react"
import MonthPie from "../components/MonthPie";
import TransactionPanel from "../components/TransactionPanel";
import {connect} from 'react-redux'
import MonthGauge from "../components/MonthGauge";
import NoAccounts from "../components/NoAccounts"
import ToggleMonth from '../components/ToggleMonth'

const Month = (props) => {


  return (
    props.accounts.length
    ? props.transactions.length
      ? <div className="month-grid-container">
          <div > 
            <div className="month-gauge">
              <MonthGauge />
            </div>
            <div className="month-pie">
              <MonthPie  />
            </div>
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
    transactions: state.linkReducer.monthTransactions,
    accounts: state.linkReducer.accounts,
    account_id: state.authReducer.account.id,
    accounts: state.linkReducer.accounts
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    storeMonth: ((transactions) => dispatch({type:"storeMonth", transactions: transactions}))
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(Month);


