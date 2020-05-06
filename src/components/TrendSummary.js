import React from "react"
import { connect } from 'react-redux'

const TrendSummary = (props) => {

  const formatNumber = (num) => {
    return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }


  return (
    <div>

      <i class="small material-icons" style={{color: "#99cc00"}}>brightness_1</i>
      <h4>OVERALL: {formatNumber(props.overall[5] + props.mOverall * 6)} </h4><br/>
      
      <i class="small material-icons" style={{color: "#ffc400"}}>brightness_1</i>
      <h4>SAVINGS: {formatNumber(props.savings[5] + props.mSaving * 6)} </h4><br/>
      
      <i class="small material-icons" style={{color: "#d84315"}}>brightness_1</i>
      <h4>DEBT: {formatNumber(props.debt[5] + props.mDebt * 6)} </h4><br/>
      
      <i class="small material-icons" style={{color: "#0055ff"}}>brightness_1</i>
      <h4>INVESTMENTS, i should just take out </h4><br/>

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
    dispatch
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(TrendSummary)