import React, { useEffect } from "react"
import AccountsPanel from './AccountsPanel'
import TransactionsPanel from './TransactionPanel'
import BalancePanel from './BalancePanel'
import {connect} from 'react-redux'

const Dash = (props) => {

  useEffect( () =>{
    if (localStorage.token){ 
      fetch(`http://localhost:3000/accounts/${props.account_id}/get_data`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        // for as many items this acount has. each object in array is a link item
        if (!!data.transactions.length){ // if user has no plaid items {trans: [], accounts: []}
          let allAccounts = []
          data.accounts.map( item => item.map(account => allAccounts.push(account)))
          let allTransactions = [] 
          data.transactions.map( item => item.map(transaction => allTransactions.push(transaction)))
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
    account_id: state.authReducer.account.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeData: ( (data) => dispatch({type: "storeData", data: data}) ) // data = {transactions: [...], accounts: [...]}
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Dash);


