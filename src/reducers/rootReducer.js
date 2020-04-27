import {combineReducers} from "redux"
import linkReducer from "./linkReducer"
import authReducer from "./authReducer"
// import dashReducer from "./dashReducer"
// import viewReducer from "./viewReducer"

const rootReducer = combineReducers({linkReducer, authReducer})

export default rootReducer