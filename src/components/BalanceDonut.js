import React from "react"
import { connect } from 'react-redux'
import { Doughnut } from 'react-chartjs-2'

const BalanceDonut = (props) => { // i just want to pass it different props

  const calcData = () => {
    switch(props.type){
      case "depository":
        return [calcDepository(), 0, 0]
      case "investment":
        return [0, calcInvestments(), 0]
      case "debt":
        return [0, 0, calcDebt()]
      default: 
        return [calcDepository(), calcInvestments(), calcDebt()]
    }
  }

  const calcDebt = () => {
    let debt = props.accounts.reduce( (acc, i) => { 
      if(i.type === "credit" || i.type === "loan" ){ // debt
        return (acc - i.balances.current)
      } else {
        return (acc) 
      }
    }, 0)
    return debt
  }

  const calcInvestments = () => {
    let investments = props.accounts.reduce( (acc, i) => { 
      if (i.type === "investment"){ //investment
        return (acc + i.balances.current) 
      } else {
        return (acc ) 
      }
    }, 0)
    return investments
  }

  const calcDepository = () => {
    let depository = props.accounts.reduce( (acc, i) => { 
      if (i.type === "depository" ){ //liquid
        return (acc + i.balances.current) 
      }else {
        return (acc ) 
      }
    }, 0)
    return depository
  }



  const data = {
    labels: ["depository", "investments", "debt"],
    datasets: [
      {
        label: 'out',
        backgroundColor: ['#ffc400', '#0055ff', '#d84315'],
        data: calcData(),
        borderWidth: 0
      },
    ]
  }

  const options = {
    title:{
      display: false,
      fontSize:20
    },
    legend:{
      display:false,
      position:'right'
    },
    rotation: 1 * Math.PI, 
    circumference: 2 * Math.PI ,
    maintainAspectRatio: false,
    tooltips: {enabled: false},
    hover: {mode: null},
  }


  return (
      <div>
         <Doughnut  data={data} options={options} width={90} height={90} />
      </div>
  )
}

const mapStateToProps = (state) => {
  return {
    accounts: state.linkReducer.accounts,
    type: state.linkReducer.typeView
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(BalanceDonut)