import React from "react"
import { connect } from 'react-redux'
import {Bar, Doughnut} from 'react-chartjs-2'

const MonthChart = (props) => { // i just want to pass it different props 
  
  let today = new Date
  let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  let currentMonth = month[today.getMonth()]

  let moneyIn = 400 // this needs to actually come in from store and be calculated
  let moneyOut = 200


  const data = {
    labels: ['money in', 'money out', 'money left'],
    datasets: [
      {
        label: 'out',
        backgroundColor: ['#B21F00', '#175000'],
        data: [null, moneyOut, moneyIn-moneyOut], // what if that net is negative
        borderWidth: 0
      },
      {
        label: 'in',
        backgroundColor: ['#B21F00'],
        data: [moneyIn],
        borderWidth: 0
      }
    ]
  }

  const options = {
    title:{
      display:true,
      text: currentMonth,
      fontSize:20
    },
    legend:{
      display:true,
      position:'right'
    },
    rotation: 1 * Math.PI, 
    circumference: 1 * Math.PI ,
    maintainAspectRatio: false
  }

  return (
    <div>
    <Doughnut data={data} options={options} width={300} height={300} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    transactions: state.linkReducer.monthTransactions
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    dispatch
    // inc: (() => dispatc({type: "inc"}))
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(MonthChart)