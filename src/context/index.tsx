import React, { FC, useState, useEffect, createContext } from 'react';

interface AuthContextInterface {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextInterface>({
  isLoggedIn: false,
  setLoggedIn: () => {},
});

export const ContextProvider: FC = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.info('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
