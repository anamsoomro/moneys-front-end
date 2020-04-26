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
  // ONE TRANSACTION
  // 0:
  // account_id: "j4QM5GbDXWS3NkXbr157SkE3xNXX1bF1qVvvR"
  // amount: 25
  // category: (2) ["Payment", "Credit Card"]
  // category_id: "16001000"
  // date: "2020-04-15"
  // iso_currency_code: "USD"
  // location: {}
  // name: "CREDIT CARD 3333 PAYMENT *//"
  // payment_channel: "other"
  // payment_meta: {}
  // pending: false
  // transaction_id: "dz4PXowyaLhpbdRvNK8likMaWPAAVXiZejBB8"
  // transaction_type: "special"
  // __proto__: Object
  // ADDED A USER

  return (
    // <div className="trans"> 
    <div className="list-group">
      <div className="list-group-item list-group-item-action active">
        Transaction Panel
        {props.transactions.map( transaction => showTransaction(transaction))}
      </div>
    </div>
    // </div>
  )
}

const mapStateToProps = (state) => {
  return {
    transactions: state.linkReducer.transactions
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    dispatch
    // inc: (() => dispatch({type: "inc"}))
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(TransactionPanel)