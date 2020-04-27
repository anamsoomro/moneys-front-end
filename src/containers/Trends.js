import React from "react"
import LineChart from '../components/LineChart'
import { connect } from 'react-redux'




const Trends = (props) => {

  const handleTypeFilter = (event) => {
    props.setTypeView(event.target.id)
  }

  return (
      <div> 
        {/* I am Trends */}
        {/* <p> savings, debt, investments </p> */}
        {/* <p> the linear average over 6 months, projected out 6 months </p> */}
        <button id="available" onClick={handleTypeFilter}> liquid funds </button>
        <button id="investments" onClick={handleTypeFilter}> investments </button>
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



