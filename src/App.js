
import React from "react";
import "./App.css";
import Link from "./components/Link";
import Dash from "./containers/Dash"
import Welcome from "./containers/Welcome"




import {createStore} from "redux"
import reducer from "./reducers/rootReducer"

import {Provider} from "react-redux"


const store = createStore(reducer) 

function App() {
  return (
    <Provider store={store}> 
      <Link />
      {/* these will go under browser router. Welcome. Dash. Monthly. Yearly. */}
      <Dash /> 
      {/* <Welcome /> */}
    </Provider>
  );
}

export default App;