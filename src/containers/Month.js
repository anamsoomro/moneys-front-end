import React from "react"
import MonthTransactions from '../components/MonthTransactions'
import MonthChart from "../components/MonthChart";

const Month = () => {
  return (
    <div> 
      <p> inner circle can be income, outer circle be how much spent, like a speedometer</p>
      <p> maybe show if they are above on or below trend for saving</p>
      <MonthChart />
      <MonthTransactions />
    </div>
  )
}

export default Month;


