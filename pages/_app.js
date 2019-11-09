import React, { useReducer } from 'react';
import App from 'next/app';
import Head from 'next/head';
import fetchData from '../utils/fetchData';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import { CartCountContext } from '../context/context';
import { cartCountReduser } from '../context/reducer';
import getHost from '../utils/get-host';
import '../scss/style.scss';
class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // Add Cart Count Context Later
    // const GetCartCount = await fetchData(
    //   'User/U_Cart/GetAll',
    //   {
    //     method: 'GET'
    //   },
    //   context
    // );
    // if (GetCartCount !== undefined && GetCartCount.isSuccess) {
    //   let cData = GetCartCount.data || [];
    //   cartDispatch({ type: 'refresh', payload: cData });
    // } else if (GetCartCount !== undefined && GetCartCount.message != undefined) {
    // } else if (GetCartCount !== undefined && GetCartCount.error != undefined) {
    // }
    if (router.route !== '/login') {
      //console.log(router);
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