import React from "react"
import { connect } from 'react-redux'
import Link from './Link'
import BalanceDonut from './BalanceDonut'

const BalancePanel = (props) => {

  const calcBalance = () => {
      let balance = props.accounts.reduce( (acc, i) => { 
        if(i.type === "credit" || i.type === "loan" ){ 
          return (acc - i.balances.current)
        } else if (i.type === "depository" ){ 
          return (acc + i.balances.current) 
        } else if (i.type === "investment"){ 
          return (acc + i.balances.current) 
        }else {
          return (acc + i.balances.current) 
        }
      }, 0)
      return balance
  }

  const handleTypeFilter = (event) => {
    if(event.target.id){
      props.setTypeView(event.target.id)
      props.handleDisplay()
    } else {
      props.setTypeView(null)
      props.handleDisplay()
    }}

    const formatNumber = (num) => {
      return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

  return (
    <div> 

      <div className="row justify-content-center mt-3" data-aos="fade-up" style={{margin: "0px"}}>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
    
          <label className="btn btn-primary active nett-worth" onClick={handleTypeFilter} >
            <input type="radio" checked /> net worth
          </label>
          <label className="btn btn-primary depository" id="depository" onClick={handleTypeFilter}>
            <input type="radio"  /> liquid funds
          </label>
          <label className="btn btn-primary investment" id="investment" onClick={handleTypeFilter}  >
            <input type="radio"  /> investments
          </label>
          <label className="btn btn-primary debt" id="debt" onClick={handleTypeFilter}>
            <input type="radio"  /> debt
          </label>
          <label className="btn btn-primary grey darken-4" >
             <Link text="+BANK" styling={{background: "transparent", border: "0px", color: "#fff"}} />
          </label>
        </div>
      </div>  

      <h1 style={{textAlign: "center", display: "block", margin: "5px"}}>{formatNumber(calcBalance())}</h1>
      <BalanceDonut />
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    accounts: state.linkReducer.accountsDisplay,
    type: state.linkReducer.typeView
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    handleDisplay: ( () => dispatch({type: "handleDisplay"})),
    setTypeView: ((filter) => dispatch({type: "setTypeView", filter: filter})),

  }
}

export default connect(mapStateToProps, mapDispacthToProps)(BalancePanel)