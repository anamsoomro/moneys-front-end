
// import React from "react";
import React, { useEffect } from "react"
import "./App.css";
// import Link from "./components/Link";
import Dash from "./containers/Dash"
import Welcome from "./containers/Welcome"
import Month from "./containers/Month"
import Trends from "./containers/Trends"
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import NavBar from "./components/NavBar";
import NoAccounts from './components/NoAccounts'


function App(props) {

  useEffect( () =>{
    if (localStorage.token){ 
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
          // for as many items this acount has. each object in array is a link item
          let allAccounts = []
          data.accounts.map( item => item.map(account => allAccounts.push(account)))
          let allTransactions = [] 
          data.transactions.map( item => item.map(transaction => allTransactions.push(transaction)))
          // accounts have account_ids and names 
          // transactions have account_ids, need to add account_names
          allTransactions = allTransactions.map(tran =>{
            let account = allAccounts.filter(acc => {
              return acc.account_id === tran.account_id
            })
            return {...tran, account_name: account[0].name}
          })
          props.storeData({transactions: allTransactions, accounts: allAccounts})
          props.handleDisplay()
        }
      })
    }
  }, [props.user]) // run if props.user changes


  const renderRoutes = () => {
    if(props.user.id){ // if refresh page, then logout. doesnt redirect to login page
    // if(localStorage.token){ // without using props.user, app does not get re rendered
      return(
        <BrowserRouter>
          <NavBar />
            <Switch>
              {/* {
                !!props.accounts.length
                ? (<Route exact path="/" render={ (routerProps) => <Dash {...routerProps} /> } />
                  <Route exact path="/month" render={ (routerProps) => <Month {...routerProps}/> } />
                  <Route exact path="/trends" render={ (routerProps) => <Trends {...routerProps}/> } />)

                : <NoAccounts />
              } */}
              <Route exact path="/" render={ (routerProps) => <Dash {...routerProps} /> } />
              <Route exact path="/month" render={ (routerProps) => <Month {...routerProps}/> } />
              <Route exact path="/trends" render={ (routerProps) => <Trends {...routerProps}/> } />
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
    <div>
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