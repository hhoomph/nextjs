import React, { Fragment, useState, useEffect, memo } from "react";
import Link from "../Link";
import dynamic from "next/dynamic";
import fetchData from "../../utils/fetchData";
import Loading from "../Loader/Loading";
import "../../scss/components/catProductsRow.scss";
const Product = dynamic({
  loader: () => import("./Product.js"),
  loading: () => <Loading />,
  ssr: true
});
const FirstCatProductsRow = props => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hide, setHide] = useState(false);
  const [more, setMore] = useState(false);
  const isLogin = props.isLogin;
  const getCategoryProducts = async () => {
    setLoading(true);
    let GetMarketAroundInCategory;
    if (isLogin) {
      GetMarketAroundInCategory = await fetchData(
        "User/U_Product/GetMarketAroundWithCategory",
        {
          method: "POST",
          body: JSON.stringify({
            filters: "New",
            categoryId: props.id,
            page: 1,
            pageSize: 10
          })
        },
        props.ctx
      );
    } else {
      GetMarketAroundInCategory = await fetchData(
        "User/U_Product/Home",
        {
          method: "POST",
          body: JSON.stringify({
            filters: "New",
            categoryId: props.id,
            page: 1,
            pageSize: 10
          })
        },
        props.ctx
      );
    }
    if (GetMarketAroundInCategory !== undefined && GetMarketAroundInCategory.isSuccess) {
      setProducts(GetMarketAroundInCategory.data);
      if (GetMarketAroundInCategory.data.length <= 0) {
        setHide(true);
      }
      if (GetMarketAroundInCategory.data.length >= 10) {
        setMore(true);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    getCategoryProducts();
  }, []);
  const renderProducts = () => {
    if (loading) {
      return (
        <div style={{ display: "block !important", width: "100%", height: "40px", textAlign: "center" }}>
          <Loading />
        </div>
      );
    } else {
      const productsElements = products.map(product => {
        const productThumbNail = product.pictures[0] != undefined ? `https://api.qarun.ir/${product.pictures[0].thumbNail}` : "/static/img/no-product-image.png";
        return (
          <Product
            key={product.id}
            id={product.id}
            productName={product.title}
            price={product.lastPrice}
            oldPrice={product.price}
            image={productThumbNail}
            userId={product.sellerUserName}
            sellerAvatar={product.sellerAvatar !== undefined && product.sellerAvatar !== null ? `https://api.qarun.ir/${product.sellerAvatar}` : "/static/img/no-userimage.png"}
            sellerUserName={product.sellerUserName}
          />
        );
      });
      return productsElements;
    }
  };
  return (
    <div className="container mb-1 cat_product_row first_cat_product_row" hidden={hide}>
      <div className="row">
        <div className="col">
          <div className="row d-flex justify-content-center rtl pr-1 mb-3 cat_sort">
            <div className="col-12 mt-2 cat_title">
              <h3>{props.title}</h3>
              {/* {more && (
                <Link href={`category/${props.id}`} passHref>
                  <a className="more">همه</a>
                </Link>
              )} */}
              <Link href={`/categories/${props.id}`} passHref>
                <a className="more">همه</a>
              </Link>
            </div>
          </div>
          <div className="row d-flex justify-content-start rtl products">{renderProducts()}</div>
        </div>
      </div>
    </div>
  );
};
export default memo(FirstCatProductsRow);