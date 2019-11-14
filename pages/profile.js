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
  loader: () => import('../components/profile/Category'),
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
  const productsCount = props.userProducts.data.count || 0;
  const productsData = props.userProducts.data.model || [];
  const [profileData, setProfileData] = useState(resultData);
  const [userCounts, setCounts] = useState(productsCount);
  const [userproducts, setUserproducts] = useState(productsData);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [isFetching, setIsFetching] = useState(false);
  console.log(profileData, props.userProducts);
  const showProducts = userproducts.map(product => (
    <Product
      key={product.productId}
      id={product.productId}
      profile={true}
      isDisable={product.isDisable}
      price={product.price}
      oldPrice={product.lastPrice}
      image={product.picture !== undefined && product.picture !== null ? `https://api.qaroon.ir/${product.picture}` : 'static/img/no-product-image.png'}
    />
  ));
  const getProfileData = async () => {
    const result = await fetchData(
      'User/U_Account/Profile',
      {
        method: 'GET'
      },
      props.ctx
    );
    if (result.isSuccess) {
      setProfileData(result.data);
    }
  };
  const getUserProduct = async () => {
    setLoading(true);
    const result = await fetchData(
      'User/U_Product/UserProduct',
      {
        method: 'POST',
        body: JSON.stringify({
          userId: profileData.id,
          categoryId: 1,
          page: page,
          pageSize: 6
        })
      },
      props.ctx
    );
    if (result.isSuccess) {
      setUserproducts(result.data);
    }
    setLoading(false);
  };
  const getCategoriesForUser = async () => {
    const result = await fetchData(
      'User/U_Product/CategoiesHaveProduct',
      {
        method: 'GET'
      },
      props.ctx
    );
    if (result.isSuccess) {
      console.log(result.data);
    }
  };
  useEffect(() => {
    getProfileData();
    getCategoriesForUser();
  }, [view]);
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
            <div className="row d-flex justify-content-start rtl profile_products">{showProducts}</div>
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
            <div className="row d-flex justify-content-start rtl profile_products">{showProducts}</div>
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
  const userProducts = await fetchData(
    'User/U_Product/UserProduct',
    {
      method: 'POST',
      body: JSON.stringify({
        userId: result.data.id,
        categoryId: 1,
        page: 1,
        pageSize: 10
      })
    },
    context
  );
  return { result, userProducts };
};
export default Auth(Page);