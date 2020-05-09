import React from "react"
import { connect } from 'react-redux'
import {useState} from 'react'

const AdjustTrends = (props) => {

  const increaseTrend = (event) => {
    let amount
    switch(event.target.id){
      case "mSaving":
        amount = props.mSaving + 100
        props.adjustSavings(amount)
        break
      case "mDebt":
        amount = props.mDebt - 100
        props.adjustDebt(amount)
        break 
    }
  }

  const decreaseTrend = (event) => {
    let amount
    switch(event.target.id){
      case "mSaving":
        amount = props.mSaving - 100
        props.adjustSavings(amount)
        break
      case "mDebt":
        amount = props.mDebt + 100
        props.adjustDebt(amount)
        break 
    }
  }

  const formatNumber = (num) => {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  return (
    <div className="row justify-content-center mb-5"> 

      <div className="btn-group" role="group"> 

        <div style={{margin: "0px 40px"}}>
          <h5 style={{display: "inline"}}> avg. monthly savings: {formatNumber(props.mSaving)} </h5>
          <button type="button" className="btn btn-secondary" id="mSaving" onClick={increaseTrend} style={{backgroundColor: "#3E3E3E"}}>+</button>
          <button type="button" className="btn btn-secondary" id="mSaving" onClick={decreaseTrend} style={{backgroundColor: "#3E3E3E"}}>-</button>
        </div>

        <div style={{margin: "0px 40px"}}> 
          <h5 style={{display: "inline"}}> avg. monthly debt payments: {formatNumber(-props.mDebt)} </h5>
          <button type="button" className="btn btn-secondary" id="mDebt" onClick={increaseTrend} style={{backgroundColor: "#3E3E3E"}}>+</button>
          <button type="button" className="btn btn-secondary" id="mDebt" onClick={decreaseTrend} style={{backgroundColor: "#3E3E3E"}}>-</button>
        </div>
      </div>
     </div> 
  )
}

const mapStateToProps = (state) => {
  return {

    mSaving: state.trendReducer.display.mSaving,
    mDebt: state.trendReducer.display.mDebt,
    mOverall: state.trendReducer.display.mOverall,
    savings: state.trendReducer.display.saving,
    overall: state.trendReducer.display.overall,
    debt: state.trendReducer.display.debt,
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    adjustSavings: ( (mSavings) => dispatch({type: "adjustSavings", mSavings: mSavings})),
    adjustDebt: ( (mDebt) => dispatch({type: "adjustDebt", mDebt: mDebt})),
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(AdjustTrends)