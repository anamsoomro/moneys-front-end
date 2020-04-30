import {combineReducers} from "redux"
import linkReducer from "./linkReducer"
import authReducer from "./authReducer"
import trendReducer from "./trendReducer"
// import dashReducer from "./dashReducer"
// import viewReducer from "./viewReducer"

const rootReducer = combineReducers({linkReducer, authReducer, trendReducer})

export default rootReducer