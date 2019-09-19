import React, { Fragment, useContext, useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../components/Loader/Loader';
import fetch from 'isomorphic-unfetch';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import Router from 'next/router';
import '../scss/style.scss';
import Nav from '../components/Nav/Nav';
import ProfileHeader from '../components/Head/profileHeader';
import Product from '../components/Profile/product';
import Auth from '../components/Auth/Auth';
const Category = dynamic({
  loader: () => import('../components/CatProductsRow/Category'),
  loading: () => <Loading />,
  ssr: true
});
function Page(props) {
  const [view, setView] = useState('show');
  switch (view) {
    case 'show':
      return (
        <>
          <Nav />
          <ProfileHeader setView={setView} userImage={`../../static/img/profile.png`} />
          <div className="container mb-1 cat_product_row">
            <div className="row">
              <div className="col">
                <div className="row d-flex justify-content-start rtl pr-2 categories">
                  <Category />
                </div>
              </div>
            </div>
          </div>
          <div className="container mb-5 pb-3 pt-3">
            <div className="row d-flex justify-content-start rtl products">
              <Product id={1} basket={false} showPrice={false} price={120000} delete={true} oldPrice={'140000'} image={'product.png'} />
              <Product id={2} basket={false} showPrice={false} price={140000} delete={true} image={'product3.png'} />
              <Product id={3} basket={false} showPrice={false} price={120000} delete={true} image={'product2.png'} />
              <Product id={4} basket={false} showPrice={false} price={130000} delete={true} image={'product.png'} />
              <Product id={5} basket={false} showPrice={false} price={120000} delete={true} image={'product3.png'} />
              <Product id={6} basket={false} showPrice={false} price={110000} delete={true} oldPrice={'120000'} image={'product2.png'} />
            </div>
          </div>
        </>
      );
      break;
    case 'edit1':
      return (
        <>
          <Nav />
          <ProfileHeader setView={setView} userImage={`../../static/img/profile.png`} />
        </>
      );
      break;
    case 'edit2':
      break;
    default:
      return (
        <>
          <Nav />
          <ProfileHeader setView={setView} userImage={`../../static/img/profile.png`} />
        </>
      );
      break;
  }
}
// Page.getInitialProps = async function(context) {
//   const { accessToken } = nextCookie(context);
//   // we are on the Server
//   if (context.req) {
//     if (!accessToken) {
//       context.res.writeHead(302, { Location: '/login' });
//       context.res.end();
//     }
//     console.log('server', accessToken);
//   } else {
//     // we are on the Client
//     if (!accessToken) {
//       Router.push('/login');
//     }
//     console.log('client', accessToken);
//   }
// };
export default Auth(Page);