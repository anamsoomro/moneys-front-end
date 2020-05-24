let today = new Date
const initialState = {
  transactions: [],
  accounts: [],
  monthTransactions: [],

  transactionsDisplay: [],
  accountsDisplay: [],
  monthDisplay: [],
  monthCalcs: [],

  userView: localStorage.user2 ? null : localStorage.user1,
  typeView: null,
  accountView: null,

  monthView: today.getMonth() + 1,

  showCategories: false,
  categoryView: null,
}

export default function linkReducer(state=initialState, action){

  const handleAccountsDisplay = (accounts) => {
    if (state.userView){
      accounts = accounts.filter(account => account.user.username === state.userView)
    } 
    if (state.typeView){
      if (state.typeView === "debt"){ // credit and loan
        accounts = accounts.filter(account => account.type === "credit" || account.type === "loan")
      } else {
        accounts = accounts.filter(account => account.type === state.typeView) // investment or depository
      }
    }
    accounts = accounts.sort( (acc1, acc2) => acc1.type > acc2.type ? 1 : -1 )
    return accounts 
  }

  const handleTransactionsDisplay = (transactions, accounts) => {
    if (state.typeView){ //  accountsDisplay will already be filtered to account types selected and whatever else is set 
      let account_ids = accounts.map(account => account.account_id) // [account_ids]
      transactions = transactions.filter(transaction => account_ids.includes(transaction.account_id) )
    }
    if (state.userView){
      transactions = transactions.filter(transaction => transaction.user.username === state.userView)
    } 
    if (state.accountView){
      transactions = transactions.filter(transaction => transaction.account_id === state.accountView)
    }
    transactions = transactions.sort( (trans1, trans2) => trans1.date > trans2.date ? -1 : 1 )
    return transactions 
  }

  const handleMonthDisplay = (transactions) => {
    if (state.userView){
      transactions = transactions.filter(items => items.user.username === state.userView)
    } 
    if (state.categoryView){
      transactions = transactions.filter(transaction => transaction.category[0] === state.categoryView)
    }
    transactions = transactions.sort( (trans1, trans2) => trans1.date > trans2.date ? -1 : 1 )
    return transactions
  }

  const handleMonthOnlyUser = (transactions) => {
    if (state.userView){
      transactions = transactions.filter(items => items.user.username === state.userView)
    } 
    return transactions
  }

  switch(action.type){

    case 'storeData': 
      let monthTransactions = action.data.transactions.filter(transaction => 
        parseInt(transaction.date.slice(5, 7)) === state.monthView
      )
      return{
        ...state,
        transactions: action.data.transactions,
        accounts: action.data.accounts,
        monthTransactions: monthTransactions
      }

    case 'addData':
      // when add a bank, want to see both users accounts/balances 
      let display
      localStorage.user2 ? display = null : display = localStorage.user1
      let addMonth = action.data.transactions.filter(transaction => 
        parseInt(transaction.date.slice(5, 7)) === state.monthView
      )
      return {
        ...state,
        transactions: [...state.transactions, ...action.data.transactions],
        accounts: [...state.accounts, ...action.data.accounts],
        monthTransactions: [...state.monthTransactions, ...addMonth],
        userView: display 
      }
    case "handleDisplay":
      let accountsDisplay = handleAccountsDisplay(state.accounts)
      let transactionsDisplay = handleTransactionsDisplay(state.transactions, accountsDisplay) 
      return{
        ...state,
        transactionsDisplay: transactionsDisplay,
        accountsDisplay: accountsDisplay,
        monthDisplay: handleMonthDisplay(state.monthTransactions),
        monthCalcs: handleMonthOnlyUser(state.monthTransactions)
      }
    case 'setUserView': 
      return {
        ...state,
        userView: action.username,
        accountView: null 
      }
    case "setTypeView": 
      let typeView = action.filter // depository, investment, debt, net-worth
      return {
        ...state,
        typeView: typeView,
        accountView: null
      }
    case "setAccountView": 
      let accountView = action.filter
      if (accountView === state.accountView){accountView = null} 
      return {
        ...state,
        accountView: accountView
      }
    case "removeBank":
      let accounts = state.accounts.filter(account => account.item_id !== action.item_id)
      let transactions = state.transactions.filter(transaction => transaction.item_id !== action.item_id)
      return{
        ...state,
        accounts: accounts,
        transactions: transactions
      }
    case "setMonthView":
      return{
        ...state,
        monthView: action.month
      }
    case "storeMonth":
      return {
        ...state,
        monthTransactions: action.transactions
      }
    case "setShowCategories":
      return {
        ...state,
        showCategories: !state.showCategories,
        categoryView: null
      }
    case "setCategoryView":
      let categoryView = action.category
      if (categoryView === state.categoryView){categoryView = null} 
      return{
        ...state,
        categoryView: categoryView
      }
    case "resetLink":
      return initialState;

    default: {
      return state
    }
  }
}
