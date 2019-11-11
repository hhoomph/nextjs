import React, { Fragment, useContext, useState, useRef, useEffect, useReducer, memo } from 'react';
import dynamic from 'next/dynamic';
import fetchData from '../utils/fetchData';
import Nav from '../components/Nav/Nav';
import Loading from '../components/Loader/Loading';
import Auth from '../components/Auth/Auth';
import SubmitButton from '../components/Button/SubmitButton';
import Link from '../components/Link';
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import { FaPlus, FaCheck, FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import { FaShoppingCart, FaCartPlus, FaCartArrowDown } from 'react-icons/fa';
import { numberSeparator, removeSeparator } from '../utils/tools';
import { CartContext } from '../context/context';
import { cartReduser } from '../context/reducer';
import '../scss/components/cartPage.scss';
const Cart = dynamic({
  loader: () => import('../components/Cart/Cart'),
  loading: () => <Loading />,
  ssr: false
});
function Page(props) {
  const nextCtx = props.ctx;
  //const [cartData, setCartData] = useState(props.cartData.data || []);
  const [cartData, cartDispatch] = useReducer(cartReduser, props.cartData.data || []);
  const [loading, setLoading] = useState(false);
  toast.configure({
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  console.log(cartData);
  const renderCart = cartData.map(cart => (
    <Cart
      key={cart.sellerId}
      sellerId={cart.sellerId}
      userId={cart.userId}
      cartData={cart}
      sellerAvatar={`https://api.qaroon.ir/${cart.sellerAvatar}`}
      sellerName={''}
      setLoading={setLoading}
      // shopingCartId={cart.id}
    />
  ));
  const totalPrices = cartData
    .map(cart => cart.cartDetailsSelectDtos)
    .reduce((acc, val) => acc.concat(val), [])
    .reduce((acc, val) => {
      const { totalDiscount, totalLastPrice, totalPrice } = val;
      if (acc['totalDiscount']) {
        acc['totalDiscount'] += totalDiscount;
      } else {
        acc['totalDiscount'] = totalDiscount;
      }
      if (acc['totalLastPrice']) {
        acc['totalLastPrice'] += totalLastPrice;
      } else {
        acc['totalLastPrice'] = totalLastPrice;
      }
      if (acc['totalPrice']) {
        acc['totalPrice'] += totalPrice;
      } else {
        acc['totalPrice'] = totalPrice;
      }
      return acc;
    }, {});
  const getCartCount = cartData
    .map(cart => cart.cartDetailsSelectDtos)
    .reduce((acc, val) => acc.concat(val), [])
    .reduce((acc, val) => {
      const { count } = val;
      return acc + count;
    }, 0);
  const handleOrder = async () => {
    if (getCartCount > 0) {
      setLoading(true);
      const Res = await fetchData(
        'User/U_Order/AddS1',
        {
          method: 'POST'
        },
        props.ctx
      );
      if (Res !== undefined && Res.isSuccess) {
        toast.success(Res.message);
        Router.push('/checkout');
      } else if (Res !== undefined && Res.message != undefined) {
        toast.warn(Res.message);
      } else if (Res !== undefined && Res.error != undefined) {
        toast.error(Res.error);
      }
      setLoading(false);
    } else {
      toast.warn('سبد خرید شما خالی است.');
    }
  };
  // const getCartData = async () => {
  //   setLoading(true);
  //   const getCartDataRes = await fetchData(
  //     'User/U_Cart/GetAll',
  //     {
  //       method: 'GET'
  //     },
  //     props.ctx
  //   );
  //   if (getCartDataRes !== undefined && getCartDataRes.isSuccess) {
  //     let cData = getCartDataRes.data || [];
  //     cartDispatch({ type: 'refresh', payload: cData });
  //     //setCartData(cData);
  //   } else if (getCartDataRes !== undefined && getCartDataRes.message != undefined) {
  //     //toast.warn(getCartDataRes.message);
  //   } else if (getCartDataRes !== undefined && getCartDataRes.error != undefined) {
  //     //toast.error(getCartDataRes.error);
  //   }
  //   setLoading(false);
  // };
  return (
    <CartContext.Provider value={cartDispatch}>
      <Nav />
      <div className="container cart_page">
        <div className="row mb-3 p-2 header_link">
          <div className="col pt-2 text-center">
            {/* <Link href="/checkout" passHref>
              <a className="d-inline-block btn-main">
                ادامه
                {loading ? <Loading className="font_icon" /> : <FaArrowLeft className="font_icon" />}
              </a>
            </Link> */}
            <a className="d-inline-block btn-main" onClick={handleOrder}>
              ادامه
              {loading ? <Loading className="font_icon" /> : <FaArrowLeft className="font_icon" />}
            </a>
          </div>
        </div>
      </div>
      <div className="container ">
        <div className="row cart_title">
          <div className="col text-center">
            <FaCartPlus className="font_icon" />
            <h5 className="mr-2 ml-2 page_title">سبد خرید </h5>
            <FaCartArrowDown className="font_icon" />
            {/* <hr /> */}
          </div>
        </div>
      </div>
      <div className="container cart_page">
        {renderCart}
        <div className="row mt-3 mb-3 pb-5 cart_amount_detail">
          <div className="col-12 d-block rtl">
            <span className="total">مبلغ کل : </span> <span className="total_price">{totalPrices.totalPrice !== undefined ? numberSeparator(totalPrices.totalPrice) : '0'} تومان</span>
          </div>
          <div className="col-12 d-block rtl">
            <span className="discount">مجموع تخفیف : </span> <span className="total_discount">{totalPrices.totalDiscount !== undefined ? numberSeparator(totalPrices.totalDiscount) : '0'} تومان</span>
          </div>
          <div className="col-12 d-block rtl">
            <span className="final">مبلغ قابل پرداخت : </span> <span className="final_price">{totalPrices.totalLastPrice !== undefined ? numberSeparator(totalPrices.totalLastPrice) : '0'} تومان</span>
          </div>
        </div>
      </div>
    </CartContext.Provider>
  );
}
Page.getInitialProps = async function(context) {
  const cartData = await fetchData(
    'User/U_Cart/GetAll',
    {
      method: 'GET'
    },
    context
  );
  return { cartData };
};
export default Auth(Page);