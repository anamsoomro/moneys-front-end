const initialState = {
  filter: "all",
}

export default function dashReducer(state=initialState, action){
  switch(action.type){
    case 'setAccountFilter':
      return{ ...state,
        filter: action.filter
      }
    case "resetApp":
      return initialState;
    default: {
      return state
    }
  }
}
