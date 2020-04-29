import React from "react"
import MonthPie from "../components/MonthPie";
import TransactionPanel from "../components/TransactionPanel";
import {connect} from 'react-redux'
import MonthGauge from "../components/MonthGauge";
import NoAccounts from "../components/NoAccounts"

const container = {
  overflow: "hidden",
  width: "100%",
}

const left = {
  "float": "left",
  "width": "50%",
  "background-color": "orange",
  // "padding-bottom": "500em",
  // "margin-bottom": "-500em"
}

const right = {
  "float": "left",
  "width": "50%",
  // "margin-right": "-1px",
  "background-color": "red",
  // "padding-bottom": "500em",
  // "margin-bottom": "-500em"
}


const Month = (props) => {
  return (
    props.accounts.length
    ? <div>
        <div style={container}> 
          <div style={left}>
            <MonthGauge />
          </div>
          <div style={right}>
            <MonthPie  />
          </div>
        </div>
        <div>
          <TransactionPanel transactions={props.transactions}/>
        </div>
      </div>
    : <NoAccounts />
  )
}

const mapStateToProps = (state) => {
  return {
    transactions: state.linkReducer.monthTransactions,
    accounts: state.linkReducer.accounts
  }
}

export default connect(mapStateToProps)(Month);


