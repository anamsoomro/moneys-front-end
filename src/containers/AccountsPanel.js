import React from "react"
import { connect } from 'react-redux'



const AccountsPanel = (props) => {

  const showAccount = (account) => {
    console.log("one account", account)
    return(
      <div className="list-group-item list-group-item-action">
        <div>{account.name}</div>
        <div>${account.balances.current}</div>
        <div>subtype: {account.subtype}</div>
        <div>type: {account.type}</div>
        <div>account_id: {account.account_id}</div>
        {/* institution */}
      </div>
    )
  }



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
    // inc: (() => dispatch({type: "inc"}))
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(AccountsPanel)