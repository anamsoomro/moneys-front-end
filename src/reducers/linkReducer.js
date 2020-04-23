const initialState = {
  transactions: [],
  accounts: []
}

export default function linkReducer(state=initialState, action){
  switch(action.type){
    case 'storeData':
      return{
        ...state,
        transactions: action.data.transactions.transactions,
        accounts: action.data.accounts.accounts
      }
    default: {
      return state
    }
  }
}
