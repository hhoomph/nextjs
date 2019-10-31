import React, { Fragment, useContext, useRef, useEffect } from 'react';
// import '../scss/style.scss';
import dynamic from 'next/dynamic';
import fetchData from '../utils/fetchData';
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
  const Following = props.Following.data || [];
  const GetMarketAround = props.GetMarketAround.data || [];
  const FriendsMarket = props.FriendsMarket.data || [];
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
      <UserSuggest users={Following} />
      <CatProductsRow products={GetMarketAround} />
      <Banners />
      <ProductsRow products={FriendsMarket} />
    </>
  );
}
App.getInitialProps = async function(context) {
  const Following = await fetchData(
    'User/U_Friends/Following',
    {
      method: 'GET'
    },
    context
  );
  const GetMarketAround = await fetchData(
    'User/U_Product/GetMarketAround',
    {
      method: 'POST',
      body: JSON.stringify({
        filters: 'New',
        categoryId: 1,
        page: 1,
        pageSize: 10
      })
    },
    context
  );
  const FriendsMarket = await fetchData(
    'User/U_Product/FriendsMarket',
    {
      method: 'POST',
      body: JSON.stringify({
        page: 1,
        pageSize: 6
      })
    },
    context
  );
  return { Following, GetMarketAround, FriendsMarket };
};
export default App;