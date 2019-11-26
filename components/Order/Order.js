import React, { Fragment, useState, useEffect, memo } from "react";
import Link from "../Link";
import dynamic from "next/dynamic";
import Loading from "../Loader/Loading";
import { FaTimesCircle, FaChevronUp, FaChevronDown } from "react-icons/fa";
import "../../scss/components/order.scss";
const ProductRow = dynamic({
  loader: () => import("./ProductRow"),
  loading: () => <Loading />,
  ssr: true
});
const Order = props => {
  const nextCtx = props.ctx;
  const [showRow, setShowRow] = useState(true);
  const { orderData } = props;
  // const renderProductsRow = orderData.cartDetailsSelectDtos.map(product => (
  //   <ProductRow
  //     key={product.productId}
  //     productId={product.productId}
  //     productName={product.productTitle}
  //     productImage={product.pictures[0].thumbNail}
  //     productPrice={product.productPrice}
  //     shopingCartId={product.id}
  //     productQuantity={product.count}
  //     setLoading={props.setLoading}
  //   />
  // ));
  const toggleRow = () => {
    if (showRow) {
      return <FaChevronUp onClick={() => setShowRow(!showRow)} className="font_icon up" />;
    } else {
      return <FaChevronDown onClick={() => setShowRow(!showRow)} className="font_icon down" />;
    }
  };
  return (
    <div className="container mb-2 cart p-0 pr-1 pl-1">
      <div className="row pt-1 pb-1 cart_seller" onClick={() => setShowRow(!showRow)}>
        <div className="col-6 m-auto rtl p-0 pl-1 text-center">
          <div className="status_div">
            <div className="badge badge-warning">در انتظار تایید</div>
            <div className="quantity">{props.quantity} عدد</div>
          </div>
          <div className="price">
            <span className="amount"> 175,000 </span> <span className="currency"> تومان </span>
          </div>
        </div>
        <div className="col-6 text-right d-flex p-0 pr-1">
          <div className="col-9 p-0 align-self-center">
            <p className="seller_name d-block mr-2 text-truncate rtl">{props.sellerName}</p>
            <p className="seller_name seller_display_name d-block mr-2 text-truncate rtl">{props.displayName}</p>
          </div>
          <img src={props.sellerAvatar} className="col-3 userImage" />
        </div>
      </div>
      {props.showProduct && (
        <div className="row products_rows" hidden={!showRow}>
          <ProductRow productName={"نام کالای یک"} productImage={"static/img/no-product-image.png"} productPrice={550000} productQuantity={2} />
          <ProductRow productName={"نام کالای دو"} productImage={"static/img/product2.png"} productPrice={6550000} productQuantity={1} />
          <ProductRow productName={"نام کالای سه"} productImage={"static/img/product3.png"} productPrice={1050000} productQuantity={1} />
          <ProductRow productName={"نام کالای چهار"} productImage={"static/img/product.png"} productPrice={250000} productQuantity={4} />
        </div>
      )}
    </div>
  );
};
export default memo(Order);