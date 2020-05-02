import React from "react"
import {connect} from 'react-redux'

const ToggleMonth = (props) => {

  let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


  const getMonthTrans = (event) => {
    props.setMonthView(event.target.value)
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
      transactions = transactions.map( tran => {
        let account = props.accounts.filter( acc=> acc.account_id === tran.account_id )
        return {...tran, account_name: account[0].name}
      })
      props.storeMonth(transactions)
    })
  }

  return (
    <select id="month" name="asdfasd" style={{display: "block"}} onChange={getMonthTrans}> 
      <option value={props.monthView}> {month[props.monthView - 1]} </option>
      <option value={props.monthView - 1}> {month[props.monthView - 2]}  </option>
      <option value={props.monthView - 2}> {month[props.monthView - 3]} </option>
      <option value={props.monthView - 3}> {month[props.monthView - 4]} </option>
      <option value={props.monthView - 4}> {month[props.monthView - 5]} </option>
    </select>
  )
}

const mapStateToProps = (state) => {
  return {
    accounts: state.linkReducer.accounts,
    account_id: state.authReducer.account.id,
    accounts: state.linkReducer.accounts,
    monthView: state.linkReducer.monthView
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    storeMonth: ((transactions) => dispatch({type:"storeMonth", transactions: transactions})),
    setMonthView: ((month)=>dispatch({type: "setMonthView", month: month}))
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(ToggleMonth);


