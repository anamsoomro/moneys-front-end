import React from "react"
import { connect } from 'react-redux'

const TransactionPanel = (props) => {
  const showTransaction = (transaction) => { 
    return (                                                                                                                                                 
      <div className="list-group-item list-group-item-action" key={transaction.transaction_id}>
        <div>{transaction.name}</div>
        <span className="badge">${transaction.amount}</span>
        {/* <div>account_id: {transaction.account_id}</div> */}
        <div> {transaction.account_name}</div> 
        <div>{transaction.date}</div>
        <div>{transaction.user.username}</div>

      </div>
    )
  }

  return (
    <div className="trans"> 
    <div className="list-group">
      <div className="list-group-item list-group-item-action active">
        Transaction Panel
        {props.transactions.map( transaction => showTransaction(transaction))}
      </div>
    </div>
     </div>
  )
}

const mapStateToProps = (state) => {
  return {
    // transactions: state.linkReducer.transactions
    transactions: state.linkReducer.transactionsDisplay,
    userView: state.linkReducer.userView
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(TransactionPanel)