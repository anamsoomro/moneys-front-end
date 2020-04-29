import React, { useEffect } from "react"
import { connect } from 'react-redux'
import Link from "./Link";
import Avatar from '@material-ui/core/Avatar'





const AccountsPanel = (props) => {



  const showAccount = (account) => {
    //  console.log(account)
    return(
      <div className="list-group-item list-group-item-action" key={account.account_id}  onClick={ () => handleAccountFilter(account.account_id)}>
        <div>{account.name}</div>
        <span className="badge">${account.balances.current}</span>
        <div>subtype: {account.subtype}</div>
        <div>type: {account.type}</div>
        {/* <div>account_id: {account.account_id}</div> */}
        <div> {account.user.username}</div>
        <Avatar style={{"background": localStorage.user1 === account.user.username ? "#c28c80" : "#b0c06f"}}>
          {account.user.username[0]}
        </Avatar>
        <div>{account.institution}</div>
      </div>
    )
  }

  const handleTypeFilter = (event) => {
    //  instead of sending a type here. send an array of account ids that fall under that type 
    // that way transactions can be filtered too 
    props.setTypeView(event.target.id)
    props.handleDisplay()
  }

  const handleAccountFilter = (account_id) => {
    props.setAccountView(account_id)
    props.handleDisplay()
  }


  return (
    <div className="acc" > 
    <h6>Accounts: </h6>
    <div className="list-group">
      <div className="list-group-item list-group-item-action active" style={{"background": "#cfd5db", "border": "0px"}}>
        <Link text={"+bank"}/>
        <div>
          <button id="depository" onClick={handleTypeFilter}> liquid funds </button>
          <button id="investment" onClick={handleTypeFilter}> investments </button>
          <button id="debt" onClick={handleTypeFilter}> debt </button>
        </div>
        {props.accounts.map( account => showAccount(account))}
      </div>
    </div>
    </div >
  )
  
}

const mapStateToProps = (state) => {
  return {
    accounts: state.linkReducer.accountsDisplay
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    setTypeView: ((filter) => dispatch({type: "setTypeView", filter: filter})),
    setAccountView: ( (filter) => dispatch({type: "setAccountView", filter: filter}) ),
    handleDisplay: ( () => dispatch({type: "handleDisplay"}))
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(AccountsPanel)