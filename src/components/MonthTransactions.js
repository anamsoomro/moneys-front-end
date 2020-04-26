import React from "react"
import { connect } from 'react-redux'

const MonthTransactions = (props) => { // i just want to pass it different props 

  const showTransaction = (transaction) => { 
    return (                                                                                                                                                 
      <div className="list-group-item list-group-item-action" key={transaction.transaction_id}>
        <div>{transaction.name}</div>
        <span classNAWame="badge">${transaction.amount}</span>
        <div>account_id: {transaction.account_id}</div>
        <div>{transaction.date}</div>
        <div>{transaction.user.username}</div>
      </div>
    )
  }

  return (
    // <div className="trans"> 
    <div className="list-group">
      <div className="list-group-item list-group-item-action active">
        Monthly Transaction Panel
        {props.transactions.map( transaction => showTransaction(transaction))}
      </div>
    </div>
    // </div>
  )
}

const mapStateToProps = (state) => {
  return {
    transactions: state.linkReducer.monthTransactions
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    dispatch
    // inc: (() => dispatch({type: "inc"}))
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(MonthTransactions)