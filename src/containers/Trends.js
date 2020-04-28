import React from "react"
import LineChart from '../components/LineChart'
import { connect } from 'react-redux'

const Trends = (props) => {

  const handleTypeFilter = (event) => {
    props.setTypeView(event.target.id)
  }

  return (
      <div> 
        <button id="depository" onClick={handleTypeFilter}> liquid funds </button>
        <button id="investment" onClick={handleTypeFilter}> investments </button>
        <button id="debt" onClick={handleTypeFilter}> debt </button>
        <LineChart />
      </div>
  )
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    setTypeView: ((filter) => dispatch({type: "setTypeView", filter: filter})),
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(Trends)



