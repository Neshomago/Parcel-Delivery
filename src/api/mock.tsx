import { getToken } from './token';

const mockSuccess = (value: any) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), 2000);
  });
};

const mockFailure = (value: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(value), 2000);
  });
};

export const login = (email: any, password: any, shouldSucceed = false) => {
  console.log(email, password);

  if (!shouldSucceed) {
    return mockFailure({ error: 500, message: 'Something went wrong!' });
  }

  return mockSuccess({ auth_token: 'successful_fake_token' });
};

export const createAccount = (
  email: any,
  password: any,
  shouldSucceed = true,
) => {
  console.log(email, password);

  if (!shouldSucceed) {
    return mockFailure({ error: 500, message: 'Something went wrong!' });
  }

  return mockSuccess({ auth_token: 'successful_fake_token' });
};

const getAuthenticationToken = () => 'successful_fake_token';


