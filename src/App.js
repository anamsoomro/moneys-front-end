
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


const store = createStore(reducer) 

function App() {
  return (
    // <Provider store={store}> 
    //   <Link />
    //   {/* these will go under browser router. Welcome. Dash. Monthly. Yearly. */}
    //   <Dash /> 
    //   {/* <Welcome /> */}
    // </Provider>
    <Provider store={store}>
      <BrowserRouter>
          <Link />
          <Switch>
            <Route exact path="/" render={ (routerProps) => <Welcome {...routerProps}/> }/> 
            <Route exact path="/dash" render={ (routerProps) => <Dash {...routerProps}/> }/>
            <Route exact path="/month" render={ (routerProps) => <Month {...routerProps}/> } />
            <Route exact path="/trends" render={ (routerProps) => <Trends {...routerProps}/> } />
            {/* one for monthly, year, welcome */}
          </Switch>
      </BrowserRouter>
    </Provider>

  );
}

export default App;