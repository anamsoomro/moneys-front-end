
// import CounterReducer from "./counterReducer"
import {combineReducers} from "redux"
import linkReducer from "./linkReducer"
import authReducer from "./authReducer"

const rootReducer = combineReducers({linkReducer, authReducer})

export default rootReducer