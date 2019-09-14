import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import AppContext from '../context/index';
import getHost from '../utils/get-host';
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    let result;
    const { accessToken } = nextCookie(ctx);
    /*
     * If `ctx.req` is available it means we are on the server.
     * Additionally if there's no accessToken it means the user is not logged in.
     */
    // if (ctx.req && !accessToken) {
    //   ctx.res.writeHead(302, { Location: '/login' });
    //   ctx.res.end();
    // }
    // // We already checked for server. This should only happen on client.
    // if (!accessToken) {
    //   Router.push('/login');
    // }
    // Fetch Data
    const apiUrl = `${getHost()}Common/C_Location/GetAllProvince`;
    // const response = await fetch(apiUrl, {
    //   method: 'GET',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   credentials: 'include'
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
    //   accessToken: accessToken
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