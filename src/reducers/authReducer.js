const initialState = {
  user: localStorage.user_id ? {user_id: localStorage.user_id} : null ,
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
