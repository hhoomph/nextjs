import React, { Fragment, useState, useEffect, memo } from "react";
import Link from "../Link";
import dynamic from "next/dynamic";
import Loading from "../Loader/Loading";
import { FaTimesCircle, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import SubmitButton from "../Button/SubmitButton";
import "../../scss/components/cart.scss";
const ProductRow = dynamic({
  loader: () => import("./ProductRow"),
  loading: () => <Loading />,
  ssr: true
});
const Cart = props => {
  const nextCtx = props.ctx;
  const type = props.type;
  const [showRow, setShowRow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [call, setCall] = useState(false);
  const { cartData } = props;
  const renderProductsRow = cartData.map(product => {
    switch (type) {
    case 1:
      return (
        <ProductRow
          key={product.productId}
          productId={product.productId}
          productName={product.productTitle}
          productImage={product.pictures[0].thumbNail}
          productPrice={product.productPrice}
          shopingCartId={product.id}
          productQuantity={product.count}
          setLoading={props.setLoading}
          type={props.type}
        />
      );
    case 2:
      return (
        <ProductRow
          key={product.id}
          productId={product.id}
          productName={product.title}
          productImage={product.pictures[0].thumbNail}
          productPrice={product.lastPrice}
          shopingCartId={product.id}
          productQuantity={product.count}
          setLoading={props.setLoading}
          type={props.type}
        />
      );
    case 3:
      return (
        <ProductRow
          key={product.id}
          productId={product.id}
          productName={product.title}
          productImage={product.pictures[0].thumbNail}
          productPrice={product.lastPrice}
          shopingCartId={product.id}
          productQuantity={product.count}
          setLoading={props.setLoading}
          type={props.type}
        />
      );
    default:
      break;
    }
    // <ProductRow
    //   key={product.productId}
    //   productId={product.productId}
    //   productName={product.productTitle}
    //   productImage={product.pictures[0].thumbNail}
    //   productPrice={product.productPrice}
    //   shopingCartId={product.id}
    //   productQuantity={product.count}
    //   setLoading={props.setLoading}
    // />;
  });
  const toggleRow = () => {
    if (showRow) {
      return <FaChevronUp onClick={() => setShowRow(!showRow)} className="font_icon up" />;
    } else {
      return <FaChevronDown onClick={() => setShowRow(!showRow)} className="font_icon down" />;
    }
  };
  const changeCall = () => {
    setTimeout(() => {
      setCall(true);
    }, 10000);
  };
  return (
    <div className="container cart">
      <div className={"row cart_seller justify-content-end"} onClick={() => setShowRow(!showRow)}>
        <div className="col-2 align-self-center text-left">
          <a className="nav_Icons active">{toggleRow()}</a>
        </div>
        <div className="col-10 text-right p-0">
          <p className="seller_name d-inline-block mr-2 text-truncate">{props.sellerUserName}</p>
          <img src={props.sellerAvatar} className="userImage" />
          {type !== 1 && (
            <div className="col-12 p-0 pr-5 text-center" style={{ marginTop: "-10px" }}>
              <div className="badge badge-warning">{props.pOrderStatus}</div>
            </div>
          )}
        </div>
      </div>
      <div className="row products_rows" hidden={!showRow}>
        {renderProductsRow}
      </div>
      {type === 2 && (
        <div className="row d-flex justify-content-around rtl contact_row">
          <SubmitButton loading={loading} onClick={console.log("")} text="تحویل گرفتم" className="d-inline-block delivered" />
          {/* Call To Seller */}
          <a className="tell_call" title="تماس با فروشنده" href={`tel:${props.sellerPhoneNumber}`} onClick={changeCall}>
            <IoMdCall className="font_icon" />
          </a>
          {call && <SubmitButton loading={loading} onClick={console.log("")} text="لغو سفارش" className="d-inline-block cancel" />}
        </div>
      )}
    </div>
  );
};
export default memo(Cart);