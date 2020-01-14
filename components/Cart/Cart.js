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
import RRS from "react-responsive-select";
import { Modal } from "react-bootstrap";
import "../../scss/components/cart.scss";
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
const Cart = props => {
  const nextCtx = props.ctx;
  const type = props.type;
  const showRow = props.id === props.showKey ? true : false;
  const [loading, setLoading] = useState(false);
  const [call, setCall] = useState(false);
  const { cartData } = props;
  const [askModalShow, setAskModalShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [cancelReason, setCancelReason] = useState(null);
  toast.configure({
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
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
          productDiscount={product.productDiscount}
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
          // productPrice={product.lastPrice}
          productPrice={product.price}
          productDiscount={product.discount}
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
          // productPrice={product.lastPrice}
          productPrice={product.price}
          productDiscount={product.discount}
          shopingCartId={product.id}
          productQuantity={product.count}
          setLoading={props.setLoading}
          type={props.type}
        />
      );
    default:
      break;
    }
  });
  const toggleRow = () => {
    if (showRow) {
      props.setShowKey(null);
    } else {
      props.setShowKey(props.id);
    }
  };
  const showToggleRow = () => {
    if (showRow) {
      return <FaChevronUp onClick={toggleRow} className="font_icon up" />;
    } else {
      return <FaChevronDown onClick={toggleRow} className="font_icon down" />;
    }
  };
  const changeCall = () => {
    setTimeout(() => {
      setCall(true);
    }, 10000);
  };
  const deliveredOrder = async () => {
    const result = await fetchData(
      `User/U_Order/DeliveredOrder?orderChildId=${props.id}`,
      {
        method: "GET"
      },
      props.ctx
    );
    if (result !== undefined && result.isSuccess) {
      const getCartDataRes = await fetchData(
        "User/U_Order/CustomerOpenOrder",
        {
          method: "GET"
        },
        props.ctx
      );
      if (getCartDataRes !== undefined && getCartDataRes.isSuccess) {
        let cData = getCartDataRes.data || [];
        props.setOpenCartData(cData);
      }
      setAskModalShow(false);
    } else if (result !== undefined && result.message != undefined) {
      toast.warn(result.message);
    } else if (result !== undefined && result.error != undefined) {
      toast.error(result.error);
    }
  };
  const cancelOrder = async () => {
    // const result = await fetchData(
    //   `User/U_Order/CanceleOrder?orderChildId=${props.id}`,
    //   {
    //     method: "GET"
    //   },
    //   props.ctx
    // );
    if (cancelReason !== null) {
      const result = await fetchData(
        "User/U_Order/DisapprovedDeliveryOrder",
        {
          method: "POST",
          body: JSON.stringify({
            orderChildId: props.id,
            reason4DisapprovedDelivery: cancelReason
          })
        },
        props.ctx
      );
      if (result !== undefined && result.isSuccess) {
        if (result.message != undefined) {
          toast.success(result.message);
        } else {
          toast.success("سفارش با موفقیت لغو شد.");
        }
        setModalShow(false);
      } else if (result !== undefined && result.message != undefined) {
        toast.warn(result.message);
      } else if (result !== undefined && result.error != undefined) {
        toast.error(result.error);
      }
    } else {
      toast.warn("لطفا دلیل لغو سفارش را مشخص کنید.");
    }
  };
  return (
    <div className="container cart">
    <Ask header={"تحویل گرفتن سفارش"} text={""} customerRecive={true} command={deliveredOrder} setModalShow={setAskModalShow} modalShow={askModalShow} loading={loading} />
      <div className={"row cart_seller justify-content-end"} onClick={toggleRow}>
        <div className="col-2 align-self-center text-left">
          <a className="nav_Icons active">{showToggleRow()}</a>
        </div>
        <div className="col-10 text-right p-0 pr-1 pt-1">
          <p className="seller_name d-inline-block mr-2 text-truncate">{props.sellerUserName}</p>
          <img src={props.sellerAvatar} className="userImage" />
          {type !== 1 && (
            <div className="col-12 p-0 pr-5 text-center d-block " style={{ margin: "auto", marginTop: "-10px" }}>
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
          )}
        </div>
      </div>
      <div className="row products_rows" hidden={!showRow}>
        {renderProductsRow}
      </div>
      {type === 2 && props.pOrderStatus !== "درانتظار پرداخت" && (
        <div className="row d-flex justify-content-around rtl contact_row" hidden={!showRow}>
          {props.pOrderStatus !== "درانتظار تأیید فروشنده" && <SubmitButton loading={loading} onClick={()=>setAskModalShow(true)} text="تحویل گرفتم" className="d-inline-block delivered" />}
          {/* Call To Seller */}
          <a className="tell_call" title="تماس با فروشنده" href={`tel:${props.sellerPhoneNumber}`} onClick={changeCall}>
            <IoMdCall className="font_icon" />
          </a>
          {props.pOrderStatus !== "درانتظار تأیید فروشنده" && call ? (
            <SubmitButton loading={loading} onClick={() => setModalShow(true)} text="لغو سفارش" className="d-inline-block cancel" />
          ) : props.pOrderStatus == "درانتظار تأیید فروشنده" ? (
            <SubmitButton loading={loading} onClick={() => setModalShow(true)} text="لغو سفارش" className="d-inline-block cancel" />
          ) : (
            ""
          )}
          {/* Cancel Modal */}
          <Modal onHide={() => setModalShow(false)} show={modalShow} size="xl" scrollable className="share_modal reason_modal">
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">لغو سفارش</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="col-12 p-0 rtl d-flex">
                <form className="reasonForm">
                  <div className="col-12 p-0">
                    <p>لطفا دلیل لغو سفارش خود را مشخص کنید : </p>
                  </div>
                  <div className="form-group row">
                    <div className="col-12">
                      <label className={`${cancelReason === "None" ? " active" : ""}`} onClick={e => setCancelReason("None")}>
                        انصراف از خرید
                      </label>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-12">
                      <label className={`${cancelReason === "IHaveNotDeliveredAnything" ? " active" : ""}`} onClick={e => setCancelReason("IHaveNotDeliveredAnything")}>
                        تاخیر در ارسال کالا
                      </label>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-12">
                      <label className={`${cancelReason === "DeliveredProductsAreDefective" ? " active" : ""}`} onClick={e => setCancelReason("DeliveredProductsAreDefective")}>
                        کالای تحویل شده معیوب است
                      </label>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-12">
                      <label className={`${cancelReason === "ProductIsInConflictWithTheImage" ? " active" : ""}`} onClick={e => setCancelReason("ProductIsInConflictWithTheImage")}>
                        کالا با تصویر سایت مغایرت دارد
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <SubmitButton loading={loading} onClick={cancelOrder} text="لغو سفارش" className="d-inline-block btn-main rtl cancel"></SubmitButton>
            </Modal.Footer>
          </Modal>
        </div>
      )}
      {type === 2 && props.pOrderStatus === "درانتظار پرداخت" && props.orderPaymentType === 0 && (
        <div className="row d-flex justify-content-around rtl contact_row" hidden={!showRow}>
          <SubmitButton
            loading={loading}
            onClick={() =>
              Router.push({
                pathname: "/checkout",
                query: { id: props.orderId }
              })
            }
            text="پرداخت"
            className="d-inline-block payment"
          />
        </div>
      )}
    </div>
  );
};
export default memo(Cart);