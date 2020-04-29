// console.log(localStorage)

const initialState = {
  user: {
    id: localStorage.user_id ? localStorage.user_id : null ,
    username: null 
  },
  account: {
    id: localStorage.account_id ? localStorage.account_id : null, 
    code: localStorage.account_code ? localStorage.account_code : null,
    users: [
      !!localStorage.user1 && {username: localStorage.user1},
      !!localStorage.user2 && {username: localStorage.user2} 
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
    case "resetAuth":
      return {
        user: {id: null}, 
      account: {id: null}
    }
    default: {
      return state
    }
  }
}
