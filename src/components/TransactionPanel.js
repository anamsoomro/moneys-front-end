import React from "react"
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'

const TransactionPanel = (props) => {
  const showTransaction = (transaction) => { 
    return (                                                                                                                                                 
      <div className="list-group-item list-group-item-action" >
        <div> {transaction.name}</div>
        <span className="badge">${transaction.amount}</span>
        <div> {transaction.account_name}</div> 
        <div>{transaction.date}</div>
        <div>{transaction.user.username}</div>
        <Avatar style={{"background": localStorage.user1 === transaction.user.username ? "#c28c80" : "#b0c06f"}}>
          {transaction.user.username[0]}
        </Avatar>
        <div>{transaction.institution}</div>
      </div>
    )
  }

  return (
    <div className="trans"> 
    <h6> Recent Transactions: </h6>
      <div className="list-group">
        <div className="list-group-item list-group-item-action active" style={{"background": "#cfd5db", "border":"0px"}}>
          {props.transactions.map( transaction => showTransaction(transaction))}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    // transactions: state.linkReducer.transactionsDisplay,
    state
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(TransactionPanel)