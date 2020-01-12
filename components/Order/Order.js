import React, { Fragment, useState, useEffect, memo } from "react";
import Link from "../Link";
import dynamic from "next/dynamic";
import Loading from "../Loader/Loading";
import SubmitButton from "../Button/SubmitButton";
import { FaTimesCircle, FaChevronUp, FaChevronDown, FaArrowLeft } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import fetchData from "../../utils/fetchData";
import { numberSeparator, removeSeparator } from "../../utils/tools";
const ProductRow = dynamic({
  loader: () => import("./ProductRow"),
  loading: () => <Loading />,
  ssr: true
});
const Ask = dynamic({
  loader: () => import("../Modal/Ask"),
  loading: () => <Loading />,
  ssr: true
});
const Order = props => {
  const nextCtx = props.ctx;
  const [showRow, setShowRow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [askModalShow, setAskModalShow] = useState(false);
  const [askModalShow1, setAskModalShow1] = useState(false);
  const cartData = props.cartData || [];
  toast.configure({
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  const renderProductsRow = cartData.map(product => {
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
  });
  const deliveredOrder = async () => {
    const result = await fetchData(
      `User/U_Order/AcceptOrder?orderChildId=${props.id}`,
      {
        method: "GET"
      },
      props.ctx
    );
    if (result !== undefined && result.isSuccess) {
      if (result.message != undefined) {
        toast.success(result.message);
      } else {
        toast.success("سفارش با موفقیت تایید و ارسال شد.");
      }
      props.setOrderPage(!props.orderPage);
      setAskModalShow1(false);
    } else if (result !== undefined && result.message != undefined) {
      toast.warn(result.message);
    } else if (result !== undefined && result.error != undefined) {
      toast.error(result.error);
    }
  };
  const cancelOrder = async () => {
    const result = await fetchData(
      `User/U_Order/DontAcceptOrder?orderChildId=${props.id}`,
      {
        method: "GET"
      },
      props.ctx
    );
    if (result !== undefined && result.isSuccess) {
      if (result.message != undefined) {
        toast.success(result.message);
      } else {
        toast.success("سفارش با موفقیت لغو شد.");
      }
      props.setOrderPage(!props.orderPage);
      setAskModalShow(false);
    } else if (result !== undefined && result.message != undefined) {
      toast.warn(result.message);
    } else if (result !== undefined && result.error != undefined) {
      toast.error(result.error);
    }
  };
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);
  return (
    <div className="_order">
      <div className="container p-3 order_header">
        <div className="row">
          <div className="col-12 d-flex align-items-end">
            <FaArrowLeft className="font_icon back_icon" onClick={() => props.setView(1)} />
          </div>
        </div>
      </div>
      <Ask header={"لغو سفارش"} text={"با لغو این سفارش هزینه آن به حساب خریدار واریز می شود."} command={cancelOrder} setModalShow={setAskModalShow} modalShow={askModalShow} loading={loading} />
      <Ask header={"قبول و ارسال"} text={""} command={deliveredOrder} setModalShow={setAskModalShow1} modalShow={askModalShow1} loading={loading} />
      <div className="container mb-2 mt-2 cart p-0 pr-1 pl-1">
        <div className="row cart_seller p-1 justify-content-end">
          <div className="col-5 m-auto rtl p-0 pl-1 text-center">
            <div className="status_div">
              {props.pOrderStatus == "درانتظار تأیید فروشنده" ? (
                <div className="badge badge-warning">{props.pOrderStatus}</div>
              ) : props.pOrderStatus == "درانتظار پرداخت" ? (
                <div className="badge bg-amber">{props.pOrderStatus}</div>
              ) : props.pOrderStatus == "ارسال شده" || props.pOrderStatus == "درحال ارسال" ? (
                <div className="badge bg-blue">{props.pOrderStatus}</div>
              ) : props.pOrderStatus == "عدم تأیید فروشنده" ? (
                <div className="badge bg-brown">{props.pOrderStatus}</div>
              ) : props.pOrderStatus == "لغو شده توسط خریدار" ? (
                <div className="badge bg-pink">{props.pOrderStatus}</div>
              ) : props.pOrderStatus == "عدم تحویل" ? (
                <div className="badge bg-red">{props.pOrderStatus}</div>
              ) : props.pOrderStatus == "تحویل شده" ? (
                <div className="badge bg-green">{props.pOrderStatus}</div>
              ) : props.pOrderStatus == "بازگشتی" ? (
                <div className="badge bg-purple">{props.pOrderStatus}</div>
              ) : (
                <div className="badge badge-warning">{props.pOrderStatus}</div>
              )}
            </div>
          </div>
          <div className="col-7 text-right d-flex p-1 pr-2">
            <div className="col-9 p-0 align-self-center">
              <p className="seller_name seller_user_name d-block mr-2 text-truncate rtl">{props.sellerUserName}</p>
              <p className="seller_name seller_display_name d-block mr-2 text-truncate rtl">{props.sellerName}</p>
            </div>
            <img src={props.sellerAvatar} className="userImage" />
          </div>
        </div>
        <div className="row products_rows" hidden={!showRow}>
          {renderProductsRow}
          {props.description !== "" && (
            <div className="col-12 mt-2 rtl description">
              <h6>توضیحات تکمیلی سفارش</h6>
              <p>{props.description}</p>
            </div>
          )}
        </div>
        <div className="row mt-0 pt-3 pb-3 cart_amount_detail">
          <div className="col-12 d-block rtl">
            <span className="total">مبلغ کل سفارش : </span>
            <span className="total_price">{props.totalLastPrice !== undefined ? numberSeparator(props.totalLastPrice) + " تومان" : "0 تومان"}</span>
          </div>
        </div>
        {props.type === 1 && props.pOrderStatus == "درانتظار تأیید فروشنده" && (
          <div className="row d-flex pb-3 justify-content-around rtl contact_row">
            <SubmitButton loading={loading} onClick={()=>setAskModalShow1(true)} text="قبول و ارسال" className="d-inline-block delivered" />
            <SubmitButton loading={loading} onClick={()=>setAskModalShow(true)} text="رد سفارش" className="d-inline-block cancel" />
          </div>
        )}
      </div>
    </div>
  );
};
export default memo(Order);