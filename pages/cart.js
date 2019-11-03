import React, { Fragment, useContext, useState, useRef, useEffect, memo } from 'react';
import dynamic from 'next/dynamic';
import fetchData from '../utils/fetchData';
import Nav from '../components/Nav/Nav';
import Loading from '../components/Loader/Loading';
import Auth from '../components/Auth/Auth';
import SubmitButton from '../components/Button/SubmitButton';
import Link from '../components/Link';
import { FaPlus, FaCheck, FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import { ReactComponent as MenuDotsSvg } from '../public/static/svg/menu-dots.svg';
import { ReactComponent as ShareSvg } from '../public/static/svg/share.svg';
import { ReactComponent as CommentSvg } from '../public/static/svg/comment.svg';
import { ReactComponent as HeartSvg } from '../public/static/svg/heart-red.svg';
import { FaShoppingCart, FaCartPlus, FaCartArrowDown } from 'react-icons/fa';
import '../scss/components/cartPage.scss';
const Cart = dynamic({
  loader: () => import('../components/Cart/Cart'),
  loading: () => <Loading />,
  ssr: false
});
function Page(props) {
  const nextCtx = props.ctx;
  return (
    <>
      <Nav />
      <div className="container cart_page">
        <div className="row mb-3 p-2 header_link">
          <div className="col pt-2 text-center">
            <a className="d-inline-block btn-main" onClick={() => addProduct()}>
              ادامه
              {/* {loading ? <Loading className="font_icon" /> : <FaArrowLeft className="font_icon" />} */}
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
        <Cart />
        <Cart />
        <Cart />
        <Cart />
        <div className="row mt-3 mb-3 pb-5 cart_amount_detail">
          <div className="col-12 d-block rtl">
            <span className="total">مبلغ کل : </span> <span className="total_price">1,765,320 تومان</span>
          </div>
          <div className="col-12 d-block rtl">
            <span className="discount">مجموع تخفیف : </span> <span className="total_discount">65,320 تومان</span>
          </div>
          <div className="col-12 d-block rtl">
            <span className="final">مبلغ قابل پرداخت : </span> <span className="final_price">1,000,000 تومان</span>
          </div>
        </div>
      </div>
    </>
  );
}
Page.getInitialProps = async function(context) {};
export default Auth(Page);