import React, { Fragment, useContext, useState, useRef, useEffect, memo } from 'react';
import dynamic from 'next/dynamic';
import fetchData from '../utils/fetchData';
import Nav from '../components/Nav/Nav';
import Loading from '../components/Loader/Loading';
import Auth from '../components/Auth/Auth';
import SubmitButton from '../components/Button/SubmitButton';
import Link from '../components/Link';
import { FaPlus } from 'react-icons/fa';
import { ReactComponent as MenuDotsSvg } from '../public/static/svg/menu-dots.svg';
import { ReactComponent as ShareSvg } from '../public/static/svg/share.svg';
import { ReactComponent as CommentSvg } from '../public/static/svg/comment.svg';
import { ReactComponent as HeartSvg } from '../public/static/svg/heart-red.svg';
import Carousel from 'react-bootstrap/Carousel';
import '../scss/components/productPage.scss';
// const UserSuggest = dynamic({
//   loader: () => import('../components/UserSuggest/UserSuggest'),
//   loading: () => <Loading />,
//   ssr: false
// });
function Page(props) {
  const productData = props.result.data || [];
  console.log(productData);
  // Determine Server Or Browser env
  if (typeof window !== 'undefined' && window.document !== undefined) {
    //console.log('browser');
  } else if (process) {
    //console.log('node');
  }
  const nextCtx = props.ctx;
  return (
    <>
      <Nav />
      <div className="product_page">
        <div className="container product_header">
          <div className="row">
            <div className="col-4 text-left">
              <a className="nav_Icons active">
                <MenuDotsSvg className="svg_icon" />
              </a>
            </div>
            <div className="col-8 text-right">
              <p className="user_name">نام کاربری</p>
              <img src="/static/img/user.png" className="userImage" />
            </div>
          </div>
        </div>
        <div className="container product_images">
          <div className="row">
            <div className="col-12">
              <Carousel fade={true} indicators={true} interval={6000} keyboard={true} pauseOnHover={true} slide={true} wrap={true} touch={true}>
                {/* <Carousel.Item>
                  <img src="/static/img/1.jpg" className="product_image" />
                  <Carousel.Caption>
                    <h3>{productData.title || ''}</h3>
                    <p>{productData.description || ''}</p>
                  </Carousel.Caption>
                </Carousel.Item> */}
                <Carousel.Item>
                  <img src={productData.picture ? 'https://api.qarun.ir/' + productData.picture : '/static/img/2.jpg'} className="product_image" />
                </Carousel.Item>
              </Carousel>
              <div className="discount_div">%{productData.discount || ''}</div>
            </div>
          </div>
        </div>
        <div className="container pt-2 product_details">
          <div className="row">
            <div className="col-6 text-left">
              <CommentSvg className="svg_icon" />
              <ShareSvg className="svg_icon ml-2" />
            </div>
            <div className="col-6 text-right">
              <HeartSvg className="svg_icon" />
            </div>
            <div className="col-12 mt-1">
              <p className="text-right product_name">{productData.title || ''}</p>
            </div>
            <div className="col-12 rtl">
              <span className="price_title"> قیمت :</span> <span className="price">{productData.lastPrice || ''} تومان</span> <span className="price_old">{productData.price || ''} تومان</span>
            </div>
            <div className="col-12 mt-1 text-center">
              <SubmitButton loading={false} text="افزودن به سبد خرید" className="d-inline-block btn-main">
                <FaPlus className="font_icon" />
              </SubmitButton>
            </div>
            <div className="mt-3 rtl description">
              <p className="describe_title">توضیحات</p>
              <p className="describe_text">متن توضیحات</p>
            </div>
          </div>
        </div>
        <div className="container mb-3 pt-2 related_products">
          <div className="row">
            <div className="col-12">
              <div className="related_product_ttile">
                محصولات مرتبط
                <div className="arrow-down"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
Page.getInitialProps = async function(context) {
  const { id } = context.query;
  const result = await fetchData(
    `User/U_Product/ProductDetails?ProductId=${id}`,
    {
      method: 'GET'
      // body: JSON.stringify({
      //   username: id
      // })
    },
    context
  );
  return { result, id };
};
export default Auth(Page);