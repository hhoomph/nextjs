import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import AppContext from '../context/index';
import getHost from '../utils/get-host';
import '../scss/style.scss';
class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
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
    return <Component {...pageProps} />;
  }
}
export default MyApp;