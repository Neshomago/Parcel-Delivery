import React, { useState, useContext } from 'react';

import LoginForm from '../../components/Provider/LoginForm';
import { logIn } from '../../services';
import { AuthContext } from '../../context';
import { setDataInStorage } from '../../utils';

const LogInScreen = ({ navigation }: any) => {
  const [userName, setUserName] = useState('arce');
  const [password, setPassword] = useState('arce');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { setLoggedIn } = useContext(AuthContext);

  const onChangeUser = (user: string) => {
    setUserName(user);
  };
  const onChangePassword = (pw: string) => {
    setPassword(pw);
  };

  const onSubmit = () => {
    if (!userName || !password) {
      setErrorMessage('Ingrese usuario y contraseña');
      return;
    }

    setIsLoading(true);

    logIn(userName, password)
      .then((res) => {
        setErrorMessage('');
        setDataInStorage('AUTH_TOKEN', res.data.jwt);
        setLoggedIn(true);
        navigation.navigate('OrdersScreen', { userName });
      })
      .catch(() => {
        setErrorMessage('Usuario o contraseña incorrectos');
      });

    setIsLoading(false);
  };

  return (
    <LoginForm
      onChangeUser={onChangeUser}
      onChangePassword={onChangePassword}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
      isLoading={isLoading}
    />
  );
};

export default LogInScreen;
