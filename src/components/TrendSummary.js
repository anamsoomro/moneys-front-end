import React from "react"
import { connect } from 'react-redux'

const TrendSummary = (props) => {

  const formatNumber = (num) => {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }


  return (

    // <div class="card blue-grey darken-1">
    <div class="card black">
        <div class="card-content white-text" style={{backgroundColor: "#9B9B9B", border:"0px"}}>
          <span class="card-title">in 6 months youre set to have...</span>
         <h5 style={{backgroundColor: '	#99cc00'}}> {formatNumber(props.overall[5] + props.mOverall * 6)} in net worth</h5>
         <h5 style={{backgroundColor: '#ffc400'}}> {formatNumber(props.savings[5] + props.mSaving * 6)} in savings</h5>
         <h5 style={{backgroundColor: '#d84315'}}> {formatNumber(props.debt[5] + props.mDebt * 6)} in debt</h5>
         <h5 style={{backgroundColor: '#0055ff'}}> something in investments</h5>

         {/* <h5> {formatNumber(props.savings[5] + props.mDebt * 6)} in debt</h5> */}

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
    dispatch
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(TrendSummary)