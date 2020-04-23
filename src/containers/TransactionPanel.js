
import React from "react"
import { connect } from 'react-redux'
// import Card from 'react-bootstrap/Card'

const TransactionPanel = (props) => {

  const showTransaction = (transaction) => { 
    return (
      // <Card key={transaction.transaction_id}>
      //   <Card.Body>
      //     <Card.Title> {transaction.name} </Card.Title>
      //     <Card.Subtitle> {transaction.amount} </Card.Subtitle>
      //     <Card.Text> {transaction.account_id} </Card.Text>
      //     {/* this needs to be read with an account name */}
      //   </Card.Body>
      // </Card>

      <div className="list-group-item list-group-item-action">
        <div>{transaction.name}</div>
        <div>${transaction.amount}</div>
        <div>{transaction.account_id}</div>
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