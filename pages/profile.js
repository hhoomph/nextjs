import React, { Fragment, useContext, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../components/Loader/Loader';
import fetch from 'isomorphic-unfetch';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import '../scss/style.scss';
import Nav from '../components/Nav/Nav';
import ProfileHeader from '../components/Head/profileHeader';
import Product from '../components/Profile/product';
const Category = dynamic({
  loader: () => import('../components/CatProductsRow/Category'),
  loading: () => <Loading />,
  ssr: true
});
function Page(props) {
  return (
    <>
      <Nav />
      <ProfileHeader userImage={`../../static/img/profile.png`} />
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
}
Page.getInitialProps = async function(context) {
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
};
export default Page;