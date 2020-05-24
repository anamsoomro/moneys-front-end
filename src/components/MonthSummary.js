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
    } else if(i.account_name.includes("Money Market") && i.amount > 0){ // this doesnt align with above statement. review. 
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

  const toggleCategories = () => {
    props.setShowCategories()
  }

  return (
    <div> 
      <div>
          <i className="small material-icons" style={{color: "#0033cc"}}>brightness_1</i>
          <h4>INCOME: {formatNumber(moneyIn)}</h4><br/>

          <i className="small material-icons" style={{color: "#ff3300"}}>brightness_1</i>
          <h4>SPENT: {formatNumber(moneyOut)}</h4><br/>

          <h4>SAVED: {formatNumber(moneyIn - moneyOut)}</h4><br/>
          <h4 > {formatNumber(saved, "percent")} SAVED</h4>
          <button type="button" className="btn btn-primary btn-lg btn-block  text-white" onClick={toggleCategories} style={{backgroundColor: "#3E3E3E"}}> 
            { props.showCategories ? "show gauge" : "show categories" }
          </button>
      </div>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    transactions: state.linkReducer.monthCalcs,

    showCategories: state.linkReducer.showCategories
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    setShowCategories: () => dispatch({type: "setShowCategories"})
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(MonthSummary)