import {combineReducers} from "redux"
import linkReducer from "./linkReducer"
import authReducer from "./authReducer"
import trendReducer from "./trendReducer"

const rootReducer = combineReducers({linkReducer, authReducer, trendReducer})

export default rootReducer