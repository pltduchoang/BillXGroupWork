import React, { createContext, useReducer, useContext, useState } from 'react';

// Create a context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ reducer, initialState, children }) => {
  const [databaseVersion, setDatabaseVersion] = useState(0);


  const contextValue = {
    state: useReducer(reducer, initialState),
    databaseVersion,
    setDatabaseVersion,
  };
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

// Create a custom hook to use the context
export const useAppContext = () => useContext(AppContext);
