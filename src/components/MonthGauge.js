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
    } else { 
      return acc
    }
  }, 0)

  let moneyOut = props.transactions.reduce ( (acc, i) => {
    if(i.amount > 0){
      return(acc + i.amount)
    } else { 
      return acc
    }
  }, 0)

  let moneyLeft = moneyIn - moneyOut
  let saved = (moneyIn - moneyOut) / moneyIn
  saved = saved < 0 ? 0 : saved
  let values = [moneyIn, moneyOut, moneyLeft]

  const norm = (arr) => { // arr = [in, out, left]
    let min = arr.slice().sort((a, b) => a < b ? -1 : 1).shift()
    let positive = arr.map(x => x - min)
    let max = positive.slice().sort((a, b) => a < b ? -1 : 1).pop()
    let norm = positive.map(x => x/max)
    norm = [...norm, norm[1]-norm[2]] // [in, out, left, netNeg]
    return norm
  }

  const data = {
    labels: ['money in', 'money out', 'money left', 'money negative'],
    datasets: [
      {
        label: 'out',
        backgroundColor: ['#B21F00', '#ff3300'],
        // data: [null, moneyOut, moneyILeft], 
        data: [null, norm(values)[1], norm(values)[2]],
        borderWidth: 0
      },
      {
        label: 'in',
        backgroundColor: ['#0033cc'],
        // data: [null, moneyOut, moneyILeft, moneyNeg], 
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
      <Doughnut data={data} options={options} width={200} height={360} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    // transactions: state.linkReducer.monthTransactions,
    transactions: state.linkReducer.monthDisplay,

  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(MonthGauge)