import { Cookies } from 'react-cookie';
import { CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies();

export const checkEamil = (email: string): boolean => {
  var regEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  return regEmail.test(email);
};

export const setCookie = (
  name: string,
  value: string,
  options?: CookieSetOptions
) => {
  return cookies.set(name, value, options);
};
