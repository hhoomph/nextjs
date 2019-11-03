import React, { Fragment, useContext, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../components/Loader/Loading';
import fetchData from '../utils/fetchData';
import Nav from '../components/Nav/Nav';
import UserHeader from '../components/Head/userHeader';
import Product from '../components/Profile/product';
const Category = dynamic({
  loader: () => import('../components/CatProductsRow/Category'),
  loading: () => <Loading />,
  ssr: true
});
function Page(props) {
  console.log(props.result);
  const profileData = props.result.data || [];
  return (
    <>
      <Nav />
      <UserHeader profileData={profileData} userOnline={true} />
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
          <Product id={1} basket={true} showPrice={false} price={120000} oldPrice={'140000'} image={'product.png'} />
          <Product id={2} basket={true} showPrice={false} price={140000} image={'product3.png'} />
          <Product id={3} basket={true} showPrice={false} price={120000} image={'product2.png'} />
          <Product id={4} basket={true} showPrice={false} price={130000} image={'product.png'} />
          <Product id={5} basket={true} showPrice={false} price={120000} image={'product3.png'} />
          <Product id={6} basket={true} showPrice={false} price={110000} oldPrice={'120000'} image={'product2.png'} />
        </div>
      </div>
    </>
  );
}
Page.getInitialProps = async function (context) {
  const { id } = context.query;
  const result = await fetchData(
    `User/U_Account/OtherUserProfile/${id}`,
    {
      method: 'GET'
      // body: JSON.stringify({
      //   username: id
      // })
    },
    context
  );
  console.log(result);
  return { result };
};
export default Page;