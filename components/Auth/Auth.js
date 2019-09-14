import { Component } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
const getDisplayName = Component => Component.displayName || Component.name || 'Component';
function withAuthSync(WrappedComponent) {
  return class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;
    static async getInitialProps(ctx) {
      const accessToken = auth(ctx);
      const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));
      return { ...componentProps, accessToken };
    }
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      window.addEventListener('storage', this.syncLogout);
    }
    componentWillUnmount() {
      window.removeEventListener('storage', this.syncLogout);
      window.localStorage.removeItem('logout');
    }
    syncLogout(event) {
      if (event.key === 'logout') {
        console.log('logged out from storage!');
        cookie.remove('accessToken');
        cookie.remove('refreshToken');
        Router.push('/login');
      }
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
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