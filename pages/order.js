import React, { Fragment, useContext, useState, useRef, useEffect, useReducer, memo } from "react";
import dynamic from "next/dynamic";
import fetchData from "../utils/fetchData";
import Nav from "../components/Nav/Nav";
import Loading from "../components/Loader/Loading";
import Auth from "../components/Auth/Auth";
import SubmitButton from "../components/Button/SubmitButton";
import Link from "../components/Link";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { FaPlus, FaCheck, FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { FaShoppingCart, FaCartPlus, FaCartArrowDown } from "react-icons/fa";
import { numberSeparator, removeSeparator } from "../utils/tools";
import { CartContext, CartCountContext } from "../context/context";
import { cartReduser, cartCountReduser } from "../context/reducer";
import "../scss/components/cartPage.scss";
const Cart = dynamic({
  loader: () => import("../components/Order/Cart"),
  loading: () => <Loading />,
  ssr: true
});
function Page(props) {
  const nextCtx = props.ctx;
  const [view, setView] = useState(1);
  const [openData, setOpenData] = useState(props.OpenOrder.data || []);
  const [historyData, setHistoryData] = useState([]);
  const [showKey, setShowKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [orderPage, setOrderPage] = useState(false);
  toast.configure({
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  const renderOpen = openData.map(cart => {
    const customerImg =
      cart.customerAvatar !== undefined && cart.customerAvatar !== null ? `https://api.qarun.ir/${cart.customerAvatar}` : "/static/img/no-userimage.png";
    return (
      <Cart
        key={cart.orderId + cart.id}
        userId={cart.customerId}
        cartData={cart.products}
        customerAvatar={customerImg}
        sellerName={cart.sellerDisplayName}
        customerDisplayName={cart.customerDisplayName}
        setLoading={setLoading}
        type={view}
        description={cart.description}
        orderId={cart.orderId}
        orderStatus={cart.orderStatus}
        reason4DisapprovedDelivery={cart.reason4DisapprovedDelivery}
        sendDate={cart.sendDate}
        totalPrice={cart.totalPrice}
        totalDiscount={cart.totalDiscount}
        totalLastPrice={cart.totalLastPrice}
        id={cart.id}
        customerId={cart.customerId}
        pOrderStatus={cart.pOrderStatus}
        orderPaymentType={cart.orderPaymentType}
        pOrderPaymentType={cart.pOrderPaymentType}
        pReason4DisapprovedDelivery={cart.pReason4DisapprovedDelivery}
        pSendDate={cart.pSendDate}
        sellerUserName={cart.sellerUserName}
        customerUserName={cart.customerUserName}
        sellerPhoneNumber={cart.sellerPhoneNumber}
        customerPhoneNumber={cart.customerPhoneNumber}
        incomAmount={cart.incomAmount}
        setOpenData={setOpenData}
        showKey={showKey}
        setShowKey={setShowKey}
        orderPage={orderPage}
        setOrderPage={setOrderPage}
      />
    );
  });
  const renderHistory = historyData.map(cart => {
    const customerImg =
      cart.customerAvatar !== undefined && cart.customerAvatar !== null ? `https://api.qarun.ir/${cart.customerAvatar}` : "/static/img/no-userimage.png";
    return (
      <Cart
        key={cart.orderId + cart.id}
        userId={cart.customerId}
        cartData={cart.products}
        customerAvatar={customerImg}
        sellerName={cart.sellerDisplayName}
        customerDisplayName={cart.customerDisplayName}
        setLoading={setLoading}
        type={view}
        description={cart.description}
        orderId={cart.orderId}
        orderStatus={cart.orderStatus}
        reason4DisapprovedDelivery={cart.reason4DisapprovedDelivery}
        sendDate={cart.sendDate}
        totalPrice={cart.totalPrice}
        totalDiscount={cart.totalDiscount}
        totalLastPrice={cart.totalLastPrice}
        id={cart.id}
        customerId={cart.customerId}
        pOrderStatus={cart.pOrderStatus}
        orderPaymentType={cart.orderPaymentType}
        pOrderPaymentType={cart.pOrderPaymentType}
        pReason4DisapprovedDelivery={cart.pReason4DisapprovedDelivery}
        pSendDate={cart.pSendDate}
        sellerUserName={cart.sellerUserName}
        customerUserName={cart.customerUserName}
        sellerPhoneNumber={cart.sellerPhoneNumber}
        customerPhoneNumber={cart.customerPhoneNumber}
        incomAmount={cart.incomAmount}
        showKey={showKey}
        setShowKey={setShowKey}
        setOrderPage={setOrderPage}
      />
    );
  });
  const getCartData = async () => {
    setLoading(true);
    if (view === 1) {
      const getCartDataRes = await fetchData(
        "User/U_Order/SellerOpenOrder",
        {
          method: "GET"
        },
        props.ctx
      );
      if (getCartDataRes !== undefined && getCartDataRes.isSuccess) {
        let cData = getCartDataRes.data || [];
        if (cData.length > 0) {
          setShowKey(cData[0].id);
        }
        setOpenData(cData);
      }
    } else if (view === 2) {
      const getCartDataRes = await fetchData(
        "User/U_Order/SellerHistory",
        {
          method: "POST",
          body: JSON.stringify({
            page: page,
            pageSize: 10
          })
        },
        props.ctx
      );
      if (getCartDataRes !== undefined && getCartDataRes.isSuccess) {
        if (page === 1) {
          setHistoryData(getCartDataRes.data);
        } else {
          let cData = historyData.concat(getCartDataRes.data);
          setHistoryData(cData);
        }
        if (getCartDataRes.data.length >= 10) {
          setPage(page + 1);
          setTimeout(() => setIsFetching(false), 200);
        }
      }
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
    getCartData();
  }, [isFetching]);
  useEffect(() => {
    getCartData();
  }, [view, orderPage]);
  return (
    <>
      <title>قارون</title>
      <Nav />
      <div className="container cart_filter">
        <div className="row">
          <div className="col-12 mb-2">
            <ul className="nav d-flex ltr align-items-center flex-row-reverse filters">
              <li className={`nav-item ${view == 1 ? "active" : ""}`} onClick={() => setView(1)}>
                <a className="nav-link">جدید</a>
              </li>
              <li className={`nav-item ${view == 2 ? "active" : ""}`} onClick={() => setView(2)}>
                <a className="nav-link">قبلی</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container cart_page">
        {view === 1 && renderOpen}
        {view === 2 && renderHistory}
      </div>
    </>
  );
}
Page.getInitialProps = async function(context) {
  const OpenOrder = await fetchData(
    "User/U_Order/SellerOpenOrder",
    {
      method: "GET"
    },
    context
  );
  return { OpenOrder };
};
export default Auth(Page);