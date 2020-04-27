import React from "react"
import { connect } from 'react-redux'
import {Line} from 'react-chartjs-2'

const LineChart = (props) => { // i just want to pass it different props 

  let today = new Date
  let month = [ "July", "August", "September", "October", "November", "December", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March", "April", "May"]
  let lastSix = month.slice( today.getMonth() + 6 - 6 , today.getMonth() + 6)
  let nextSix = month.slice( today.getMonth() + 6, today.getMonth() + 6 + 6)  

  let savings = [2000, 2200, 2400, 2600, 2600, 2650] // this needs to be actual info.
  let debt = [10000, 9500, 9000, 8500, 8000, 7500] // the current month will also be considered as a projected month
  let investments = [4000, 4100, 3900, 3700, 3750, 3800] 


  

  const project = (arr) => {
    // y − y1 = m(x − x1)
    // mMonth = 1 / change in saving in one month
    // m = average all the mMonth's
    // projected = [ m*1, m*2, m*3, m*4, m*5, m*6]
    // oh this same as doing m over six months
    let mSixMonths = (arr[5] - arr[0]) / 6
    let projected = []
    let x
    for (x =0; x < 7; x++) { // 1 7 instead of 0 6 to account for current month on trend
      // y = mx + b
      projected.push(arr[5] + x * mSixMonths)
    }
    return projected
  }
  
  const data = {
    labels: [...lastSix, ...nextSix],
    datasets: [
      {
        label: 'Savings',
        fill: false,
        backgroundColor: 'rgb(51, 153, 102)',
        borderColor: 'rgb(51, 153, 102)',
        borderWidth: 2,
        data: [...savings],
        lineTension: 0
      }, 
      {
        label: 'Savings Projected',
        fill: false,
        backgroundColor: 'rgb(51, 0, 102)',
        borderColor: 'rgb(51, 0, 102)',
        borderWidth: 2,
        data: [null,null,null,null,null, ...project(savings)],
        lineTension: 0
      }, 

      {
        label: 'Debt',
        fill: false,
        backgroundColor: 'rgb(102, 153, 255)',
        borderColor: 'rgb(102, 153, 255)',
        borderWidth: 2,
        data: [...debt],

        lineTension: 0

      }, 
      {
        label: 'Debt Projected',
        fill: false,
        backgroundColor: 'rgb(102, 0, 255)',
        borderColor: 'rgb(102, 0, 255)',
        borderWidth: 2,
        data: [null,null,null,null,null, ...project(debt)],


        lineTension: 0

      }, 
      {
        label: 'Investments',
        fill: false,
        backgroundColor: 'rgb(230, 184, 0)',
        borderColor: 'rgb(230, 184, 0)',
        borderWidth: 2,
        data: [...investments],
        lineTension: 0

      }, 
      {
        label: 'Investments Projected',
        fill: false,
        backgroundColor: 'rgb(230, 0, 0)',
        borderColor: 'rgb(230, 0, 0)',
        borderWidth: 2,
        data: [null,null,null,null,null, ...project(investments)],

        lineTension: 0

      }, 

    ]
  }

  const options = {
    title:{
      display:true,
      text: "trends",
      fontSize:20
    },
    legend:{
      display:true,
      position:'right'
    },
    maintainAspectRatio: false
  }

  return (
    <div>
    <Line data={data} options={options} width={200} height={400} />
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
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(LineChart)