
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
    // if (localStorage.token){ // I dont re render App so it doesnt do this check again to direct it do dash or login
      // my app doesnt have store so i cant setState and re render

    if(props.user){ // everytime refresh state will be null. need an autologin of some sorts
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
    user: state.authReducer.user
  }
} 

export default connect(mapStateToProps)(App)