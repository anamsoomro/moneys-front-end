import React from "react"
import { connect } from 'react-redux'
import {useState} from 'react'

const AdjustTrends = (props) => {

  const increaseTrend = (event) => {
    let amount
    switch(event.target.id){
      case "mSaving":
        amount = props.mSaving + 50
        props.adjustSavings(amount)
        break
      case "mDebt":
        amount = props.mDebt - 50
        props.adjustDebt(amount)
        break 
    }
  }

  const decreaseTrend = (event) => {
    let amount
    switch(event.target.id){
      case "mSaving":
        amount = props.mSaving - 50
        props.adjustSavings(amount)
        break
      case "mDebt":
        amount = props.mDebt + 50
        props.adjustDebt(amount)
        break 
    }
  }

  const formatNumber = (num) => {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  return (
    <div> 
      <div className="btn-group" role="group"  > 
        <div className="row justify-content-center mb-5" data-aos="fade-up">
          <h5 style={{display: "inline"}}> MONTHLY SAVING: {formatNumber(props.mSaving)} </h5>
          <button type="button" className="btn btn-secondary" id="mSaving" onClick={increaseTrend}>+</button>
          <button type="button" className="btn btn-secondary" id="mSaving" onClick={decreaseTrend}>-</button>
        </div>
        <div> 
          <h5 style={{display: "inline"}}> MONTHLY DEBT PAYMENT: {formatNumber(-props.mDebt)} </h5>
          <button type="button" className="btn btn-secondary" id="mDebt" onClick={increaseTrend}>+</button>
          <button type="button" className="btn btn-secondary" id="mDebt" onClick={decreaseTrend}>-</button>
        </div>
        <button type="button" className="btn btn-secondary" onClick={()=> props.resetTrends(props.userView)}>reset</button>
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

    userView: state.linkReducer.userView
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    adjustSavings: ( (mSavings) => dispatch({type: "adjustSavings", mSavings: mSavings})),
    adjustDebt: ( (mDebt) => dispatch({type: "adjustDebt", mDebt: mDebt})),
    resetTrends: ( (userView) => dispatch ({type: "resetTrends", userView: userView}))
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(AdjustTrends)