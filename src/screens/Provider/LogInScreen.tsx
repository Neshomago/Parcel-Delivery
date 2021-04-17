import React, { useState, useContext } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import LoginForm from '../../components/LoginForm';
import { logIn } from '../../services';
import { AuthContext } from '../../context';
import { setDataInStorage } from '../../utils';
import { StackParams } from '../../navigation/types';

interface Props {
  navigation: StackNavigationProp<StackParams>;
}

const LogInScreen = ({ navigation }: Props) => {
  const [userName, setUserName] = useState('arce');
  const [password, setPassword] = useState('arce');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { setLoggedIn } = useContext(AuthContext);

  const onChangeUser = (user: string): void => {
    setUserName(user);
  };
  const onChangePassword = (pw: string): void => {
    setPassword(pw);
  };

  const onSubmit = (): void => {
    if (!userName || !password) setErrorMessage('Ingrese usuario y contraseña');

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
