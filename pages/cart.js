import React, { Fragment, useContext, useState, useRef, useEffect, memo } from 'react';
import '../scss/style.scss';
import dynamic from 'next/dynamic';
import fetchData from '../utils/fetchData';
import Nav from '../components/Nav/Nav';
import Loading from '../components/Loader/Loading';
import Auth from '../components/Auth/Auth';
import SubmitButton from '../components/Button/SubmitButton';
import Link from '../components/Link';
import { FaPlus, FaCheck, FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import { ReactComponent as MenuDotsSvg } from '../static/svg/menu-dots.svg';
import { ReactComponent as ShareSvg } from '../static/svg/share.svg';
import { ReactComponent as CommentSvg } from '../static/svg/comment.svg';
import { ReactComponent as HeartSvg } from '../static/svg/heart-red.svg';
import '../scss/components/cart.scss';
function Page(props) {
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
    </>
  );
}
Page.getInitialProps = async function(context) {};
export default Auth(Page);