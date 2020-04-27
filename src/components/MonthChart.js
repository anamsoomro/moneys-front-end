import React from "react"
import { connect } from 'react-redux'
import { Doughnut, Pie } from 'react-chartjs-2'

const MonthChart = (props) => { // i just want to pass it different props 
  // console.log(props.transactions)
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

  //  how to represent money out > money in
  // GAUGE CHART 
  const data = {
    labels: ['money in', 'money out', 'money left'],
    datasets: [
      {
        label: 'out',
        backgroundColor: ['#B21F00', '#175000'],
        data: [null, moneyOut, moneyIn-moneyOut], // what if that net is negative. weird it still graphs it like its positive 
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

  // CATEGORY CHART
  // would be cool if click each category, it filters trans by that category
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
    <div>
      <Doughnut data={data} options={options} width={200} height={100} />
      <Pie data={piedata} options={pieoptions} width={200} height={100} />
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