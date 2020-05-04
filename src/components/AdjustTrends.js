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

  return (
    <div> 
      <div className="btn-group" role="group" > 
        <div>
          <h5 style={{display: "inline"}}> Monthly Savings: ${props.mSaving} </h5>
          <button type="button" className="btn btn-secondary" id="mSaving" onClick={increaseTrend}>+</button>
          <button type="button" className="btn btn-secondary" id="mSaving" onClick={decreaseTrend}>-</button>
        </div>

        <div> 
          <h5 style={{display: "inline"}}> Moonthly Debt Payments: ${-props.mDebt} </h5>
          <button type="button" className="btn btn-secondary" id="mDebt" onClick={increaseTrend}>+</button>
          <button type="button" className="btn btn-secondary" id="mDebt" onClick={decreaseTrend}>-</button>
        </div>

        <button type="button" className="btn btn-secondary" onClick={()=> props.resetTrends(props.userView)}>reset</button>

        <div className="list-group">
        <div className="list-group-item list-group-item-action active" style={{"background": "#cfd5db", "border": "0px"}}>
          <div className="list-group-item list-group-item-action">
          <h5>with these trends, in 6 months youre set to...</h5>
          <h5> have a net worth of ${props.overall[5] + props.mOverall * 6}</h5>
          <h5> have ${props.savings[5] + props.mSaving * 6} in savings</h5>
          <h5> have ${props.debt[5] + props.mDebt * 6} in debt</h5>
          </div>
        </div>
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