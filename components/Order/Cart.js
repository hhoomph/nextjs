import React, { Fragment, useState, useEffect, memo } from "react";
import Link from "../Link";
import dynamic from "next/dynamic";
import Router from "next/router";
import Loading from "../Loader/Loading";
import fetchData from "../../utils/fetchData";
import { FaTimesCircle, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import SubmitButton from "../Button/SubmitButton";
import { ToastContainer, toast } from "react-toastify";
import { numberSeparator, removeSeparator } from "../../utils/tools";
import "../../scss/components/cart.scss";
const Order = dynamic({
  loader: () => import("./Order"),
  loading: () => <Loading />,
  ssr: true
});
const Cart = props => {
  const nextCtx = props.ctx;
  const type = props.type;
  const showRow = props.id === props.showKey ? true : false;
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(1);
  const [call, setCall] = useState(false);
  const cartData = props.cartData || [];
  const getCartCount = cartData.reduce((acc, val) => {
    const { count } = val;
    return acc + count;
  }, 0);
  toast.configure({
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  switch (view) {
  case 1:
    return (
      <div
        className="container mb-2 cart"
        onClick={() => {
          setView(2);
        }}
      >
        <div className="row cart_seller pt-1 justify-content-end">
          <div className="col-5 m-auto rtl p-1 text-center">
            <div className="status_div">
              <div className="quantity">{getCartCount} عدد</div>
            </div>
            <div className="price">
              <span className="amount"> {numberSeparator(props.totalLastPrice)} </span> <span className="currency"> تومان </span>
            </div>
          </div>
          <div className="col-7 text-right d-flex p-1">
            <div className="col-9 p-0 align-self-center">
              <p className="seller_name seller_user_name d-block mr-2 text-truncate rtl">{props.sellerUserName}</p>
              <p className="seller_name seller_display_name d-block mr-2 text-truncate rtl">{props.sellerName}</p>
            </div>
            <img src={props.sellerAvatar} className="col-3 userImage" />
          </div>
          <div className="col-12 m-auto rtl p-0 pb-1 text-center">
            <div className="badge badge-warning">{props.pOrderStatus}</div>
          </div>
        </div>
      </div>
    );
    break;
  case 2:
    return (
      <>
        <Order
          cartData={cartData}
          userId={props.userId}
          sellerAvatar={props.sellerAvatar}
          sellerName={props.sellerName}
          type={props.type}
          orderId={props.orderId}
          orderStatus={props.orderStatus}
          reason4DisapprovedDelivery={props.reason4DisapprovedDelivery}
          sendDate={props.sendDate}
          totalPrice={props.totalPrice}
          totalDiscount={props.totalDiscount}
          totalLastPrice={props.totalLastPrice}
          id={props.id}
          customerId={props.customerId}
          pOrderStatus={props.pOrderStatus}
          orderPaymentType={props.orderPaymentType}
          pOrderPaymentType={props.pOrderPaymentType}
          pReason4DisapprovedDelivery={props.pReason4DisapprovedDelivery}
          pSendDate={props.pSendDate}
          sellerUserName={props.sellerUserName}
          sellerPhoneNumber={props.sellerPhoneNumber}
          incomAmount={props.incomAmount}
          orderPage={props.orderPage}
          setOrderPage={props.setOrderPage}
          setView={setView}
        />
      </>
    );
    break;
  default:
    return (
      <div
        className="container mb-2 cart"
        onClick={() => {
          setView(2);
        }}
      >
        <div className="row cart_seller pt-1 justify-content-end">
          <div className="col-5 m-auto rtl p-1 text-center">
            <div className="status_div">
              <div className="quantity">22 عدد</div>
            </div>
            <div className="price">
              <span className="amount"> 175,000 </span> <span className="currency"> تومان </span>
            </div>
          </div>
          <div className="col-7 text-right d-flex p-1">
            <div className="col-9 p-0 align-self-center">
              <p className="seller_name seller_user_name d-block mr-2 text-truncate rtl">{props.sellerUserName}</p>
              <p className="seller_name seller_display_name d-block mr-2 text-truncate rtl">{props.sellerName}</p>
            </div>
            <img src={props.sellerAvatar} className="col-3 userImage" />
          </div>
          <div className="col-12 m-auto rtl p-0 pb-1 text-center">
            <div className="badge badge-warning">{props.pOrderStatus}</div>
          </div>
        </div>
      </div>
    );
    break;
  }
};
export default memo(Cart);