import React from "react"
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const TransactionPanel = (props) => {

  const SmallAvatar = withStyles((theme) => ({
    root: {
      width: 22,
      height: 22,
      border: `2px solid ${theme.palette.background.paper}`,
    },
  }))(Avatar);


  const showTransaction = (transaction) => { 

    return (                                                                                                                                                 
      // <div className="list-group-item list-group-item-action" >
      //   <div> {transaction.name}</div>
      //   <span className="badge">${transaction.amount}</span>
      //   <div> {transaction.account_name}</div> 
      //   <div>{transaction.date}</div>
      //   <div>{transaction.user.username}</div>
      //   <Avatar style={{"background": localStorage.user1 === transaction.user.username ? "#c28c80" : "#b0c06f"}}>
      //     {transaction.user.username[0]}
      //   </Avatar>
      //   <div>{transaction.institution}</div>
      // </div>

      <div className="list-group-item list-group-item-action" >
        <div class="transaction-grid-container">
          <div class="transaction-bank">
            <Badge overlap="circle" anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }} badgeContent={userAvatar(transaction)}>
              {bankAvatar(transaction.institution)}
            </Badge>
          </div>
          <div class="transaction-transaction">
            <div>{transaction.name} <span className="badge">${transaction.amount}</span></div>
            <div>{transaction.account_name}</div>
            <div>{transaction.date}</div>
          </div>
        </div>




      </div>
    )
  }


  const userAvatar = (transaction) => {
    return (
      <SmallAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" style={{background: localStorage.user1 === transaction.user.username ? "#c28c80" : "#b0c06f"}} >
        {transaction.user.username[0]}
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

  return (
    <div className="trans"> 
    <h6> Recent Transactions: </h6>
      <div className="list-group">
        <div className="list-group-item list-group-item-action active" style={{"background": "#cfd5db", "border":"0px"}}>
          {props.transactions.map( transaction => showTransaction(transaction))}
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    // transactions: state.linkReducer.transactionsDisplay,
    state
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(TransactionPanel)