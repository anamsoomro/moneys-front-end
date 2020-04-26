
import React from "react";
import "./App.css";
import Link from "./components/Link";
import Dash from "./containers/Dash"
import Welcome from "./containers/Welcome"
import Month from "./containers/Month"
import Trends from "./containers/Trends"
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import NavBar from "./components/NavBar";


function App(props) {

  const renderRoutes = () => {
    if(props.user.id){ // when the page resets so does state
    // if(localStorage.token){ 
      return(
          <BrowserRouter>
              <NavBar />
              <Link />
              <Switch>
                <Route exact path="/" render={ (routerProps) => <Dash {...routerProps} /> } />
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
    user: state.authReducer.user // this never gets used, so it doesnt re render
  }
} 

export default connect(mapStateToProps)(App)