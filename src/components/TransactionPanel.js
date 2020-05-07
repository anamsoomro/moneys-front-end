import React from "react"
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

const TransactionPanel = (props) => {

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


  const showTransaction = (transaction) => { 
    // const style = {
    //   border: "solid #d9d9d9",
    //   borderWidth: "1px",
    //   borderRadius: "0px"
    // }
    return (                                                                                                                                                 
      <div className="list-group-item list-group-item-action white"  >
        <div className="transaction-grid-container">
          <div className="transaction-bank">
            <Badge overlap="circle" anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }} badgeContent={userAvatar(transaction)}>
              {bankAvatar(transaction.institution)}
            </Badge>
          </div>
          <div className="transaction-transaction">
            <div>{transaction.name} <span className="badge">{formatNumber(transaction.amount)}</span></div>
            <div style={{fontSize: "12px"}}>{transaction.account_name}</div>
            {props.showCategories && <div style={{fontSize: "12px"}}>{transaction.category[0]}</div>}
            <div style={{fontSize: "12px"}}>{transaction.date}</div>
          </div>
        </div>
      </div>
    )
  }


  const userAvatar = (transaction) => {
    return (
      <SmallAvatar  style={{background: localStorage.user1 === transaction.user.username ? "#618685" : "#034f84", fontSize: "small"}} >
        {transaction.user.username[0].toUpperCase()}
      </SmallAvatar>
    )
  }

  const bankAvatar = (bank) => {
    switch(bank) {
      case "Chase":
        return <Avatar src="https://vestar.com/wp-content/uploads/2015/05/chase-logo.jpg" />
      case "Wells Fargo":
        return <Avatar src="https://www.logo-designer.co/wp-content/uploads/2019/01/2019-wells-fargo-bank-new-logo-design.png"/>
      case "Citi":
        return <Avatar src="https://i2.wp.com/corporategrantsguide.com/wp-content/uploads/2020/03/citi_blue-logo.png?ssl=1"/>
      case "Bank of America":
        return <Avatar src="https://www.bankofamerica.com/content/images/ContextualSiteGraphics/Logos/en_US/logos/colored_flagscape-v2.png"/>
      case "Capital One":
        return <Avatar src="data:image/png;base64,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"/>
        // return <Avatar src="https://spring.capitalone.com/img/print-logo-blue.png"/>
      default:
        return <Avatar> tbd </Avatar>
    } 
  }

  return (
    <div className="trans" > 
      {/* <div className="list-group" style={{height: "80vh", overflow: "scroll"}}> */}
      <div className="list-group" >
        {/* <div className="list-group-item list-group-item-action active" style={{"background": "#9b9b9b", "border":"0px"}}> */}
        {/* <div className="list-group-item list-group-item-action active" style={{"background": "white", "border":"0px", overflow: "scroll", height: "80vh", padding: "0px"}}> */}
        <div className="list-group-item list-group-item-action active" style={{"background": "white", "border":"0px", overflow: "scroll", height: props.vh + "vh", padding: "0px"}}>
          {/* in dash I want vh to be 55 in month I want iti to be 80 */}
          {props.transactions.map( transaction => showTransaction(transaction))}
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    showCategories: state.linkReducer.showCategories
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(TransactionPanel)