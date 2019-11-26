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
import "../scss/components/orders.scss";
const Cart = dynamic({
  loader: () => import("../components/Cart/Cart"),
  loading: () => <Loading />,
  ssr: false
});
const Order = dynamic({
  loader: () => import("../components/Order/Order"),
  loading: () => <Loading />,
  ssr: false
});
function Page(props) {
  const nextCtx = props.ctx;
  const [view, setView] = useState(1);
  const [cartData, cartDispatch] = useReducer(cartReduser, props.cartData.data || []);
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
  const renderCart = cartData.map(cart => (
    <Cart
      key={cart.sellerId}
      sellerId={cart.sellerId}
      userId={cart.userId}
      cartData={cart}
      sellerAvatar={`https://api.qaroon.ir/${cart.sellerAvatar}`}
      sellerName={""}
      setLoading={setLoading}
      // shopingCartId={cart.id}
    />
  ));
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
  return (
    <CartContext.Provider value={cartDispatch}>
      <CartCountContext.Provider value={cartCountDispatch}>
        <Nav cartCount={cartCount} />
        <div className="container cart_page">
          <div className="row mb-3 p-2 rtl header_link">
            <div className={`col-6 pt-2 text-center border-left tab ${view == 1 ? "active" : ""}`} onClick={() => setView(1)}>
              <a className="d-inline-block tab_link">جدید</a>
            </div>
            <div className={`col-6 pt-2 text-center tab ${view == 2 ? "active" : ""}`} onClick={() => setView(2)}>
              <a className="d-inline-block tab_link">سوابق</a>
            </div>
          </div>
        </div>
        <div className="container cart_page">
          <Order showProduct={false} key={1} sellerId={1} quantity={22} userId={1} cartData={[]} sellerAvatar={`static/img/user.jpg`} sellerName={"نام کاربر"} displayName={'نام نمایشی'} setLoading={setLoading} />
          <Order showProduct={false} key={2} sellerId={2} quantity={2} userId={2}  cartData={[]} sellerAvatar={`static/img/user.png`} sellerName={"user_name"} displayName={'نام نمایشی'} setLoading={setLoading} />
          <Order showProduct={false} key={3} sellerId={3} quantity={12} userId={3} cartData={[]} sellerAvatar={`static/img/user.jpg`} sellerName={"نام کاربر"} displayName={'نام نمایشی'} setLoading={setLoading} />
          <Order showProduct={false} key={4} sellerId={4} quantity={5} userId={4} cartData={[]} sellerAvatar={`static/img/profile.png`} sellerName={"نام کاربر"} displayName={'نام نمایشی'} setLoading={setLoading} />
          {/* <div className="row mt-0 mb-3 pt-3 pb-5 cart_amount_detail">
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