import React, { useState, createContext } from 'react';
import { getToken } from '../api/token';

const LogInContext = createContext(false);

const LogInProvider = async ({ children }: any) => {
  const [isLoggedIn, setLogIn] = useState(false);
  const token = await getToken();
  if (token !== '') setLogIn(true);

  return (
    <LogInContext.Provider value={isLoggedIn}>{children}</LogInContext.Provider>
  );
};

export { LogInContext, LogInProvider };
