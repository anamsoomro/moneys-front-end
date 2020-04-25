import {combineReducers} from "redux"
import linkReducer from "./linkReducer"
import authReducer from "./authReducer"
import dashReducer from "./dashReducer"

const rootReducer = combineReducers({linkReducer, authReducer, dashReducer})

// const rootReducer = (state, action) => {
//   if (action.type === 'RESET_APP') {
//     state = undefined;
//   }
//   return appReducer(state, action);
// }
// This will require me to nest my rootReducer in another reducer 
// which will make me call state.rootReducer.linkReducer.whatever 
// i think i find that more ugly than putting RESET_APP in all the reducers





export default rootReducer