import React, { Fragment, useContext, useReducer, useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Loading from "../components/Loader/Loading";
import Router from "next/router";
import Nav from "../components/Nav/Nav";
import ProfileHeader from "../components/Head/profileHeader";
import Product from "../components/Profile/product";
import Auth from "../components/Auth/Auth";
import fetchData from "../utils/fetchData";
import { UserProductsContext } from "../context/context";
import { userProductsReducer } from "../context/reducer";
const Category = dynamic({
  loader: () => import("../components/profile/Category"),
  loading: () => <Loading />,
  ssr: true
});
const EditProfile = dynamic({
  loader: () => import("../components/Profile/editProfile"),
  loading: () => <Loading />,
  ssr: true
});
function Page(props) {
  const [view, setView] = useState(1);
  const resultData = props.result.data || [];
  const productsData = props.userProducts.data !== undefined ? props.userProducts.data.model : [];
  const [profileData, setProfileData] = useState(resultData);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [userProducts, userProductsDispatch] = useReducer(userProductsReducer, productsData);
  let userCategories = props.userCategories.data || [];
  userCategories = [].concat(userCategories, { id: 0, parentId: null, picture: null, thumbNail: null, titel: "همه" }).sort((a, b) => a.id - b.id);
  const [catActive, setCatActive] = useState(userCategories.length > 0 ? userCategories[0].id : null);
  //console.log(profileData, props.userProducts, userCategories);
  const showProducts = userProducts.map(product => (
    <Product
      key={product.productId}
      id={product.productId}
      name={product.title}
      profile={true}
      isDisable={product.isDisable}
      price={product.lastPrice}
      oldPrice={product.price}
      image={product.picture !== undefined && product.picture !== null ? `https://api.qarun.ir/${product.picture}` : "static/img/no-product-image.png"}
    />
  ));
  const getProfileData = async () => {
    const result = await fetchData(
      "User/U_Account/Profile",
      {
        method: "GET"
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
      "User/U_Product/UserProduct",
      {
        method: "POST",
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
      userProductsDispatch({ type: "add", payload: result.data.model });
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
      "User/U_Product/UserProduct",
      {
        method: "POST",
        body: JSON.stringify({
          userId: profileData.id,
          categoryId: catActive,
          page: 1,
          pageSize: 6
        })
      },
      props.ctx
    );
    if (result.isSuccess) {
      userProductsDispatch({ type: "refresh", payload: [] });
      userProductsDispatch({ type: "refresh", payload: result.data.model });
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
  const productRef = useRef();
  const scrollToProducts = () => {
    const productsDiv = productRef.current.clientHeight;
    const t = window.innerHeight - productsDiv + 100;
    window.scrollTo(0, t);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (!isFetching) return;
    getUserProduct();
  }, [isFetching]);
  useEffect(() => {
    getProfileData();
  }, [view]);
  useEffect(() => {
    getUserProductFromCat();
  }, [catActive]);
  switch (view) {
  case 1:
    if (typeof window !== "undefined") {
      //window.scroll(0, 0);
    }
    return (
      <UserProductsContext.Provider value={userProductsDispatch}>
        <Nav />
        <ProfileHeader profileData={profileData} setView={setView} scrollToProducts={scrollToProducts} />
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
          <div className="row d-flex justify-content-start rtl profile_products" ref={productRef}>
            {showProducts}
          </div>
          {loading && (
            <div
              style={{
                display: "block !important",
                width: "100%",
                height: "40px",
                textAlign: "center",
                marginTop: "0.1rem"
              }}
            >
              <Loading />
            </div>
          )}
        </div>
      </UserProductsContext.Provider>
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
    if (typeof window !== "undefined") {
      window.scroll(0, 0);
    }
    return (
      <UserProductsContext.Provider value={userProductsDispatch}>
        <Nav />
        <ProfileHeader setView={setView} profileData={profileData} scrollToProducts={scrollToProducts} />
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
          <div className="row d-flex justify-content-start rtl profile_products" ref={productRef}>
            {showProducts}
          </div>
          {loading && (
            <div
              style={{
                display: "block !important",
                width: "100%",
                height: "40px",
                textAlign: "center",
                marginTop: "0.1rem"
              }}
            >
              <Loading />
            </div>
          )}
        </div>
      </UserProductsContext.Provider>
    );
    break;
  }
}
Page.getInitialProps = async function(context) {
  const req = context.req;
  const result = await fetchData(
    "User/U_Account/Profile",
    {
      method: "GET"
    },
    context
  );
  let userProducts = [];
  let userCategories = [];
  if (result !== undefined && result.data !== undefined && result.data.id !== undefined) {
    userProducts = await fetchData(
      "User/U_Product/UserProduct",
      {
        method: "POST",
        body: JSON.stringify({
          userId: result.data.id,
          categoryId: 0,
          page: 1,
          pageSize: 10
        })
      },
      context
    );
    userCategories = await fetchData(
      `User/U_Product/CategoiesHaveProduct?userId=${result.data.id}`,
      {
        method: "GET"
      },
      context
    );
  }
  return { result, userProducts, userCategories, isServer: !!req, date: new Date() };
};
export default Auth(Page);