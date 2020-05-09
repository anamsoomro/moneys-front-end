import React from "react"
import { connect } from 'react-redux'
import { Pie, Doughnut } from 'react-chartjs-2'

const MonthPie = (props) => { 
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

  const data = {
    labels: distinctCategories,
    datasets: [
      {
        label: 'out',
        backgroundColor: [  '#C5E7E2', '#BAC1B8', '#B84A62','#0000ff', '#31AFD4', '#ffcc00', '#E0FBFC'],
        data: amounts,
        borderWidth: 0
      },
    ]
  }

  const options = {
    title:{
      display: false,
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

  const handleCategoryFilter = (event) => {
    let category = distinctCategories[event[0]._index]
    props.setCategoryView(category)
    props.handleDisplay()
  }

  return (
      <div>
         <Doughnut id="pie" data={data} options={options} width={200} height={300} onElementsClick={handleCategoryFilter}/>
      </div>
  )
}

const mapStateToProps = (state) => {
  return {
    transactions: state.linkReducer.monthCalcs,


  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    setCategoryView: (category) => dispatch({type: "setCategoryView", category: category}),
    handleDisplay: () => dispatch({type: "handleDisplay"})
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(MonthPie)