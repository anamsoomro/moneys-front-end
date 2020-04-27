
const initialState = {
  transactions: [],
  accounts: [],
  monthTransactions: [],

  transactionsDisplay: [],
  accountsDisplay: [],

  userView: null,
  typeView: null,
  accountView: null
}

export default function linkReducer(state=initialState, action){

  const handleAccountsDisplay = (accounts) => {
    if (state.userView){
      accounts = accounts.filter(account => account.user.username === state.userView)
    } 
    if (state.typeView){
      // account types can be "depository" "investment" "credit" "loan"
      if (state.typeView === "debt"){
        accounts = accounts.filter(account => account.type === "credit" || account.type === "loan")
      } else {
        accounts = accounts.filter(account => account.type === state.typeView)
      }
    }
    return accounts 
  }

  const handleTransactionsDisplay = (transactions, accountsDisplay) => {
    if (state.userView){
      transactions = transactions.filter(transaction => transaction.user.username === state.userView)
    } 
    if (state.accountView){
      transactions = transactions.filter(transaction => transaction.account_id === state.accountView)
    }
     if (state.typeView){ //  accountsDisplay will already be filtered to account types selected 
      let account_ids = accountsDisplay.map(account => account.account_id) // [account_ids]
      transactions = transactions.filter(transaction => account_ids.includes(transaction.account_id) )
    }
    return transactions 
  }

  const handleMonthDisplay = (transactions) => {
    if (state.userView){
      transactions = transactions.filter(items => items.user.username === state.userView)
    } 
    return transactions
  }



  switch(action.type){

    case 'storeData': 
    let transactions = action.data.transactions.sort( (trans1, trans2) => trans1.date > trans2.date ? -1 : 1 )
      return{
        ...state,
        transactions: transactions,
        accounts: action.data.accounts,
      }

    case 'addData':
      return {
        ...state,
        transactions: [...state.transactions, ...action.data.transactions],
        accounts: [...state.accounts, ...action.data.accounts],
      }

    case 'setUserView': 
      return {
        ...state,
        userView: action.username,
      }

    case "setTypeView": 
      let typeView = action.filter
      if (typeView === state.typeView){typeView = null}  // toggle
      return {
        ...state,
        typeView: typeView
      }

    case "setAccountView": 
      let accountView = action.filter
      if (accountView === state.accountView){accountView = null} // toggle
      return {
        ...state,
        accountView: accountView
      }

    case "handleDisplay":
      // this may be an unneccsarily expensive. but its organized ha.
      let today = new Date
      let month = today.getMonth() + 1
      let monthTransactions = state.transactions.filter(transaction => 
        parseInt(transaction.date.slice(5, 7)) === month
      )
      let accountsDisplay = handleAccountsDisplay(state.accounts)
      let transactionsDisplay = handleTransactionsDisplay(state.transactions, accountsDisplay) // i need to pass accounts to filter tran by typeView
      return{
        ...state,
        transactionsDisplay: transactionsDisplay,
        accountsDisplay: accountsDisplay,
        monthTransactions: handleMonthDisplay(monthTransactions) 
      }
    case "resetLink":
      return initialState;

    default: {
      return state
    }

  }



}
