// MAKE USER1
// let u1Saving = [2000, 2200, 2400, 2600, 2600, 2650]
// let u1Debt = [10000, 9500, 9000, 8500, 8000, 7500] 
// let u1Investment = [4000, 4100, 3900, 3700, 3750, 3800] 

let u1Saving = [33137.24, 35037.8, 37837.24, 39465.78, 41465.24, 44520]
let u1Debt = [69672, 68872, 68072, 67272, 66472, 65672] 
let u1Investment = [24300, 24202, 24052, 24002, 23852, 23952] 

let u1Overall = []
for (let i = 0; i < u1Saving.length; i++){
  u1Overall.push( u1Saving[i] + u1Investment[i] - u1Debt[i] )
}
let user1 = {
  saving: u1Saving, 
  debt: u1Debt, 
  investment: u1Investment, 
  overall: u1Overall,
  mSaving: (u1Saving[5] - u1Saving[0]) / 5,
  mDebt: (u1Debt[5] - u1Debt[0]) / 5,
  mInvestment: (u1Investment[5] - u1Investment[0]) / 5,
  mOverall: (u1Overall[5] - u1Overall[0]) / 5,
}

// MAKE USER2
// let u2Saving = [2000, 2200, 2400, 2600, 2600, 2650]
// let u2Debt = [10000, 9500, 9000, 8500, 8000, 7500] 
// let u2Investment = [4000, 4100, 3900, 3700, 3750, 3800] 

let u2Saving = [33137.24, 35037.8, 37837.24, 39465.78, 41465.24, 44520]
let u2Debt = [69672, 68872, 68072, 67272, 66472, 65672] 
let u2Investment = [24300, 24202, 24052, 24002, 23852, 23952] 

let u2Overall = []
for (let i = 0; i < u2Saving.length; i++){
  u2Overall.push( u2Saving[i] + u2Investment[i] - u2Debt[i] )
}
let user2 = {
  saving: u2Saving, 
  debt: u2Debt, 
  investment: u2Investment, 
  overall: u2Overall,
  mSaving: (u2Saving[5] - u2Saving[0]) / 5,
  mDebt: (u2Debt[5] - u2Debt[0]) / 5,
  mInvestment: (u2Investment[5] - u2Investment[0]) / 5,
  mOverall: (u2Overall[5] - u2Overall[0]) / 5,
}

const addTwoArrays = (arr1, arr2) => {
  let result = []
  for (let i=0; i<arr1.length; i++){
    result.push(arr1[i] + arr2[i])
  }
  return [...result]
}

console.log("calculating both")
let both = {
  saving: addTwoArrays(user1.saving, user2.saving), 
  debt: addTwoArrays(user1.debt, user2.debt),
  investment: addTwoArrays(user1.investment, user2.investment),
  overall: addTwoArrays(user1.overall, user2.overall),
  mSaving: user1.mSaving + user2.mSaving,
  mDebt: user1.mDebt + user2.mDebt,
  mInvestment: user1.mInvestment + user2.mInvestment,
  mOverall: user1.mOverall + user2.mOverall,
}

console.log(user1)
console.log(user2)
console.log(both)

const initialState = {
    user1: user1,
    user2: user2, 
    both: both,
    // display: both // either u1, u2 or both
    display: localStorage.user2 ? both : user1
}

export default function trendReducer (state=initialState, action){

  switch(action.type){
    case 'handleTrendDisplay': 
    let display
    if (action.filter === "user1"){ display = state.user1 } 
    else if(action.filter === "user2"){display = state.user2}
    else if(action.filter === "both") {display = state.both} 
      return {
        ...state,
        display: display 
      }
    case 'adjustSavings':
      let a  = action.mSavings + state.display.mInvestment - state.display.mDebt
      return{ 
        ...state,
        display:{
          ...state.display, 
          mSaving: action.mSavings,
          mOverall: a
        }
      }
    case 'adjustDebt':
      let b = state.display.mSaving + state.display.mInvestment - action.mDebt
      return{ 
        ...state,
        display:{
          ...state.display,
          mDebt: action.mDebt,
          mOverall: b
        }
      }
    case "resetTrends":
      let reset
      if (action.userView === localStorage.user1 ){reset = state.user1}
      else if (localStorage.user2 && action.userView === localStorage.user2 ){reset = state.user2}
      else {reset = state.both}
      return {
        ...state,
        display: reset
      }
    default: {
      return state
    }
  }
}
