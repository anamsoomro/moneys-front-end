const initialState = {
  viewUser: null,
  transactionsDisplay: [],
  accountsDisplay: []
}
// this separation doesnt work bc initial state needs to be state.transactiioins that gets loaded 
// if i set this attr in that reducer, theyre tracked separately
export default function viewReducer(state=initialState, action){
  switch(action.type){
    case 'void':
      let username
      switch (action.data.user){
        case "user1":
          username = state.accounts.users[0].username
          break 
        case 'user2': 
          username = state.accounts.users[1].username
          break
        default: // if it is both, userView is null
          username = null
      }
      let filteredAccounts
      let filteredTransactions
      if (username){
        filteredTransactions = state.transactions.filter( transaction => transaction.user.username === username)
        filteredAccounts = state.accounts.filter( account => account.user.username === username)
      }
      return {
        ...state,
        viewUser: username,
        transactionsDisplay: filteredTransactions,
        accountsDisplay: filteredAccounts
      }
    case "resetApp":
      return initialState;
    default: {
      return state
    }
  }
}
