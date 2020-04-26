const initialState = {
  // user_id: localStorage.user_id ? {user_id: localStorage.user_id} : null ,
  user: {
    id: localStorage.user_id ? localStorage.user_id : null , 
    username: null
  },


  account: {
    id: localStorage.account_id ? localStorage.account_id : null, 
    code: null
  }

}

export default function authReducer(state=initialState, action){
  switch(action.type){
    case 'setCurrentUser':
      return{ ...state,
        user: action.user.user,
        account: action.user.account
      }
    case "resetApp":
      return initialState;
    default: {
      return state
    }
  }
}
