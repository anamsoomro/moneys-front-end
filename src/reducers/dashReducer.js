const initialState = {
  filter: "all",
}

export default function dashReducer(state=initialState, action){
  switch(action.type){
    case 'setAccountFilter':
      return{ ...state,
        filter: action.filter
      }
    default: {
      return state
    }
  }
}

// eventually this will also hold user