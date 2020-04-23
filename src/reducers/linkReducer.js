const initialState = {
  transactions: [],
  accounts: []
}

export default function linkReducer(state=initialState, action){
  switch(action.type){
    case 'storeData':
      return{
        ...state,
        transactions: action.data.transactions,
        accounts: action.data.accounts
      }
    default: {
      return state
    }
  }
}
