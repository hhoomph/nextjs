import React, { Fragment, useState, useEffect, memo } from "react";
import Link from "../Link";
import Category from "./Category";
import Sort from "./Sort";
import Product from "./Product";
import fetchData from "../../utils/fetchData";
import Loading from "../Loader/Loading";
import "../../scss/components/catProductsRow.scss";
const CatProductsRow = props => {
  const [products, setProducts] = useState(props.products);
  const [sortFilter, setSortFilter] = useState("New");
  const handleSort = sortType => {
    setSortFilter(sortType);
  };
  const [loading, setLoading] = useState(false);
  const getProducts = async () => {
    setLoading(true);
    let GetMarketAround = await fetchData(
      "User/U_Product/GetMarketAround",
      {
        method: "POST",
        body: JSON.stringify({
          filters: sortFilter,
          categoryId: 1,
          page: 1,
          pageSize: 10
        })
      },
      props.ctx
    );
    if (GetMarketAround !== undefined && GetMarketAround.isSuccess) {
      let products = GetMarketAround.data || [];
      setProducts(products);
    } else if (GetMarketAround !== undefined && GetMarketAround.message != undefined) {
      //toast.warn(GetMarketAround.message);
    } else if (GetMarketAround !== undefined && GetMarketAround.error != undefined) {
      //toast.error(GetMarketAround.error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getProducts();
  }, [sortFilter]);
  const renderProducts = () => {
    if (loading) {
      return (
        <div style={{ display: "block !important", width: "100%", height: "40px", textAlign: "center" }}>
          <Loading />
        </div>
      );
    } else {
      const productsElements = products.map(product => {
        const productThumbNail =
          product.pictures[0] != undefined
            ? `https://api.qaroon.ir/${product.pictures[0].thumbNail}`
            : "/static/img/no-product-image.png";
        return (
          <Product
            key={product.id}
            id={product.id}
            productName={product.title}
            price={product.lastPrice}
            oldPrice={product.price}
            image={productThumbNail}
            userId={product.sellerUserName}
            sellerAvatar={`https://api.qaroon.ir/${product.sellerAvatar}`}
            sellerUserName={product.sellerUserName}
          />
        );
      });
      return productsElements;
    }
  };
  // products.map(product => {
  //   const productThumbNail = product.pictures[0] != undefined ? `https://api.qaroon.ir/${product.pictures[0].thumbNail}` : '/static/img/no-product-image.png';
  //   if (loading) {
  //     return <Loading />;
  //   } else {
  //     return (
  //       <Product
  //         key={product.id}
  //         id={product.id}
  //         productName={product.title}
  //         price={product.price}
  //         oldPrice={product.lastPrice}
  //         image={productThumbNail}
  //         userId={product.sellerUserName}
  //         sellerAvatar={`https://api.qaroon.ir/${product.sellerAvatar}`}
  //         sellerUserName={product.sellerUserName}
  //       />
  //     );
  //   }
  // });
  return (
    <div className="container mb-1 cat_product_row">
      <div className="row">
        <div className="col">
          {/* <div className="row d-flex justify-content-start rtl pr-2 categories"> <Category /></div> */}
          <div className="row d-flex justify-content-center rtl pr-1 mb-3 cat_sort">
            <div className="col-12 mt-2 cat_title">
              <h3>اطراف</h3>
              <Link href={``} passHref>
                <a className="more">بیشتر</a>
              </Link>
            </div>
            <Sort handleSort={handleSort} />
          </div>
          <div className="row d-flex justify-content-start rtl products">
            {renderProducts()}
            {/* <Product id={1} price={120000} oldPrice={'140000'} image={'product.png'} userId={1} />
            <Product id={2} price={140000} image={'product3.png'} userId={2} />
            <Product id={3} price={120000} image={'product2.png'} userId={1} />
            <Product id={4} price={130000} image={'product.png'} userId={2} />
            <Product id={5} price={120000} image={'product3.png'} userId={3} />
            <Product id={6} price={110000} oldPrice={'120000'} image={'product2.png'} userId={2} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(CatProductsRow);