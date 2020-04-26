import React from "react"
import { connect } from 'react-redux'



const AccountsPanel = (props) => {

  const showAccount = (account) => {
    return(
      <div className="list-group-item list-group-item-action" key={account.account_id}>
        <div>{account.name}</div>
        <span className="badge">${account.balances.current}</span>
        <div>subtype: {account.subtype}</div>
        <div>type: {account.type}</div>
        {/* <div>account_id: {account.account_id}</div> */}
        <div> {account.user.username}</div>
        {/* institution */}
      </div>
    )
  }

// one account
// account_id: "pz1M6bEWVxC7AoMm6ypEFj6D3GpKPpcLVgMzd"
// balances: {current: 410, iso_currency_code: "USD", limit: 2000}
// mask: "3333"
// name: "Plaid Credit Card"
// official_name: "Plaid Diamond 12.5% APR Interest Credit Card"
// subtype: "credit card"
// type: "credit"
// ADDED user key to it



  return (
    // <div className="acc" > 
    <div className="list-group">
      <div className="list-group-item list-group-item-action active">
        Accounts Panel
        <div> allow for a toggle here btwn cash investments and debt</div>
        <div> this would update balances/transactions/accounts</div>

        {props.accounts.map( account => showAccount(account))}
      </div>
    </div>
  )
  
}

const mapStateToProps = (state) => {
  return {
    accounts: state.linkReducer.accounts
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(AccountsPanel)