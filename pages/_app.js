import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import AppContext from '../context/index';
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    let result;
    const { token } = nextCookie(ctx);
    /*
     * If `ctx.req` is available it means we are on the server.
     * Additionally if there's no token it means the user is not logged in.
     */
    // if (ctx.req && !token) {
    //   ctx.res.writeHead(302, { Location: '/login' });
    //   ctx.res.end();
    // }
    // // We already checked for server. This should only happen on client.
    // if (!token) {
    //   Router.push('/login');
    // }
    // Fetch Data
    // const apiBaseUrl = `https://www.pooshako.com/api/`;
    // const url = `${apiBaseUrl}Common/Location/GetProvinces`;
    // const response = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   }
    //   //body: JSON.stringify(image)
    // });
    // if (response.ok) {
    //   result = await response.json();
    // }
    return { pageProps, result };
  }
  constructor() {
    super();
    // this.state = {
    //   token: token
    // };
  }
  componentDidMount() {}
  componentWillUnmount() {}
  render() {
    const { Component, pageProps } = this.props;
    return (
      <AppContext.Provider value={{ result: this.props }}>
        <Head>
          <title>قارون</title>
        </Head>
        <Component {...pageProps} />
      </AppContext.Provider>
    );
  }
}
export default MyApp;