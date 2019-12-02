import React, { Fragment, useContext, useReducer, useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../components/Loader/Loading';
import fetchData from '../utils/fetchData';
import Nav from '../components/Nav/Nav';
import UserHeader from '../components/Head/userHeader';
import Product from '../components/Profile/product';
import { UserProductsContext } from '../context/context';
import { userProductsReducer } from '../context/reducer';
const Category = dynamic({
  loader: () => import('../components/profile/Category'),
  loading: () => <Loading />,
  ssr: true
});
function Page(props) {
  const profileData = props.result.data || [];
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const productsData = props.userProducts.data !== undefined && props.userProducts.data.model !== undefined ? props.userProducts.data.model : [];
  const [userProducts, userProductsDispatch] = useReducer(userProductsReducer, productsData);
  const userCategories = props.userCategories.data || [];
  userCategories.concat({ id: 0, parentId: null, picture: null, thumbNail: null, titel: 'همه' }).sort((a, b) => a.id - b.id);
  const [catActive, setCatActive] = useState(userCategories.length > 1 ? userCategories[0].id : null);
  //console.log(profileData, props.userProducts, userCategories);
  const showProducts = userProducts.map(product => (
    <Product
      key={product.productId}
      id={product.productId}
      profile={false}
      isDisable={product.isDisable}
      price={product.price}
      oldPrice={product.lastPrice}
      image={product.picture !== undefined && product.picture !== null ? `https://api.qaroon.ir/${product.picture}` : 'static/img/no-product-image.png'}
    />
  ));
  const getUserProduct = async () => {
    setLoading(true);
    const result = await fetchData(
      'User/U_Product/UserProduct',
      {
        method: 'POST',
        body: JSON.stringify({
          userId: profileData.id,
          categoryId: catActive,
          page: page,
          pageSize: 6
        })
      },
      props.ctx
    );
    if (result.isSuccess) {
      userProductsDispatch({ type: 'add', payload: result.data.model });
      setTimeout(() => setIsFetching(false), 200);
      setPage(page + 1);
    } else if (result.message != undefined) {
      setTimeout(() => setIsFetching(false), 200);
    } else if (result.error != undefined) {
      setTimeout(() => setIsFetching(false), 200);
    }
    setLoading(false);
  };
  const getUserProductFromCat = async () => {
    setLoading(true);
    const result = await fetchData(
      'User/U_Product/UserProduct',
      {
        method: 'POST',
        body: JSON.stringify({
          userId: profileData.id,
          categoryId: catActive,
          page: 1,
          pageSize: 6
        })
      },
      props.ctx
    );
    if (result !== undefined && result.isSuccess) {
      userProductsDispatch({ type: 'refresh', payload: [] });
      userProductsDispatch({ type: 'refresh', payload: result.data.model });
      setPage(2);
    }
    setLoading(false);
  };
  function handleScroll() {
    if (window.pageYOffset + 350 > window.innerHeight && !isFetching) {
      setIsFetching(true);
    } else {
      return;
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    if (!isFetching) return;
    getUserProduct();
  }, [isFetching]);
  useEffect(() => {
    getUserProductFromCat();
  }, [catActive]);
  return (
    <UserProductsContext.Provider value={userProductsDispatch}>
      <Nav />
      <UserHeader profileData={profileData} userOnline={true} />
      <div className="container mb-1 cat_product_row">
        <div className="row">
          <div className="col">
            <div className="row d-flex justify-content-start rtl pr-2 categories">
              <Category categories={userCategories} catActive={catActive} setCatActive={setCatActive} setPage={setPage} />
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-5 pb-3 pt-3">
        <div className="row d-flex justify-content-start rtl profile_products">{showProducts}</div>
        {loading && (
          <div
            style={{
              display: 'block !important',
              width: '100%',
              height: '40px',
              textAlign: 'center',
              marginTop: '0.1rem'
            }}
          >
            <Loading />
          </div>
        )}
      </div>
    </UserProductsContext.Provider>
  );
}
Page.getInitialProps = async function(context) {
  const { id } = context.query;
  const result = await fetchData(
    `User/U_Account/OtherUserProfile/${id}`,
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
        userId: id,
        categoryId: 1,
        page: 1,
        pageSize: 10
      })
    },
    context
  );
  // Get user's Categories
  // const userCategories = await fetchData(
  //   'User/U_Product/CategoiesHaveProduct',
  //   {
  //     method: 'GET'
  //   },
  //   context
  // );
  // Get All Categories
  const userCategories = await fetchData(
    'Common/C_Category/GetAllParentAsync',
    {
      method: 'GET'
    },
    context
  );
  return { result, userProducts, userCategories };
};
export default Page;