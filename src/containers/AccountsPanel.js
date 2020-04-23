import React from "react"
import { connect } from 'react-redux'



const AccountsPanel = (props) => {

  const showAccount = (account) => {
    console.log(account)
    return(
      <div className="list-group-item list-group-item-action">
        <div>{account.name}</div>
        <div>{account.balances.current}</div>
        {/* <div>{account.account_id}</div> */}
        {/* institution */}
      </div>
    )
  }

  // ONE ACCOUNT
  // account_id: "Z5av9PVQDrtb73QNQogXT9BywdLdaasgV3QE3"
  // balances: {current: 320.76, iso_currency_code: "USD"}
  // mask: "5555"
  // name: "Plaid IRA"
  // subtype: "ira"
  // type: "investment"
  // __proto__: Object

  return (
    // <div className="acc" > 
    <div className="list-group">
      <div className="list-group-item list-group-item-action active">
        Accounts Panel
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