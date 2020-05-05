import React, { useEffect } from "react"
import LineChart from '../components/LineChart'
import { connect } from 'react-redux'
import NoAccounts from "../components/NoAccounts"
import AdjustTrends from "../components/AdjustTrends"
import { usePromiseTracker } from "react-promise-tracker";
import PreLoader from "../components/PreLoader"
import TrendSummary from '../components/TrendSummary'

const Trends = (props) => {
  // useEffect(()=>{
  //   console.log("useEffect")
  //   let user1 = null
  //   let user2 = null
  //   // if (props.account.users[0]){ // for one user
  //   //   let u1Saving = [2000, 2200, 2400, 2600, 2600, 2650]
  //   //   let u1Debt = [10000, 9500, 9000, 8500, 8000, 7500] 
  //   //   let u1Investment = [4000, 4100, 3900, 3700, 3750, 3800] 
  //   //   let u1Overall = []
  //   //   for (let i = 0; i < u1Saving.length; i++){
  //   //     u1Overall.push( u1Saving[i] + u1Investment[i] - u1Debt[i] )
  //   //   }
  //   //   user1 = {
  //   //     saving: u1Saving, 
  //   //     debt: u1Debt, 
  //   //     investment: u1Investment, 
  //   //     overall: u1Overall,
  //   //     mSaving: (u1Saving[5] - u1Saving[0]) / 5,
  //   //     mDebt: (u1Debt[5] - u1Debt[0]) / 5,
  //   //     mInvestment: (u1Investment[5] - u1Investment[0]) / 5,
  //   //     mOverall: (u1Overall[5] - u1Overall[0]) / 5,
  //   //   }
  //   // } 
  //   if (props.account.users[1]){ // for second user
  //     let u2Saving = [2000, 2200, 2400, 2600, 2600, 2650]
  //     let u2Debt = [10000, 9500, 9000, 8500, 8000, 7500] 
  //     let u2Investment = [4000, 4100, 3900, 3700, 3750, 3800] 
  //     let u2Overall = []
  //     for (let i = 0; i < u2Saving.length; i++){
  //       u2Overall.push( u2Saving[i] + u2Investment[i] - u2Debt[i] )
  //     }
  //     user2 = {
  //       saving: u2Saving, 
  //       debt: u2Debt, 
  //       investment: u2Investment, 
  //       overall: u2Overall,
  //       mSaving: (u2Saving[5] - u2Saving[0]) / 5,
  //       mDebt: (u2Debt[5] - u2Debt[0]) / 5,
  //       mInvestment: (u2Investment[5] - u2Investment[0]) / 5,
  //       mOverall: (u2Overall[5] - u2Overall[0]) / 5,
  //     }
  //   } 
  //   // props.storeHistory(user1, user2)  // in trendReducer, set data
  //   // props.handleTrendDisplay(props.userView) // in trendReducer, set display 
  // }, [props.account]) // this should update if users get added

  const handleTypeFilter = (event) => {
    props.setTypeView(event.target.id)
  }
  const { promiseInProgress } = usePromiseTracker()

  return (
    promiseInProgress
    ? <PreLoader />
    : props.accounts.length 
      ? <div className="trends-grid-container "> 
        <div className="trends-toggle">
          <div className="row justify-content-center mb-5" data-aos="fade-up">
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
              <label class="btn btn-primary" id="summary" onClick={handleTypeFilter}>
                <input type="radio"  /> summary
              </label>
              <label class="btn btn-primary active" onClick={handleTypeFilter}>
                <input type="radio" id="overall" checked /> overall
              </label>
              <label class="btn btn-primary" id="depository" onClick={handleTypeFilter}>
                <input type="radio"  /> liquid funds
              </label>
              <label class="btn btn-primary" id="investment" onClick={handleTypeFilter}>
                <input type="radio"  /> investments
              </label>
              <label class="btn btn-primary" id="debt" onClick={handleTypeFilter}>
                <input type="radio"  /> debt
              </label>
            </div>
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



