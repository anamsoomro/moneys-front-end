import React from "react"
import { connect } from 'react-redux'

const BalancePanel = (props) => {

  const calcBalance = () => {
      let balance = props.accounts.reduce( (acc, i) => { 
        if(i.type === "credit" || i.type === "loan" ){
          return (acc - i.balances.current)
        } else if (i.type === "depository" || i.type === "investment"){ 
          return (acc + i.balances.current) 
        } else {
          // console.log("unexpected account type", i)
          return (acc + i.balances.current) 
        }
      }, 0)
      return balance
  }

  return (
    <div className="pan" > 
    <h5> Balance: </h5>
    <div className="list-group">
      <div className="list-group-item list-group-item-action active" style={{"background": "#cfd5db", "border": "0px"}}>
        <div className="list-group-item list-group-item-action">
          ${calcBalance()}
        </div>
      </div>
    </div>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    accounts: state.linkReducer.accountsDisplay,
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    // inc: (() => dispatch({type: "inc"}))
    dispatch
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(BalancePanel)