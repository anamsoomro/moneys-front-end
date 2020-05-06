import React from "react"
import { connect } from 'react-redux'
import ToggleMonth from '../components/ToggleMonth'

const MonthSummary = (props) => {

  const formatNumber = (num, percent = null) => {
    if (percent){
      return  num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '%'
    }
    else {
      return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
  }

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
      {/* <div className="list-group"> */}
        {/* <div className="list-group-item list-group-item-action active" style={{"background": "#cfd5db", "border": "0px"}}> */}
          {/* <div className="list-group-item list-group-item-action" style={{background: "#3d3d3d", color: "white"}}> */}
          {/* <div className="list-group-item list-group-item-action" style={{background: "#white", color: "black"}}> */}
          <div>
              <h4>INCOME: {formatNumber(moneyIn)}</h4>
              <h4>SPENT: {formatNumber(moneyOut)}</h4>
              <h4>SAVED: {formatNumber(moneyIn - moneyOut)}</h4>
              {/* <h4 style={{position: "relative", left: "217px", top: "-336px"}}> {formatNumber(saved, "percent")}</h4> */}
              <h4 > {formatNumber(saved, "percent")}</h4>
              <button type="button" class="btn btn-primary btn-lg btn-block" onClick={props.setShowCategories} style={{color: "white", backgroundColor: "black"}}> Show Categories </button>
          </div>
        </div>
      // </div>
    // </div>
  )

}

const mapStateToProps = (state) => {
  return {
    // transactions: state.linkReducer.monthTransactions,
    // transactions: state.linkReducer.monthDisplay,
    transactions: state.linkReducer.monthCalcs,



  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    setShowCategories: () => dispatch({type: "setShowCategories"})
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(MonthSummary)