import React from "react"
import { connect } from 'react-redux'
import Link from './Link'
import BalanceDonut from './BalanceDonut'

const BalancePanel = (props) => {

  const calcBalance = () => {
      let balance = props.accounts.reduce( (acc, i) => { 
        if(i.type === "credit" || i.type === "loan" ){ // debt
          return (acc - i.balances.current)
        } else if (i.type === "depository" ){ //liquid
          return (acc + i.balances.current) 
        } else if (i.type === "investment"){ //investment
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
      <div className="row justify-content-center mb-5" data-aos="fade-up">
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label class="btn btn-primary active" onClick={handleTypeFilter} >
            <input type="radio" checked /> overall
          </label>
          <label class="btn btn-primary" id="depository" onClick={handleTypeFilter}>
            <input type="radio"  /> liquid funds
          </label>
          <label class="btn btn-primary" id="investment" onClick={handleTypeFilter}  >
            <input type="radio"  /> investments
          </label>
          <label class="btn btn-primary" id="debt" onClick={handleTypeFilter}>
            <input type="radio"  /> debt
          </label>
          <label class="btn btn-primary grey darken-4" >
          {/* <label class="btn btn-primary blue-grey " > */}

             <Link text="+BANK" styling={{background: "transparent", border: "0px", color: "#fff"}} />
          </label>
        </div>
      </div>  
      <h1 style={{textAlign: "center", display: "inline"}}>{formatNumber(calcBalance())}</h1>
      <div style={{width: "50%", float: "left"}}>
        <BalanceDonut />
      </div>
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