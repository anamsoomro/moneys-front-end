import React from "react"
import { connect } from 'react-redux'
import ToggleMonth from '../components/ToggleMonth'

const MonthSummary = (props) => {

  let moneyIn = props.transactions.reduce( (acc, i) => {
    if (i.amount < 0 ){ //  "transaction with a negative amount represents money flowing into the account"
    return (-i.amount + acc)
    } else if(i.account_name.includes("Money Market") && i.amount > 0){ // these doesnt' align with plaid's above statement. review. 
    return (i.amount + acc)
    } else if(i.account_name.includes("CD") && i.amount > 0 ){
      return (i.amount + acc)
    } else { 
      return acc
    }
  }, 0)

  let moneyOut = props.transactions.reduce ( (acc, i) => {
    if(i.amount > 0 && !i.account_name.includes("Money Market") && !i.account_name.includes("CD")){
      return(acc + i.amount)
    } else { 
      return acc
    }
  }, 0)

  let saved = ((moneyIn - moneyOut) / moneyIn )*100
  saved = saved < 0 ? 0 : saved

  return (
    <div> 
    <h6> Summary: </h6>
      <div className="list-group">
        <div className="list-group-item list-group-item-action active" style={{"background": "#cfd5db", "border": "0px"}}>
          <div className="list-group-item list-group-item-action">
              <ToggleMonth />
              <h6>money in: ${moneyIn}</h6>
              <h6>money out: ${moneyOut}</h6>
              <h6>money saved: ${moneyIn - moneyOut}</h6>
              <h6>percent saved: {saved}%</h6>
              <button type="button" class="btn btn-primary btn-lg btn-block" onClick={props.setShowCategories}> Show Categories </button>
          </div>
        </div>
      </div>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    // transactions: state.linkReducer.monthTransactions,
    transactions: state.linkReducer.monthDisplay,


  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    setShowCategories: () => dispatch({type: "setShowCategories"})
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(MonthSummary)