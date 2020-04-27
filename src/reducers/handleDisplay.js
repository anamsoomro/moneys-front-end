const handleDisplayTransactions = (transactions) => {
  // transactions = state.transactions
  // transactionsDisplay: haleDisplayTransactions(transactions) 
  if (state.userView){
    transactions = transactions.filter(items => items.user.username === state.userView)
  } else if (state.accountView){
    transactions = transactions.filter(items => items.account_id === state.accountView)
  } else if (state.typeView){
    // uh oh transactions dont have a account type indication
    transactions = transactions
  }
  return transactions 
}


const handleDisplayAccounts = (accounts) => {
  if (state.userView){
    accounts = accounts.filter(account => account.user.username === state.userView)
  } else if (state.typeView){
    accounts = accounts.filter(account => account.type === state.typeView)
  }
  return transactions 
}