import React, { useEffect } from "react"
import AccountsPanel from './AccountsPanel'
import TransactionsPanel from './TransactionPanel'
import BalancePanel from './BalancePanel'
import {connect} from 'react-redux'

const Dash = (props) => {

  useEffect( () =>{
    if (localStorage.token){ // im only doing this for that log out error. it doesnt make sense to my when dash renders again after logout
      fetch(`http://localhost:3000/accounts/${localStorage.account_id}/get_data`, {
        method: "GET", // remember GET cant have a body
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        debugger

        // with the user data.transactions comes back as [[{}, {}, ...]]

        // without user data.transactions comes back as [{item_response}]

        // for as many items this acount has. each object in array is a link item
        if (!!data.transactions.length){ // if user has no plaid items {trans: [], accounts: []}
          let allAccounts = []
          data.accounts.map( item => item.map(account => allAccounts.push(account)))
          // data.accounts.map( item => item.accounts.map(account => allAccounts.push(account)))

          let allTransactions = [] 
          data.transactions.map( item => item.map(transaction => allTransactions.push(transaction)))
          // data.transactions.map( item => item.transactions.map(transaction => allTransactions.push(transaction)))
          props.storeData({transactions: allTransactions, accounts: allAccounts})
        }
      })
    }
  }, []) // second argument only runs it if state is diff. can specify certain states

  return (
    // <div className="dash"> 
    <div > 
      <BalancePanel /> 
      <AccountsPanel /> 
      <TransactionsPanel /> 
    </div>
  )
}

const mapStateToProps = (state) => {
  return { 
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCurrentUser: ( () => dispatch({type: "clearCurrentUser"}) ),
    storeData: ( (data) => dispatch({type: "storeData", data: data}) ) // data = {transactions: [...], accounts: [...]}
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Dash);


