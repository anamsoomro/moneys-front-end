let savingSeed = [2000, 2200, 2400, 2600, 2600, 2650] // this needs to be actual info.
let debtSeed = [10000, 9500, 9000, 8500, 8000, 7500] // the current month will also be considered as a projected month
let investmentSeed = [4000, 4100, 3900, 3700, 3750, 3800] 
let overallSeed = []
for (let i = 0; i < savingSeed.length; i++){
  overallSeed.push( savingSeed[i] + investmentSeed[i] - debtSeed[i] )
}

const initialState = {
  savings: savingSeed,
  debt: debtSeed,
  investments: investmentSeed,
  overall: overallSeed,
  
  mSaving: (savingSeed[5] - savingSeed[0]) / 6,
  mDebt: (debtSeed[5] - debtSeed[0]) / 6,
  mInvestment: (investmentSeed[5] - investmentSeed[0]) / 6,
  mOverall: (overallSeed[5] - overallSeed[0]) / 6,
}

export default function trendReducer (state=initialState, action){
  switch(action.type){
    case 'adjustSavings':
      let a  = action.mSavings + state.mInvestment - state.mDebt
      console.log(a)
      return{ 
        ...state,
        mSaving: action.mSavings,
        mOverall: a
      }
    case 'adjustDebt':
      let b = state.mSaving + state.mInvestment - action.mDebt
      console.log(b)
      return{ 
        ...state,
        mDebt: action.mDebt,
        mOverall: b
      }
    case "resetTrends":
      console.log(initialState)
      return initialState
    default: {
      return state
    }
  }
}
