import React, { Fragment, useState, useEffect, memo } from "react";
import Link from "../Link";
import Product from "./Product";
import fetchData from "../../utils/fetchData";
import Loading from "../Loader/Loading";
import "../../scss/components/productRow.scss";
const ProductsRow = props => {
  const [products, setProducts] = useState(props.products);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [isFetching, setIsFetching] = useState(false);
  const getProducts = async () => {
    setLoading(true);
    const FriendsMarket = await fetchData(
      "User/U_Product/FriendsMarket",
      {
        method: "POST",
        body: JSON.stringify({
          page: page,
          pageSize: 6
        })
      },
      props.ctx
    );
    if (FriendsMarket.isSuccess) {
      let newProducts = FriendsMarket.data || [];
      const p = products.concat(newProducts);
      // Remove duplicate products in array with id
      const result = [];
      const map = new Map();
      for (const item of p) {
        if (!map.has(item.id)) {
          map.set(item.id, true); // set any value to Map
          result.push(item);
        }
      }
      setProducts(result);
      setTimeout(() => setIsFetching(false), 200);
      if (newProducts.length >= 6) {
        setPage(page + 1);
      }
    } else if (FriendsMarket.message != undefined) {
      setTimeout(() => setIsFetching(false), 200);
    } else if (FriendsMarket.error != undefined) {
      setTimeout(() => setIsFetching(false), 200);
    }
    setLoading(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (!isFetching) return;
    getProducts();
  }, [isFetching]);
  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop + 100 < document.documentElement.offsetHeight || isFetching) return;
    // console.log(page)
    // setPage(page + 1);
    setIsFetching(true);
    // if (window.pageYOffset > window.innerHeight && !isFetching) {
    //   setIsFetching(true);
    // } else {
    //   return;
    // }
  }
  const renderProducts = products.map(product => {
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
        sellerAvatar={product.sellerAvatar !== undefined && product.sellerAvatar !== null ? `https://api.qarun.ir/${product.sellerAvatar}` : "/static/img/no-userimage.svg"}
        sellerUserName={product.sellerUserName}
        cartCount={product.cartCount}
      />
    );
  });
  return (
    <div className="container mt-1 mb-5 p-0 pb-5">
      <div className="row rtl m-auto product_row">
        <div className="col-12 mt-2 cat_title">
          <h3 className="pb-2">دوستان</h3>
        </div>
        {renderProducts}
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
    </div>
  );
};
export default memo(ProductsRow);