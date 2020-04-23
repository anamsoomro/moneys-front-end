
// import CounterReducer from "./counterReducer"
import {combineReducers} from "redux"
import linkReducer from "./linkReducer"
import authReducer from "./authReducer"
import dashReducer from "./dashReducer"


const rootReducer = combineReducers({linkReducer, authReducer, dashReducer})

export default rootReducer