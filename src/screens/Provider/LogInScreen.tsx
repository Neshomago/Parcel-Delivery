import React, { useState, useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import LoginForm from '../../components/LoginForm';
import { useAuth } from '../../hooks/useAuth';
import { StackParams } from '../../navigation/types';

interface IProps {
  navigation: StackNavigationProp<StackParams>;
}

const LogInScreen = ({ navigation }: IProps) => {
  const [userName, setUserName] = useState('arce');
  const [password, setPassword] = useState('arce');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const auth = useAuth();

  const onChangeUser = (user: string): void => {
    setUserName(user);
  };
  const onChangePassword = (pw: string): void => {
    setPassword(pw);
  };

  const onSubmit = async () => {
    if (!userName || !password) {
      setErrorMessage('Ingrese usuario y contraseña');
      return;
    }

    setIsLoading(true);

    await auth
      .signin(userName, password)
      .then(
        (data: any) =>
          data.jwt && navigation.navigate('OrdersScreen', { userName }),
      )
      .catch(() => setErrorMessage('Usuario o contraseña incorrectas'));

    setIsLoading(false);
  };

  useEffect(() => {
    auth.errorMessage && setErrorMessage(auth.errorMessage);
  }, [auth.errorMessage]);

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
