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
  loader: () => import("../components/Cart/Cart"),
  loading: () => <Loading />,
  ssr: false
});
function Page(props) {
  const nextCtx = props.ctx;
  const [view, setView] = useState(1);
  const [cartData, cartDispatch] = useReducer(cartReduser, props.cartData.data || []);
  const [openCartData, setOpenCartData] = useState([]);
  const [historyCartData, setHistoryCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getCartCount = cartData
    .map(cart => cart.cartDetailsSelectDtos)
    .reduce((acc, val) => acc.concat(val), [])
    .reduce((acc, val) => {
      const { count } = val;
      return acc + count;
    }, 0);
  const [cartCount, cartCountDispatch] = useReducer(cartCountReduser, getCartCount);
  toast.configure({
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  //console.log(cartData);
  // const renderCart = cartData.map(cart => {
  //   switch (view) {
  //     case 1:
  //       return (
  //         <Cart
  //           key={cart.sellerId}
  //           sellerId={cart.sellerId}
  //           userId={cart.userId}
  //           cartData={cart.cartDetailsSelectDtos}
  //           sellerAvatar={`https://api.qarun.ir/${cart.sellerAvatar}`}
  //           sellerName={""}
  //           setLoading={setLoading}
  //           type={view}
  //         />
  //       );
  //       break;
  //     case 2:
  //       return (
  //         <Cart
  //           key={cart.orderId}
  //           sellerId={cart.sellerId}
  //           userId={cart.customerId}
  //           cartData={cart.products}
  //           sellerAvatar={`https://api.qarun.ir/${cart.sellerAvatar}`}
  //           sellerName={cart.sellerDisplayName}
  //           setLoading={setLoading}
  //           type={view}
  //           orderId={cart.orderId}
  //           orderStatus={cart.orderStatus}
  //           reason4DisapprovedDelivery={cart.reason4DisapprovedDelivery}
  //           sendDate={cart.sendDate}
  //           totalPrice={cart.totalPrice}
  //           totalDiscount={cart.totalDiscount}
  //           totalLastPrice={cart.totalLastPrice}
  //           id={cart.id}
  //           customerId={cart.customerId}
  //           pOrderStatus={cart.pOrderStatus}
  //           orderPaymentType={cart.orderPaymentType}
  //           pOrderPaymentType={cart.pOrderPaymentType}
  //           pReason4DisapprovedDelivery={cart.pReason4DisapprovedDelivery}
  //           pSendDate={cart.pSendDate}
  //           sellerUserName={cart.sellerUserName}
  //           sellerPhoneNumber={cart.sellerPhoneNumber}
  //           incomAmount={cart.incomAmount}
  //         />
  //       );
  //       break;
  //     case 3:
  //       return (
  //         <Cart
  //           key={cart.orderId}
  //           orderChildsId={cart.orderChildsId}
  //           description={cart.description}
  //           paySucceeded={cart.paySucceeded}
  //           id={cart.id}
  //           customerId={cart.customerId}
  //           totalPrice={cart.sumTotalPrice}
  //           totalDiscount={cart.sumTotalDiscount}
  //           totalLastPrice={cart.sumTotalLastPrice}
  //           lastUpdate={cart.lastUpdate}
  //           orderPaymentType={cart.orderPaymentType}
  //           pOrderPaymentType={cart.pOrderPaymentType}
  //           paymentDate={cart.paymentDate}
  //           setLoading={setLoading}
  //           type={view}
  //         />
  //       );
  //       break;
  //     default:
  //       break;
  //   }
  //   // return (
  //   //   <Cart
  //   //     key={cart.sellerId}
  //   //     sellerId={cart.sellerId}
  //   //     userId={cart.userId}
  //   //     cartData={cart}
  //   //     sellerAvatar={`https://api.qarun.ir/${cart.sellerAvatar}`}
  //   //     sellerName={""}
  //   //     setLoading={setLoading}
  //   //     type={type}
  //   //     // shopingCartId={cart.id}
  //   //   />
  //   // );
  // });
  const renderCart = cartData.map(cart => {
    const sellerImg = cart.sellerAvatar !== undefined && cart.sellerAvatar !== null ? `https://api.qarun.ir/${cart.sellerAvatar}` : "/static/img/no-userimage.png";
    return (
      <Cart key={cart.sellerId} sellerId={cart.sellerId} customerId={cart.userId} cartData={cart.cartDetailsSelectDtos} sellerAvatar={sellerImg} sellerName={""} setLoading={setLoading} type={view} />
    );
  });
  const renderOpenCart = openCartData.map(cart => {
    const sellerImg = cart.sellerAvatar !== undefined && cart.sellerAvatar !== null ? `https://api.qarun.ir/${cart.sellerAvatar}` : "/static/img/no-userimage.png";
    return (
      <Cart
        key={cart.orderId + cart.id}
        userId={cart.customerId}
        cartData={cart.products}
        sellerAvatar={sellerImg}
        sellerName={cart.sellerDisplayName}
        setLoading={setLoading}
        type={view}
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
        sellerPhoneNumber={cart.sellerPhoneNumber}
        incomAmount={cart.incomAmount}
      />
    );
  });
  const renderHistoryCart = historyCartData.map(cart => {
    //const sellerImg = cart.sellerAvatar !== undefined && cart.sellerAvatar !== null ? `https://api.qarun.ir/${cart.sellerAvatar}` : "/static/img/no-userimage.png";
    return (
      <Cart
        key={cart.orderId}
        orderChildsId={cart.orderChildsId}
        description={cart.description}
        paySucceeded={cart.paySucceeded}
        id={cart.id}
        customerId={cart.customerId}
        totalPrice={cart.sumTotalPrice}
        totalDiscount={cart.sumTotalDiscount}
        totalLastPrice={cart.sumTotalLastPrice}
        lastUpdate={cart.lastUpdate}
        orderPaymentType={cart.orderPaymentType}
        pOrderPaymentType={cart.pOrderPaymentType}
        paymentDate={cart.paymentDate}
        setLoading={setLoading}
        type={view}
      />
    );
  });
  const totalPrices = cartData
    .map(cart => cart.cartDetailsSelectDtos)
    .reduce((acc, val) => acc.concat(val), [])
    .reduce((acc, val) => {
      const { totalDiscount, totalLastPrice, totalPrice } = val;
      if (acc["totalDiscount"]) {
        acc["totalDiscount"] += totalDiscount;
      } else {
        acc["totalDiscount"] = totalDiscount;
      }
      if (acc["totalLastPrice"]) {
        acc["totalLastPrice"] += totalLastPrice;
      } else {
        acc["totalLastPrice"] = totalLastPrice;
      }
      if (acc["totalPrice"]) {
        acc["totalPrice"] += totalPrice;
      } else {
        acc["totalPrice"] = totalPrice;
      }
      return acc;
    }, {});
  const handleOrder = async () => {
    if (getCartCount > 0) {
      setLoading(true);
      const Res = await fetchData(
        "User/U_Order/AddS1",
        {
          method: "POST"
        },
        props.ctx
      );
      if (Res !== undefined && Res.isSuccess) {
        toast.success(Res.message);
        Router.push("/checkout");
      } else if (Res !== undefined && Res.message != undefined) {
        toast.warn(Res.message);
      } else if (Res !== undefined && Res.error != undefined) {
        toast.error(Res.error);
      }
      setLoading(false);
    } else {
      toast.warn("سبد خرید شما خالی است.");
    }
  };
  const getCartData = async () => {
    setLoading(true);
    if (view === 1) {
      const getCartDataRes = await fetchData(
        "User/U_Cart/GetAll",
        {
          method: "GET"
        },
        props.ctx
      );
      if (getCartDataRes !== undefined && getCartDataRes.isSuccess) {
        let cData = getCartDataRes.data || [];
        cartDispatch({ type: "refresh", payload: [] });
        cartDispatch({ type: "refresh", payload: cData });
      }
    } else if (view === 2) {
      const getCartDataRes = await fetchData(
        "User/U_Order/CustomerOpenOrder",
        {
          method: "GET"
        },
        props.ctx
      );
      if (getCartDataRes !== undefined && getCartDataRes.isSuccess) {
        let cData = getCartDataRes.data || [];
        setOpenCartData(cData);
      }
    } else if (view === 3) {
      // Get Deliveried orders
      const getCartDataRes1 = await fetchData(
        "User/U_Order/CustomerOrderChildren",
        {
          method: "POST",
          body: JSON.stringify({
            orderStatus: 4,
            page: 1,
            pageSize: 10
          })
        },
        props.ctx
      );
      // Get CanceledByCustomer Orders
      const getCartDataRes2 = await fetchData(
        "User/U_Order/CustomerOrderChildren",
        {
          method: "POST",
          body: JSON.stringify({
            orderStatus: 5,
            page: 1,
            pageSize: 10
          })
        },
        props.ctx
      );
      // Get CanceledBySeller Orders
      const getCartDataRes3 = await fetchData(
        "User/U_Order/CustomerOrderChildren",
        {
          method: "POST",
          body: JSON.stringify({
            orderStatus: 6,
            page: 1,
            pageSize: 10
          })
        },
        props.ctx
      );
      // Get Returned Orders
      const getCartDataRes4 = await fetchData(
        "User/U_Order/CustomerOrderChildren",
        {
          method: "POST",
          body: JSON.stringify({
            orderStatus: 8,
            page: 1,
            pageSize: 10
          })
        },
        props.ctx
      );
      if (getCartDataRes1 !== undefined && getCartDataRes1.isSuccess) {
        let cData = historyCartData.concat(getCartDataRes1.data);
        setHistoryCartData(cData);
      }
      if (getCartDataRes2 !== undefined && getCartDataRes2.isSuccess) {
        let cData = historyCartData.concat(getCartDataRes2.data);
        setHistoryCartData(cData);
      }
      if (getCartDataRes3 !== undefined && getCartDataRes3.isSuccess) {
        let cData = historyCartData.concat(getCartDataRes3.data);
        setHistoryCartData(cData);
      }
      if (getCartDataRes4 !== undefined && getCartDataRes4.isSuccess) {
        let cData = historyCartData.concat(getCartDataRes4.data);
        setHistoryCartData(cData);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    getCartData();
  }, [view]);
  return (
    <CartContext.Provider value={cartDispatch}>
      <CartCountContext.Provider value={cartCountDispatch}>
        <Nav cartCount={cartCount} />
        {view === 1 && (
          <div className="container cart_page">
            <div className="row mb-3 p-2 header_link">
              <div className="col pt-2 text-center">
                <a className="d-inline-block btn-main" onClick={handleOrder}>
                  ادامه
                  {loading ? <Loading className="font_icon" /> : <FaArrowLeft className="font_icon" />}
                </a>
              </div>
            </div>
          </div>
        )}
        <div className="container cart_filter">
          <div className="row">
            <div className="col-12 mb-2">
              <ul className="nav d-flex ltr align-items-center flex-row-reverse filters">
                <li className={`nav-item ${view == 1 ? "active" : ""}`} onClick={() => setView(1)}>
                  <a className="nav-link">جدید</a>
                </li>
                <li className={`nav-item ${view == 2 ? "active" : ""}`} onClick={() => setView(2)}>
                  <a className="nav-link">جاری</a>
                </li>
                {/* <li className={`nav-item ${view == 3 ? "active" : ""}`} onClick={() => setView(3)}>
                  <a className="nav-link">سوابق</a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        <div className="container cart_page">
          {view === 1 && renderCart}
          {view === 2 && renderOpenCart}
          {view === 3 && renderHistoryCart}
          {view === 1 && (
            <div className="row mt-0 mb-3 pt-3 pb-5 cart_amount_detail">
              {getCartCount > 0 ? (
                <>
                  <div className="col-12 d-block rtl">
                    <span className="total">مبلغ کل : </span>
                    <span className="total_price">
                      {totalPrices.totalPrice !== undefined ? numberSeparator(totalPrices.totalPrice) : "0"}
                      تومان
                    </span>
                  </div>
                  <div className="col-12 d-block rtl">
                    <span className="discount">مجموع تخفیف : </span>
                    <span className="total_discount">
                      {totalPrices.totalDiscount !== undefined ? numberSeparator(totalPrices.totalDiscount) : "0"}
                      تومان
                    </span>
                  </div>
                  <div className="col-12 d-block rtl">
                    <span className="final">مبلغ قابل پرداخت : </span>
                    <span className="final_price">
                      {totalPrices.totalLastPrice !== undefined ? numberSeparator(totalPrices.totalLastPrice) : "0"}
                      تومان
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-12">
                    <hr />
                  </div>
                  <div className="col-12 d-flex justify-content-center empty_cart">
                    <FaShoppingCart className="font_icon" />
                  </div>
                  <div className="col-12 d-flex justify-content-center empty_cart">
                    <p>سبد خرید شما خالی است</p>
                  </div>
                  <div className="col-12 mb-5 pb-5">
                    <hr />
                  </div>
                </>
              )}
            </div>
          )}
          {/* <div className="row mt-0 mb-3 pt-3 pb-5 cart_amount_detail">
            {getCartCount > 0 ? (
              <>
                <div className="col-12 d-block rtl">
                  <span className="total">مبلغ کل : </span>
                  <span className="total_price">
                    {totalPrices.totalPrice !== undefined ? numberSeparator(totalPrices.totalPrice) : "0"}
                    تومان
                  </span>
                </div>
                <div className="col-12 d-block rtl">
                  <span className="discount">مجموع تخفیف : </span>
                  <span className="total_discount">
                    {totalPrices.totalDiscount !== undefined ? numberSeparator(totalPrices.totalDiscount) : "0"}
                    تومان
                  </span>
                </div>
                <div className="col-12 d-block rtl">
                  <span className="final">مبلغ قابل پرداخت : </span>
                  <span className="final_price">
                    {totalPrices.totalLastPrice !== undefined ? numberSeparator(totalPrices.totalLastPrice) : "0"}
                    تومان
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="col-12">
                  <hr />
                </div>
                <div className="col-12 d-flex justify-content-center empty_cart">
                  <FaShoppingCart className="font_icon" />
                </div>
                <div className="col-12 d-flex justify-content-center empty_cart">
                  <p>سبد خرید شما خالی است</p>
                </div>
                <div className="col-12 mb-5 pb-5">
                  <hr />
                </div>
              </>
            )}
          </div> */}
        </div>
      </CartCountContext.Provider>
    </CartContext.Provider>
  );
}
Page.getInitialProps = async function(context) {
  const cartData = await fetchData(
    "User/U_Cart/GetAll",
    {
      method: "GET"
    },
    context
  );
  return { cartData };
};
export default Auth(Page);