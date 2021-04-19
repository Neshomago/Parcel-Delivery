import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  getDataFromStorage,
  setDataInStorage,
  deleteStorageData,
} from '../utils';
import { loginService } from '../services';
import { IAuthContext } from '../navigation/types';

export const AUTH_DATA = 'AUTH_DATA';

const authContext = createContext<IAuthContext>({
  user: '',
  errorMessage: '',
  signin: () => {},
  signout: () => {},
});

export const AuthProvider: FC = ({ children }) => {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useAuthProvider = () => {
  const [user, setUser] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const signin = async (userName: string, password: string): Promise<any> => {
    try {
      const data = await loginService(userName, password);
      if (data) {
        setUser(userName);
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
    user,
    errorMessage,
    signin,
    signout,
  };
};
