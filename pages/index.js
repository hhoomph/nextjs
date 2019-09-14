import React, { Fragment, useContext, useRef, useEffect } from 'react';
import '../scss/style.scss';
import dynamic from 'next/dynamic';
import fetch from 'isomorphic-unfetch';
import Nav from '../components/Nav/Nav';
import Loading from '../components/Loader/Loading';
import IndexHeader from '../components/Head/IndexHeader';
import AppContext from '../context/index';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
// Use AMP
// import { useAmp } from 'next/amp';
// export const config = { amp: 'hybrid' };
const UserSuggest = dynamic({
  loader: () => import('../components/UserSuggest/UserSuggest'),
  loading: () => <Loading />,
  ssr: false
});
const CatProductsRow = dynamic({
  loader: () => import('../components/CatProductsRow/CatProductsRow'),
  loading: () => <Loading />,
  ssr: true
});
const Banners = dynamic({
  loader: () => import('../components/Banner/Banners'),
  loading: () => <Loading />,
  ssr: false
});
const ProductsRow = dynamic({
  loader: () => import('../components/ProductRow/ProductRow'),
  loading: () => <Loading />,
  ssr: true
});
function App(props) {
  //const res = useContext(AppContext);
  //console.log(res.result);
  //console.log(props.result);
  // Determine Server Or Browser env
  if (typeof window !== 'undefined' && window.document !== undefined) {
    //console.log('browser');
  } else if (process) {
    //console.log('node');
  }
  return (
    <>
      <IndexHeader />
      <Nav />
      <UserSuggest />
      <CatProductsRow />
      <Banners />
      <ProductsRow />
    </>
  );
}
App.getInitialProps = async function(context) {
  // console.log(process.env.API_HOST);
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
  // const result = await response.json();
  // return { result };
  //cookie.set('token', 'tokenCookie', { expires: 30 });
  // cookie.remove('token');
};
export default App;