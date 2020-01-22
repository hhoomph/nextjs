import React, { Fragment, useContext, useReducer, useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Loading from "../components/Loader/Loading";
import { useRouter } from "next/router";
import Nav from "../components/Nav/Nav";
import ProfileHeader from "../components/Head/profileHeader";
import Product from "../components/Profile/product";
import Auth from "../components/Auth/Auth";
import fetchData from "../utils/fetchData";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import "../scss/components/favoritePage.scss";
const User = dynamic({
  loader: () => import("../components/Friend/User"),
  loading: () => <Loading />,
  ssr: true
});
function Page(props) {
  const Router = useRouter();
  const Favorite = props.Favorite.data.model || [];
  const [favorites, setFavorites] = useState(Favorite);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const productRef = useRef();
  const showProducts = favorites.map(product => (
    <Product
      key={product.productId}
      id={product.productId}
      name={product.title}
      profile={false}
      favorite={true}
      sellerUserName={product.sellerUserName}
      sellerAvatar={product.sellerAvatar !== undefined && product.sellerAvatar !== null ? `https://api.qarun.ir/${product.sellerAvatar}` : "/static/img/no-userimage.png"}
      isDisable={product.isDisable}
      price={product.lastPrice}
      oldPrice={product.price}
      image={product.picture !== undefined && product.picture !== null ? `https://api.qarun.ir/${product.picture}` : "/static/img/no-product-image.png"}
    />
  ));
  const getFavoriteProduct = async () => {
    setLoading(true);
    const result = await fetchData(
      "User/U_Favorite/GetAll",
      {
        method: "POST",
        body: JSON.stringify({
          page: page,
          pageSize: 9
        })
      },
      props.ctx
    );
    if (result !== undefined && result.isSuccess) {
      if (page === 1) {
        setFavorites(result.data.model);
      } else {
        setFavorites(favorites.concat(result.data.model));
      }
      if (result.data.model.length >= 9) {
        setPage(page + 1);
        setTimeout(() => setIsFetching(false), 200);
      }
    } else if (result.message != undefined) {
      setTimeout(() => setIsFetching(false), 200);
    } else if (result.error != undefined) {
      setTimeout(() => setIsFetching(false), 200);
    }
    setLoading(false);
  };
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 60 < document.documentElement.offsetHeight || isFetching) return;
    setIsFetching(true);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (!isFetching) return;
    getFavoriteProduct();
  }, [isFetching]);
  return (
    <>
      <title>قارون</title>
      <Nav _tkn={props._tkn} />
      <div className="container favorite_title">
        <div className="row p-2 cart_title">
          <div className="col-10 text-center align-self-center">
            <h6 className="ml-5 pl-3 mt-1 page_title">علاقه مندی ها</h6>
          </div>
          <div className="col-2 text-right align-self-center pr-1">
            <FiChevronRight className="font_icon" onClick={() => Router.back()} />
          </div>
        </div>
      </div>
      <div className="container rtl pb-5 pt-2 favorite_page">
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
    </>
  );
}
Page.getInitialProps = async function(context) {
  const Favorite = await fetchData(
    "User/U_Favorite/GetAll",
    {
      method: "POST",
      body: JSON.stringify({
        page: 1,
        pageSize: 9
      })
    },
    context
  );
  return { Favorite };
};
export default Auth(Page);