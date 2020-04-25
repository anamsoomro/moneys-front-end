const initialState = {
  transactions: [],
  accounts: []
}

export default function linkReducer(state=initialState, action){

  switch(action.type){
    case 'storeData': // action.data = {transacton: [{trans}, {trans} ... ]}, accounts: [{acc}, {acc} ...]}
      return{
        ...state,
        transactions: action.data.transactions,
        accounts: action.data.accounts
      }
    case 'addData':
      return {
        ...state,
        transactions: [...state.transactions, ...action.data.transactions],
        accounts: [...state.accounts, ...action.data.accounts]
      }
    case "resetApp":
      return initialState;
    default: {
      return state
    }
  }
}
