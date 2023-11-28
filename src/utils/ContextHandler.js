const initialState = {
    user: null,
    expenses: [],
    // other app-wide state
  };
  
  // Define reducer
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_USER':
        return { ...state, user: action.payload };
      case 'ADD_EXPENSE':
        return { ...state, expenses: [...state.expenses, action.payload] };
      // other cases for different actions
      default:
        return state;
    }
  };
  
  export { initialState, reducer };