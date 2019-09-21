import { useEffect } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
export const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === 'logout') {
        console.log('logged out from storage!');
        cookie.remove('accessToken');
        cookie.remove('refreshToken');
        Router.push('/login');
      }
    };
    useEffect(() => {
      window.addEventListener('storage', syncLogout);
      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      };
    }, [null]);
    return <WrappedComponent {...props} />;
  };
  Wrapper.getInitialProps = async ctx => {
    const accessToken = auth(ctx);
    const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps, accessToken };
  };
  return Wrapper;
};
const auth = ctx => {
  const { accessToken } = nextCookie(ctx);
  /*
   * If `ctx.req` is available it means we are on the server.
   * Additionally if there's no accessToken it means the user is not logged in.
   */
  if (ctx.req && !accessToken) {
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();
  }
  // We already checked for server. This should only happen on client.
  if (!accessToken) {
    Router.push('/login');
  }
  return accessToken;
};
export default withAuthSync;