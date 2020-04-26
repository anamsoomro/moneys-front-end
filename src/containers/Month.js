import React from "react"
import MonthTransactions from '../components/MonthTransactions'
import MonthChart from "../components/MonthChart";

const Month = () => {
  return (
    <div> 
      <p> inner circle can be income, outer circle be how much spent, like a speedometer</p>
      <p> and than you can toggle between user 1, user 2 and both</p>
      <p> will show that months transactions below same will be toggled by user</p>
      <MonthChart />
      <MonthTransactions />
    </div>

  )
}

export default Month;


