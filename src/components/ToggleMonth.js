import React from "react"
import {connect} from 'react-redux'
import { trackPromise } from 'react-promise-tracker'


const ToggleMonth = (props) => {
  let today = new Date
  let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


  const getMonthTrans = (event) => {
    props.setMonthView(event.target.id)
    trackPromise(
    fetch("http://localhost:3000/month_transactions",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        // month: event.target.value,
        month: event.target.id,
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
      props.handleDisplay()
    })
    )

  }

  return (
    <div>
    <div class="btn-group dropright  btn-lg btn-block" style={{padding: "0px"}}>
      <button type="button" class="btn btn-secondary dropdown-toggle " data-toggle="dropdown" style={{color: "white", backgroundColor: "black"}}>
        {month[props.monthView - 1]}
      </button>
      <div class="dropdown-menu">
      <div class="dropdown-item" id={today.getMonth() + 1} onClick={getMonthTrans}>{month[today.getMonth() + 1 - 1]}</div>
        <div class="dropdown-divider"></div>
      <div class="dropdown-item" id={today.getMonth() + 1 - 1} onClick={getMonthTrans}>{month[today.getMonth() + 1 - 2]}</div>
        <div class="dropdown-divider"></div>
      <div class="dropdown-item" id={today.getMonth() + 1 - 2} onClick={getMonthTrans}>{month[today.getMonth() + 1 - 3]}</div>
        <div class="dropdown-divider"></div>
      <div class="dropdown-item" id={today.getMonth() + 1 - 3} onClick={getMonthTrans}>{month[today.getMonth() + 1 - 4]}</div>
      </div>
    </div>
    {/* <select id="month" name="asdfasd" style={{display: "block"}} onChange={getMonthTrans}> 
      <option value={today.getMonth() + 1}> {month[today.getMonth() - 1]} </option>
      <option value={today.getMonth() + 1 - 1}> {month[today.getMonth() + 1 - 2]}  </option>
      <option value={today.getMonth() + 1 - 2}> {month[today.getMonth() + 1 - 3]} </option>
      <option value={today.getMonth() + 1 - 3}> {month[today.getMonth() + 1 - 4]} </option>
      <option value={today.getMonth() + 1 - 4}> {month[today.getMonth() + 1 - 5]} </option>
    </select> */}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    accounts: state.linkReducer.accounts,
    account_id: state.authReducer.account.id,
    monthView: state.linkReducer.monthView
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    storeMonth: ((transactions) => dispatch({type:"storeMonth", transactions: transactions})),
    setMonthView: ((month)=>dispatch({type: "setMonthView", month: month})),
    handleDisplay: () => dispatch({type: "handleDisplay"})
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(ToggleMonth);


