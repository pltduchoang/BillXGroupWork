import React, { createContext, useReducer, useContext } from 'react';

// Create a context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ reducer, initialState, children }) => (
  <AppContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </AppContext.Provider>
);

// Create a custom hook to use the context
export const useAppContext = () => useContext(AppContext);
