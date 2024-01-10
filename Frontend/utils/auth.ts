import cookie from 'js-cookie';
import constants from './constants';

export const setCookie = (key: string, value: string) => {
  cookie.set(key, value, { expires: 1 });
};

export const getCookie = (key:string) => {
  return cookie.get(key)
}

export const removeCookie = (key:string)=> {
  cookie.remove(key)
}
export const setAuthentication = (token: string) => {
  setCookie(constants.TOKEN, token);
};

export const logOut= () => (
  removeCookie("AuthToken")
)