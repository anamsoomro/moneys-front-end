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
        backgroundColor: ['#B21F00', '#175000'],
        // data: [null, moneyOut, moneyILeft], 
        data: [null, norm(values)[1], norm(values)[2]],
        borderWidth: 0
      },
      {
        label: 'in',
        backgroundColor: ['#B21F00'],
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
    maintainAspectRatio: false
  }

  return (
    <div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <ToggleMonth />
              <span class="card-title">Summary</span>
              <h6>money in: ${moneyIn}</h6>
              <h6>money out: ${moneyOut}</h6>
              <h6>money saved: ${moneyIn - moneyOut}</h6>
              <h6>percent saved: {saved}%</h6>
            </div>
          </div>
        </div>
      </div>

      <Doughnut data={data} options={options} width={200} height={100} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    transactions: state.linkReducer.monthTransactions,
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(MonthGauge)