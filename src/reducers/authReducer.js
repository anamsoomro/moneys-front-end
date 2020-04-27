const initialState = {
  // all this local storage business is to keep whats needed to be functional on refresh
  user: {
    id: localStorage.user_id ? localStorage.user_id : null , // this state goes to "undefined" not null when logout, idk if that has anything to do with it
    username: null 
  },
  account: {
    id: localStorage.account_id ? localStorage.account_id : null, 
    code: localStorage.account_code ? localStorage.account_code : null,
    users: [
      {username: localStorage.user1 ? localStorage.user1 : null},
      !!localStorage.user2 ? {username: localStorage.user2} : null
    ]
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
