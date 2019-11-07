import React, { Fragment, useContext, useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../components/Loader/Loader';
import Router from 'next/router';
import Nav from '../components/Nav/Nav';
import ProfileHeader from '../components/Head/profileHeader';
import Product from '../components/Profile/product';
import Auth from '../components/Auth/Auth';
import fetchData from '../utils/fetchData';
const Category = dynamic({
  loader: () => import('../components/CatProductsRow/Category'),
  loading: () => <Loading />,
  ssr: true
});
const EditProfile = dynamic({
  loader: () => import('../components/Profile/editProfile'),
  loading: () => <Loading />,
  ssr: true
});
function Page(props) {
  const [view, setView] = useState(1);
  const resultData = props.result.data || [];
  const [profileData, setProfileData] = useState(resultData);
  console.log(profileData)
  // if (props.result.isSuccess) {
  //   setProfileData(props.result.data);
  // } else {
  //   setProfileData([]);
  // }
  switch (view) {
    case 1:
      if (typeof window !== 'undefined') {
        window.scroll(0, 0);
      }
      return (
        <>
          <Nav />
          <ProfileHeader profileData={profileData} setView={setView} userImage={`/static/img/profile.png`} />
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
            <div className="row d-flex justify-content-start rtl profile_products">
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
    case 2:
      return (
        <>
          <Nav />
          <EditProfile setView={setView} profileData={profileData} />
        </>
      );
      break;
    default:
      if (typeof window !== 'undefined') {
        window.scroll(0, 0);
      }
      return (
        <>
          <Nav />
          <ProfileHeader setView={setView} userImage={`/static/img/profile.png`} />
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
            <div className="row d-flex justify-content-start rtl profile_products">
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
  }
}
Page.getInitialProps = async function(context) {
  const result = await fetchData(
    'User/U_Account/Profile',
    {
      method: 'GET'
    },
    context
  );
  return { result };
};
export default Auth(Page);