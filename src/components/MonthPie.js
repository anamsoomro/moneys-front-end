import React from "react"
import { connect } from 'react-redux'
import { Pie } from 'react-chartjs-2'

const MonthPie = (props) => { // i just want to pass it different props 
  let today = new Date
  let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  let currentMonth = month[today.getMonth()]

  let eachCategory = props.transactions.map(transaction => transaction.category[0])
  let distinctCategories = [...new Set(eachCategory)]
  let amounts = distinctCategories.map(category => 
    props.transactions.reduce((acc, i) => {
      if(i.category[0] === category){
        return (acc + i.amount)
      } else { 
        return acc
      }
    }, 0)
  )

  const piedata = {
    labels: distinctCategories,
    datasets: [
      {
        label: 'out',
        backgroundColor: ['#d8ea7c', '#93172a', '#2f00a8', '#3cef07', '#97d817', '#5aefcf', '#af09fd', '#751b74', '#3e6764', '#631a7c', '#af5e55', '#c2443d'],
        data: amounts,
        borderWidth: 0
      },
    ]
  }

  const pieoptions = {
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
    circumference: 2 * Math.PI ,
    maintainAspectRatio: false
  }

  return (
      <div style={{"float": "bottom"}}>
        <Pie data={piedata} options={pieoptions} width={200} height={360} />
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

export default connect(mapStateToProps, mapDispacthToProps)(MonthPie)