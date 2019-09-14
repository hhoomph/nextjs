import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import Router from 'next/router';
const Logout = () => {
  cookie.remove('token');
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now());
  Router.push('/login');
};
export default Logout;