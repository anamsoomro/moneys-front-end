import React from "react"
import { connect } from 'react-redux'

const BalancePanel = (props) => {

  const calcBalance = () => {
      let accounts
      // props.filter can be "depository", "credit", "loan", "investment", default: "all"
      if(props.filter === "all"){
        // this needs to make credit and loans negative though
        accounts = props.accounts
      } else {
        accounts = props.accounts.filter(account => account.type === props.filter)
      }
      let balance = accounts.reduce( (acc, i) => { return (acc + i.balances.current) }, 0)
      // now iterate through all accounts and add them up 
      // current = amount of funds in the account, available = amount of funds available to be withdrawn
      // need to apply negatives on some of them
      return balance
  }

  return (
    // <div className="bal"> 
    <div className="list-group">
      <div className="list-group-item list-group-item-action active">
        Balance Panel
        <div className="list-group-item list-group-item-action">
          ${calcBalance()}
        </div>
      </div>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    accounts: state.linkReducer.accounts,
    filter: state.dashReducer.filter
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    // inc: (() => dispatch({type: "inc"}))
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(BalancePanel)