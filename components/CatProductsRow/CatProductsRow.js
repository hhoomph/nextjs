import React, { Fragment, useState, useEffect, memo } from "react";
import Link from "../Link";
import Category from "./Category";
import Sort from "./Sort";
import Product from "./Product";
import fetchData from "../../utils/fetchData";
import Loading from "../Loader/Loading";
import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";
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
  const getOnlineProducts = async () => {
    if (props._tkn !== undefined) {
      setLoading(true);
      const baseHub = new HubConnectionBuilder()
        .withUrl("https://api.qarun.ir/baseHub", {
          accessTokenFactory: () => {
            return props._tkn;
          }
        })
        .configureLogging(LogLevel.Error)
        .build();
      baseHub
        .start({ withCredentials: false })
        .then(function() {
          console.log("OnlineProducts baseHub connected");
          baseHub
            .invoke("GetOnlineUserProduct", {
              page: 1,
              pageSize: 10
            })
            .then(function(res) {
              console.log(res);
              let products = res || [];
              setProducts(products);
              setLoading(false);
            })
            .catch(err => console.error(err.toString()));
          // baseHub.on("GetStatus", res => {
          //   setUserOnline(res);
          // });
        })
        .catch(err => console.error(err.toString()));
    }
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
    <div className="container mb-1 cat_product_row">
      <div className="row">
        <div className="col">
          {/* <div className="row d-flex justify-content-start rtl pr-2 categories"> <Category /></div> */}
          <div className="row d-flex justify-content-center rtl pr-1 mb-3 cat_sort">
            <Sort handleSort={handleSort} getOnlineProducts={getOnlineProducts} />
            <div className="col-12 mt-2 cat_title">
              <h3>اطراف</h3>
              <Link href={"/all-around"} passHref>
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
export default memo(CatProductsRow);
