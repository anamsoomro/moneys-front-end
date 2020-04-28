import React from "react"
import { connect } from 'react-redux'
import {Line} from 'react-chartjs-2'

const LineChart = (props) => { // i just want to pass it different props 

  let today = new Date
  let month = [ "July", "August", "September", "October", "November", "December", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March", "April", "May"]
  let lastSix = month.slice( today.getMonth() + 6 - 6 , today.getMonth() + 6)
  let nextSix = month.slice( today.getMonth() + 6, today.getMonth() + 6 + 6)  

  let savingSeed = [2000, 2200, 2400, 2600, 2600, 2650] // this needs to be actual info.
  let debtSeed = [10000, 9500, 9000, 8500, 8000, 7500] // the current month will also be considered as a projected month
  let investmentSeed = [4000, 4100, 3900, 3700, 3750, 3800] 
  let overallSeed = []
  for (let i = 0; i < savingSeed.length; i++){
    overallSeed.push( savingSeed[i] + investmentSeed[i] - debtSeed[i] )
  }

  const project = (arr) => {
    let mSixMonths = (arr[5] - arr[0]) / 6
    let projected = []
    let x
    for (x =0; x < 7; x++) { 
      // y = mx + b
      projected.push(arr[5] + x * mSixMonths)
    }
    return projected
  }

  const depository = [
    {label: 'Savings',
     fill: false,
     backgroundColor: 'rgb(51, 153, 102)',
     borderColor: 'rgb(51, 153, 102)',
     borderWidth: 2,
     data: [...savingSeed],
     lineTension: 0}, 
    {label: 'Savings Projected',
     fill: false,
     backgroundColor: '#808080',
     borderColor: '#808080',
     borderWidth: 2,
     data: [null,null,null,null,null, ...project(savingSeed)],
     lineTension: 0}
  ]

  const debt = [
    {label: 'Debt',
     fill: false,
     backgroundColor: 'rgb(102, 153, 255)',
     borderColor: 'rgb(102, 153, 255)',
     borderWidth: 2,
     data: [...debtSeed],
     lineTension: 0}, 
    {label: 'Debt Projected',
     fill: false,
     backgroundColor: '#808080',
     borderColor: '#808080',
     borderWidth: 2,
     data: [null,null,null,null,null, ...project(debtSeed)],
     lineTension: 0}
  ]

  const investment = [
    {label: 'Investments',
     fill: false,
     backgroundColor: 'rgb(230, 184, 0)',
     borderColor: 'rgb(230, 184, 0)',
     borderWidth: 2,
     data: [...investmentSeed],
     lineTension: 0}, 
    {label: 'Investments Projected',
     fill: false,
     backgroundColor: '#808080',
     borderColor: '#808080',
     borderWidth: 2,
     data: [null,null,null,null,null, ...project(investmentSeed)],
     lineTension: 0}
  ]

  const overall = [
    {label: 'Overall',
     fill: false,
     backgroundColor: '	#B22222',
     borderColor: '	#B22222',
     borderWidth: 2,
     data: [...overallSeed],
     lineTension: 0}, 
    {label: 'Overall Projected',
     fill: false,
     backgroundColor: '#808080',
     borderColor: '#808080',
     borderWidth: 2,
     data: [null,null,null,null,null, ...project(overallSeed)],
     lineTension: 0}
  ]



  const displayData = () => {
    switch(props.filter){
      case "depository":
        return depository
      case "investment":
        return investment
      case "debt":
        return debt
      default: 
        return [...depository, ...investment, ...debt, ...overall]
    }
  }

  
  const data = {
    labels: [...lastSix, ...nextSix],
    datasets: displayData()
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
    elements: {
      point:{radius: 0.5}
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
    transactions: state.linkReducer.monthTransactions,
    filter: state.linkReducer.typeView
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(LineChart)