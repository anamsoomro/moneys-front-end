import React from "react"
import MonthPie from "../components/MonthPie";
import TransactionPanel from "../components/TransactionPanel";
import {connect} from 'react-redux'
import MonthGauge from "../components/MonthGauge";

const container = {
  overflow: "hidden",
  width: "100%",
}

const left = {
  "float": "left",
  "width": "50%",
  "background-color": "orange",
  // "padding-bottom": "500em",
  // "margin-bottom": "-500em"
}

const right = {
  "float": "left",
  "width": "50%",
  // "margin-right": "-1px",
  "background-color": "red",
  // "padding-bottom": "500em",
  // "margin-bottom": "-500em"
}


const Month = (props) => {
  return (
    <div>
      <div style={container}> 
        <div style={left}>
          <MonthGauge />
        </div>
        <div style={right}>
          <MonthPie  />
        </div>
      </div>
      <div>
        <TransactionPanel transactions={props.transactions}/>
      </div>
    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    transactions: state.linkReducer.monthTransactions,
  }
}

export default connect(mapStateToProps)(Month);


