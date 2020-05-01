import React from "react"
import {connect} from 'react-redux'

const ToggleMonth = (props) => {

  const getMonthTrans = (event) => {
    fetch("http://localhost:3000/month_transactions",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        month: event.target.value,
        account_id: props.account_id
      })
    })
    .then( resp => resp.json())
    .then( transactions => {
      let allTransactions = transactions[0] // figure out why this comes back twice
      allTransactions = allTransactions.map( tran => {
        let account = props.accounts.filter( acc=> acc.account_id === tran.account_id )
        return {...tran, account_name: account[0].name}
      })
      props.storeMonth(allTransactions)
    })
  }

  return (
    <select id="month" name="asdfasd" style={{display: "block"}} onChange={getMonthTrans}> 
      <option value={5}> Current Month </option>
      <option value={4}> April  </option>
      <option value={3}> March </option>
      <option value={2}> February </option>
      <option value={1}> January </option>
    </select>
  )
}

const mapStateToProps = (state) => {
  return {
    accounts: state.linkReducer.accounts,
    account_id: state.authReducer.account.id,
    accounts: state.linkReducer.accounts
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    storeMonth: ((transactions) => dispatch({type:"storeMonth", transactions: transactions}))
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(ToggleMonth);


