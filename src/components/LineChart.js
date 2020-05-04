import React from "react"
import { connect } from 'react-redux'
import {Line} from 'react-chartjs-2'

const LineChart = (props) => { 

  let today = new Date
  let month = [ "July", "August", "September", "October", "November", "December", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March", "April", "May"]
  let lastSix = month.slice( today.getMonth() + 6 - 6 , today.getMonth() + 6)
  let nextSix = month.slice( today.getMonth() + 6, today.getMonth() + 6 + 6)  

  const project = (arr, m) => {
    let projected = []
    let x
    for (x =0; x < 7; x++) { 
      projected.push(arr[5] + x * m)
    }
    return projected
  }



  const depository = () =>  [
    {label: 'Savings',
     fill: false,
     backgroundColor: '#ffc400',
     borderColor: '#ffc400',
     borderWidth: 5,
     hoverRadius: 8,
     hitRadius: 10,
     data: props.savings, // on reset not iterable. why is it iterable the first time then 
     lineTension: 0}, 
    {label: 'Savings Projected',
     borderDash: [10,5],
     fill: false,
     backgroundColor: '#ffc400',
     borderColor: '#808080',
     borderWidth: 5,
     hoverRadius: 8,
     hitRadius: 10,
     data: [null,null,null,null,null, ...project(props.savings, props.mSaving)],
     lineTension: 0}
  ]
  const debt = () => [
    {label: 'Debt',
     fill: false,
     backgroundColor: '#d84315',
     borderColor: '#d84315',
     borderWidth: 5,
     hoverRadius: 8,
     hitRadius: 10,
     data: props.debt,
     lineTension: 0}, 
    {label: 'Debt Projected',
     borderDash: [10,5],
     fill: false,
     backgroundColor: '#d84315',
     borderColor: '#808080',
     borderWidth: 5,
     hoverRadius: 8,
     hitRadius: 10,
     data: [null,null,null,null,null, ...project(props.debt, props.mDebt)],
     lineTension: 0}
  ]
  const investment = () => [
    {label: 'Investments',
     fill: false,
     backgroundColor: '#0055ff',
     borderColor: '#0055ff',
     borderWidth: 5,
     hoverRadius: 8,
     hitRadius: 10,
     data: props.investments,
     lineTension: 0}, 
    {label: 'Investments Projected',
     borderDash: [10,5],
     fill: false,
     backgroundColor: '#0055ff',
     borderColor: '#808080',
     borderWidth: 5,
     hoverRadius: 8,
     hitRadius: 10,
     data: [null,null,null,null,null, ...project(props.investments, props.mInvestment)],
     lineTension: 0}
  ]
  const overall = () => 
  [
    {label: 'Overall',
     fill: false,
     backgroundColor: '	#99cc00',
     borderColor: '#99cc00',
     borderWidth: 5,
     hoverRadius: 8,
     hitRadius: 10,
     data: props.overall,
     lineTension: 0}, 
    {label: 'Overall Projected',
    borderDash: [10,5],
     fill: false,
     backgroundColor: '#99cc00',
     borderColor: '#808080',
     borderWidth: 5,
     hoverRadius: 8,
     hitRadius: 10,
     data: [null,null,null,null,null, ...project(props.overall, props.mOverall)],
     lineTension: 0}
  ]

  const displayData = () => {
    switch(props.filter){
      case "depository":
        return depository()
      case "investment":
        return investment()
      case "debt":
        return debt()
      case "overall":
        return overall()
      default: 
        return [...depository(), ...investment(), ...debt(), ...overall()]
    }
  }

  const data = {
    labels: [...lastSix, ...nextSix],
    datasets: displayData()
  }

  const options = {
    title:{
      display:false,
      text: "trends",
      fontSize:20
    },
    legend:{
      display:false,
      position:'right'
    },
    elements: {
      point:{radius: 2},
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
    // transactions: state.linkReducer.monthTransactions,
    transactions: state.linkReducer.monthDisplay,

    filter: state.linkReducer.typeView,

    savings: state.trendReducer.savings,
    debt: state.trendReducer.debt,
    investments: state.trendReducer.investments,
    overall: state.trendReducer.overall, 

    mSaving: state.trendReducer.mSaving,
    mDebt: state.trendReducer.mDebt,
    mInvestment: state.trendReducer.mInvestment,
    mOverall: state.trendReducer.mOverall
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(LineChart)