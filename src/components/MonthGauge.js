import React from "react"
import { connect } from 'react-redux'
import { Doughnut, Pie } from 'react-chartjs-2'
import ToggleMonth from "./ToggleMonth"

const MonthGauge = (props) => { 

  let today = new Date
  let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  let currentMonth = month[today.getMonth()]

  let moneyIn = props.transactions.reduce( (acc, i) => {
    if (i.amount < 0 ){ //  "transaction with a negative amount represents money flowing into the account"
    return (-i.amount + acc)
    } else if(i.account_name.includes("Money Market") && i.amount > 0){ // this doesnt align with above statement. review. 
    return (i.amount + acc)
    } else if(i.account_name.includes("CD") && i.amount > 0 ){
      return (i.amount + acc)
    } else { 
      return acc
    }
  }, 0)

  let moneyOut = props.transactions.reduce ( (acc, i) => {
    if(i.amount > 0 && !i.account_name.includes("Money Market") && !i.account_name.includes("CD")){
      return(acc + i.amount)
    } else { 
      return acc
    }
  }, 0)

  let moneyLeft = moneyIn - moneyOut
  let moneyNeg = moneyOut - moneyIn
  let saved = ((moneyIn - moneyOut) / moneyIn) * 100
  saved = saved < 0 ? 0 : saved
  let values = [moneyIn, moneyOut, moneyLeft, moneyNeg]

  const norm = (arr) => { 
    let min = arr.slice().sort((a, b) => a < b ? -1 : 1).shift()
    let positive = arr.map(x => x - min)
    let max = positive.slice().sort((a, b) => a < b ? -1 : 1).pop()
    let norm = positive.map(x => x/max)
    return norm
  }

  const data = {
    labels: ['money in', 'money out', 'money left', 'money negative'],
    datasets: [
      {
        label: 'out',
        backgroundColor: ['#B21F00', '#ff3300'],
        labels: ['money in', 'money out', 'money left', 'money negative'],
        data: [null, norm(values)[1], norm(values)[2], null],
        borderWidth: 0
      },
      {
        label: 'in',
        backgroundColor: ['#0033cc'],
        labels: ['money in', 'money out', 'money left', 'money negative'],
        data: [norm(values)[0], null, null, norm(values)[3]],
        borderWidth: 0
      }
    ]
  }

  const options = {
    title:{
      display:false,
      text: currentMonth,
      fontSize:20
    },
    legend:{
      display:false,
      position:'right'
    },
    rotation: 1 * Math.PI, 
    circumference: 1 * Math.PI ,
    maintainAspectRatio: false,

    tooltips: {enabled: false},
    hover: {mode: null},
  }

  return (
    <div>
      <Doughnut data={data} options={options} width={150} height={300} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    transactions: state.linkReducer.monthDisplay,

  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(MonthGauge)