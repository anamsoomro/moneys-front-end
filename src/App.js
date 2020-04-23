
import React from "react";
import "./App.css";

import Link from "./components/Link";

import Dash from "./containers/Dash"
import Welcome from "./containers/Welcome"
import Month from "./containers/Month"
import Trends from "./containers/Trends"

import {BrowserRouter, Route, Switch} from 'react-router-dom'

import {createStore} from "redux"
import reducer from "./reducers/rootReducer"
import {Provider} from "react-redux"


const store = createStore(
  reducer,  
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
) 

function App() {


  const renderRoutes = () => {
    if (localStorage.token){
      return(
        <Provider store={store}>
          <BrowserRouter>
              <Link />
              <Switch>
                <Route exact path="/" render={ (routerProps) => <Dash {...routerProps} /> } />
                <Route exact path="/" render={ (routerProps) => <Dash {...routerProps} /> } />
                <Route exact path="/month" render={ (routerProps) => <Month {...routerProps}/> } />
                <Route exact path="/trends" render={ (routerProps) => <Trends {...routerProps}/> } />
              </Switch>
          </BrowserRouter>
        </Provider>
      )
    } else { 
      return (
        <Provider store={store} >
          <Welcome />
        </Provider>
      )
    }
  }

  return (
    <div>
      {renderRoutes()}
    </div>
  )
}

export default App