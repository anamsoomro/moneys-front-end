import React, { useEffect } from "react"
import { connect } from 'react-redux'
import Link from "./Link";
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const AccountsPanel = (props) => {

  const SmallAvatar = withStyles((theme) => ({
    root: {
      width: 22,
      height: 22,
      border: `2px solid ${theme.palette.background.paper}`,
    },
  }))(Avatar);

  const formatNumber = (num) => {
      // return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const showAccount = (account) => {
    return(
      // <div className="list-group-item list-group-item-action"   onClick={ () => handleAccountFilter(account.account_id)}>
      //   <div>{account.name}</div>
      //   <span className="badge">${account.balances.current}</span>
      //   <div>subtype: {account.subtype}</div>
      //   <div>type: {account.type}</div>
      //   <div> {account.user.username}</div>
      //   <Avatar style={{"background": localStorage.user1 === account.user.username ? "#c28c80" : "#b0c06f"}}>
      //     {account.user.username[0]}
      //   </Avatar>
      //   {bankLogo(account.institution)}
      //   <div>{account.institution}</div>
      // </div>

      <div className="list-group-item list-group-item-action"   onClick={ () => handleAccountFilter(account.account_id)} >
        <div class="account-grid-container">
          <div class="account-bank">
            <Badge overlap="circle" anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }} badgeContent={userAvatar(account)}>
              {bankAvatar(account.institution)}
            </Badge>
          </div>
          <div class="account-account">
            <div>{account.name} <span className="badge">{formatNumber(account.balances.current)}</span></div>
            <div>{account.institution} - {account.subtype}</div>
          </div>
        </div>
      </div>
    )
  }

  const userAvatar = (account) => {
    return (
      <SmallAvatar style={{background: localStorage.user1 === account.user.username ? "#618685" : "#034f84", fontSize: "small"}} >
        {account.user.username[0].toUpperCase()}
      </SmallAvatar>
    )
  }

  const bankAvatar = (bank) => {
    switch(bank) {
      case "Chase":
         return <Avatar src="https://vestar.com/wp-content/uploads/2015/05/chase-logo.jpg" />
         {/* <Avatar src="https://i.pinimg.com/originals/70/4a/1e/704a1e534e8dc0138eee3ded449555d5.png"/> */}
      case "Wells Fargo":
        return <Avatar src="https://www.logo-designer.co/wp-content/uploads/2019/01/2019-wells-fargo-bank-new-logo-design.png"/>
      case "Citi":
        return <Avatar src="https://lh3.googleusercontent.com/proxy/9sYIPRx6rR2betsyF7I3q5TjmlcKow3Iui_z0DsUWqRQwelH_lM9rEc4hb4aGVR1MO171uD2ke1eKs4hoZeY9erBjq2axYKArCselxt_VZmC"/>
      default:
        return <Avatar> tbd </Avatar>
    } 
  }

  // const handleTypeFilter = (event) => {
  //   // instead of sending a type here. send an array of account ids that fall under that type 
  //   // that way transactions can be filtered too 
  //   props.setTypeView(event.target.id)
  //   props.handleDisplay()
  // }

  const handleAccountFilter = (account_id) => {
    props.setAccountView(account_id)
    props.handleDisplay()
  }


  return (
    <div  > 
    <h6>Accounts: </h6>
    {/* <div className="list-group" style={{height: "80vh", overflow: "scroll"}}> */}
    <div className="list-group"  >
      {/* <div className="list-group-item list-group-item-action active" style={{"background": "#cfd5db", "border": "0px"}}> */}
      <div className="list-group-item list-group-item-action active" style={{"background": "#9b9b9b", "border": "0px"}}>
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