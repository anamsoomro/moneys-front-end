import React, { useEffect } from "react"
import LineChart from '../components/LineChart'
import { connect } from 'react-redux'
import NoAccounts from "../components/NoAccounts"
import AdjustTrends from "../components/AdjustTrends"
import { usePromiseTracker } from "react-promise-tracker";
import PreLoader from "../components/PreLoader"
import TrendSummary from '../components/TrendSummary'
import ErrorBoundary from "../components/ErrorBoundary"

const Trends = (props) => {

  const handleTypeFilter = (event) => {
    props.setTypeView(event.target.id)
  }
  const { promiseInProgress } = usePromiseTracker()

  return (
    promiseInProgress
    ? <PreLoader />
    : props.accounts.length 
      ? <div className="trends-grid-container "> 
          <ErrorBoundary>
        
        <div className="trends-toggle">

          <div className="row justify-content-center mb-4 mt-3" data-aos="fade-up">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label className="btn btn-primary active overall " id="overall" onClick={handleTypeFilter} >
                <input type="radio" checked /> overall
              </label>
              <label className="btn btn-primary net-worth"  id="net-worth" onClick={handleTypeFilter}>
                <input type="radio" checked /> net worth
              </label>
              <label className="btn btn-primary depository" id="depository" onClick={handleTypeFilter}>
                <input type="radio"  /> liquid funds
              </label>
              <label className="btn btn-primary investment" id="investment" onClick={handleTypeFilter}>
                <input type="radio"  /> investments
              </label>
              <label className="btn btn-primary debt" id="debt" onClick={handleTypeFilter}>
                <input type="radio"  /> debt
              </label>
            </div>
            </div>
            
            <div className="row justify-content-center">
              <h4 style={{letterSpacing: "0.1em"}}>ON CURRENT TRENDS, IN 6 MONTHS YOU WILL HAVE... </h4>
            </div>

          </div>

          {/* <button id="depository" onClick={handleTypeFilter}> liquid funds </button>
          <button id="investment" onClick={handleTypeFilter}> investments </button>
          <button id="debt" onClick={handleTypeFilter}> debt </button>
          <button id="overall" onClick={handleTypeFilter}> overall </button> */}
            <div className="trends-chart">
              <LineChart />
            </div>
            <div className="trends-summary">
              <TrendSummary />
            </div>
            <div className="trends-controls">
            <AdjustTrends />
            </div>
          </ErrorBoundary>
        </div>
      : <NoAccounts />
  )
}

const mapStateToProps = (state) => {
  return {
    accounts: state.linkReducer.accounts,
    account: state.authReducer.account,
    userView: state.linkReducer.userView
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    setTypeView: ((filter) => dispatch({type: "setTypeView", filter: filter})),
    storeHistory: (user1, user2) => dispatch({type: "storeHistory", user1: user1, user2: user2}),
    handleTrendDisplay: (userView) => dispatch({type: "handleTrendDisplay", userView: userView})
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(Trends)



