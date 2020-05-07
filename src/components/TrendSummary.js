import React from "react"
import { connect } from 'react-redux'

const TrendSummary = (props) => {

  const formatNumber = (num) => {
    return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }


  return (
    <div>

      <i className="small material-icons" style={{color: "#99cc00"}}>brightness_1</i>
      <h4>net worth: {formatNumber(props.overall[5] + props.mOverall * 6)} </h4><br/>
      
      <i className="small material-icons" style={{color: "#ffc400"}}>brightness_1</i>
      <h4>savings: {formatNumber(props.savings[5] + props.mSaving * 6)} </h4><br/>
      
      <i className="small material-icons" style={{color: "#d84315"}}>brightness_1</i>
      <h4>debt: {formatNumber(props.debt[5] + props.mDebt * 6)} </h4><br/>
      
      <i className="small material-icons" style={{color: "#0055ff"}}>brightness_1</i>
      <h4>investment: {formatNumber(props.investment[5] + props.mInvestment * 6)}</h4><br/>

      <button type="button" className="btn btn-primary btn-lg btn-block text-white" onClick={()=> props.resetTrends(props.userView)} style={{backgroundColor: "#3E3E3E"}}> 
        RESET
      </button>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {

    mSaving: state.trendReducer.display.mSaving,
    mDebt: state.trendReducer.display.mDebt,
    mOverall: state.trendReducer.display.mOverall,
    mInvestment: state.trendReducer.display.mInvestment,
    savings: state.trendReducer.display.saving,
    overall: state.trendReducer.display.overall,
    debt: state.trendReducer.display.debt,
    investment: state.trendReducer.display.investment,

    userView: state.linkReducer.userView
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    resetTrends: ( (userView) => dispatch ({type: "resetTrends", userView: userView}))

  }
}

export default connect(mapStateToProps, mapDispacthToProps)(TrendSummary)