import React from "react"
import MonthChart from "../components/MonthChart";
import TransactionPanel from "../components/TransactionPanel";
import {connect} from 'react-redux'

const Month = (props) => {
  return (
    <div> 
      <p> inner circle can be income, outer circle be how much spent, like a speedometer</p>
      <p> maybe show if they are above on or below trend for saving</p>
      <MonthChart />
      <TransactionPanel transactions={props.transactions}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    transactions: state.linkReducer.monthTransactions,
  }
}

export default connect(mapStateToProps)(Month);


