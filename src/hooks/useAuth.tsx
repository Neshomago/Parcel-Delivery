import React, { FC, createContext, useContext, useState } from 'react';

import { setDataInStorage, deleteStorageData, AUTH_DATA } from '../utils';
import { loginService } from '../services';
import { IAuthContext } from '../navigation/types';

const authContext = createContext<IAuthContext>({
  errorMessage: '',
  signin: (): any => {},
  signout: (): void => {},
});

export const AuthProvider: FC = ({ children }) => {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useAuthProvider = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const signin = async (userName: string, password: string) => {
    try {
      const data = await loginService(userName, password);
      if (data) {
        setDataInStorage(AUTH_DATA, data);
        return data;
      }
    } catch (err) {
      setErrorMessage('Usuario o contraseña incorrectos');
    }
  };

  const signout = async () => {
    await deleteStorageData();
  };

  return {
    errorMessage,
    signin,
    signout,
  };
};
