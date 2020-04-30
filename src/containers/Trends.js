import React from "react"
import LineChart from '../components/LineChart'
import { connect } from 'react-redux'
import NoAccounts from "../components/NoAccounts"
import AdjustTrends from "../components/AdjustTrends"

const Trends = (props) => {

  const handleTypeFilter = (event) => {
    props.setTypeView(event.target.id)
  }

  return (
      props.accounts.length 
      ? <div> 
          <button id="depository" onClick={handleTypeFilter}> liquid funds </button>
          <button id="investment" onClick={handleTypeFilter}> investments </button>
          <button id="debt" onClick={handleTypeFilter}> debt </button>
          <button id="overall" onClick={handleTypeFilter}> overall </button>
          <LineChart />
          <AdjustTrends />
        </div>
      : <NoAccounts />
  )
}

const mapStateToProps = (state) => {
  return {
    accounts: state.linkReducer.accounts
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    setTypeView: ((filter) => dispatch({type: "setTypeView", filter: filter})),
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(Trends)



