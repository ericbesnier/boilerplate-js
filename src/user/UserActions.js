import { USER_API } from '../api/UserApi';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (email, password) => {
  console.log('UserActions/login');
  return {
    type: LOGIN,
    payload: USER_API.login(email, password)
  };
}

export const logout = (email, password) => {
  console.log('UserActions/logout');
  return {
    type: LOGOUT,
    payload: USER_API.logout(email, password)
  };
}