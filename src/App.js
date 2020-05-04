

import React, { useEffect } from "react"
import "./App.css";
import Dash from "./containers/Dash"
import Welcome from "./containers/Welcome"
import Month from "./containers/Month"
import Trends from "./containers/Trends"
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import NavBar from "./components/NavBar";
import { trackPromise } from 'react-promise-tracker'
import Settings from './containers/Settings'


function App(props) {

  useEffect( () =>{
    if (localStorage.token){ 
      trackPromise(
      fetch(`http://localhost:3000/accounts/${props.account_id}/get_data`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        if (!!data.transactions.length){ // if user has no plaid items {trans: [], accounts: []}
          let allAccounts = data.accounts 
          let allTransactions = data.transactions
          // accounts have account_ids and names. transactions have account_ids, need to add account_names
          allTransactions = allTransactions.map(tran =>{
            let account = allAccounts.filter(acc => { // this seems expensive way of doing this. no .select
              return acc.account_id === tran.account_id // find the account matchinig this transaction
            })
            return {...tran, account_name: account[0].name} // return transaction with that accounts name
          })
          props.storeData({transactions: allTransactions, accounts: allAccounts})
          props.handleDisplay()
        }
      })
      )
    }
  }, [props.user]) // run if props.user changes


  const renderRoutes = () => {
    if(props.user.id){ 
      return(
        <BrowserRouter>
          <NavBar />
            <Switch>
              <Route exact path="/" render={ (routerProps) => <Dash {...routerProps}   /> } />
              <Route exact path="/month" render={ (routerProps) => <Month {...routerProps}/> } />
              <Route exact path="/trends" render={ (routerProps) => <Trends {...routerProps}/> } />
              <Route exact path="/settings" render={ (routerProps) => <Settings {...routerProps}/> } />
            </Switch>
        </BrowserRouter>  
      )
    } else { 
      return (
          <Welcome />
      )
    }
  }

  return (
    <div className="App">
      {renderRoutes()}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    account_id: state.authReducer.account.id,
    accounts: state.linkReducer.accounts
  }
} 

const mapDispatchToProps = (dispatch) => {
  return {
    storeData: ( (data) => dispatch({type: "storeData", data: data}) ), // data = {transactions: [...], accounts: [...]}
    handleDisplay: ( () => dispatch({type: "handleDisplay"}))
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(App)