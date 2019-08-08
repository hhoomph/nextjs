import React, { Fragment } from 'react';
import '../scss/style.scss';
import dynamic from 'next/dynamic';
import fetch from 'isomorphic-unfetch';
import Nav from '../components/Nav/Nav';
import UserSuggest from '../components/UserSuggest/UserSuggest';
import CatProductsRow from '../components/CatProductsRow/CatProductsRow';
import Banners from '../components/Banner/Banners';
import Loader from '../components/Loader/Loader';
import ProductsRow from '../components/ProductRow/ProductRow';
import IndexHeader from '../components/Head/IndexHeader';
// Use AMP
// import { useAmp } from 'next/amp';
// export const config = { amp: 'hybrid' };
const DynamicLogo = dynamic({
  loader: () => import('../static/img/logo.svg'),
  loading: () => (
    <div className="spinner-border text-warning" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  ),
  ssr: true
});
function App() {
  // Determine Server Or Browser env
  if (typeof window !== 'undefined' && window.document !== undefined) {
    //console.log('browser');
  } else if (process) {
    //console.log('node');
  }
  return (
    <>
      <IndexHeader/>
      <Nav />
      <UserSuggest />
      <CatProductsRow />
      <Banners />
      <ProductsRow/>
    </>
  );
}
export default App;