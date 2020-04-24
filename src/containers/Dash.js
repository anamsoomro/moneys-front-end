import React, { useEffect } from "react"
import AccountsPanel from './AccountsPanel'
import TransactionsPanel from './TransactionPanel'
import BalancePanel from './BalancePanel'
import {connect} from 'react-redux'

const Dash = (props) => {

  useEffect( () =>{
    getData(localStorage.account_id, localStorage.token) // now where does account_id and token come from
  })

  const getData = (account_id, token) => {  // this is their user auth token, not paid token. plaid token is related to items
    if (localStorage.token){ // im only doing this for that log out error. it doesnt make sense to my when dash renders again after logout
      fetch(`http://localhost:3000/accounts/${account_id}/get_data`, {
        method: "GET", // remember GET cant have a body
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        // for as many items this acount has. each object in array is a link item
        let allAccounts = []
        data.accounts.map( item => item.accounts.map(account => allAccounts.push(account)))
        let allTransactions = [] 
        data.transactions.map( item => item.transactions.map(transaction => allTransactions.push(transaction)))
        props.storeData({transactions: allTransactions, accounts: allAccounts})
      })
    }
  }


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


