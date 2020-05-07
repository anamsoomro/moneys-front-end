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
      {/* <div className="btn-group dropright " style={{padding: "0px"}}> */}
      <div className="btn-group" style={{padding: "0px"}}>

        <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" style={{color: "white", backgroundColor: "black"}}>
          {month[props.monthView - 1]}
        </button>
        <div className="dropdown-menu">
        <div className="dropdown-item" id={today.getMonth() + 1} onClick={getMonthTrans}>{month[today.getMonth() + 1 - 1]}</div>
          <div className="dropdown-divider"></div>
        <div className="dropdown-item" id={today.getMonth() + 1 - 1} onClick={getMonthTrans}>{month[today.getMonth() + 1 - 2]}</div>
          <div className="dropdown-divider"></div>
        <div className="dropdown-item" id={today.getMonth() + 1 - 2} onClick={getMonthTrans}>{month[today.getMonth() + 1 - 3]}</div>
          <div className="dropdown-divider"></div>
        <div className="dropdown-item" id={today.getMonth() + 1 - 3} onClick={getMonthTrans}>{month[today.getMonth() + 1 - 4]}</div>
        </div>
      </div>
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


