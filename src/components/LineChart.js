import React from "react"
import { connect } from 'react-redux'
import {Line} from 'react-chartjs-2'

const LineChart = (props) => { // i just want to pass it different props 

  let today = new Date
  // let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  let month = [ "July", "August", "September", "October", "November", "December", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March", "April", "May"]
  let lastSix = month.slice( today.getMonth() + 6 - 6 , today.getMonth() + 6)
  let nextSix = month.slice( today.getMonth() + 6, today.getMonth() + 6 + 6)  
  // get data for last six months 

  const data = {
    labels: [...lastSix, ...nextSix],
    datasets: [
      {
        label: 'Savings',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgb(51, 153, 102)',
        borderColor: 'rgb(51, 153, 102)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56]
      }, 
      {
        label: 'Debt',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgb(102, 153, 255)',
        borderColor: 'rgb(102, 153, 255)',
        borderWidth: 2,
        data: [67, 64, 62, 60, 58]
      }, 
      {
        label: 'Investments',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgb(230, 184, 0)',
        borderColor: 'rgb(230, 184, 0)',
        borderWidth: 2,
        data: [12, 15, 17, 12, 12]
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