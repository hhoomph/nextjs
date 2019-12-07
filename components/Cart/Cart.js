import React, { Fragment, useState, useEffect, memo } from 'react';
import Link from '../Link';
import dynamic from 'next/dynamic';
import Loading from '../Loader/Loading';
import { FaTimesCircle, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import '../../scss/components/cart.scss';
const ProductRow = dynamic({
  loader: () => import('./ProductRow'),
  loading: () => <Loading />,
  ssr: true
});
const Cart = props => {
  const nextCtx = props.ctx;
  const [showRow, setShowRow] = useState(true);
  const { cartData } = props;
  const renderProductsRow = cartData.cartDetailsSelectDtos.map(product => <ProductRow key={product.productId} productId={product.productId} productName={product.productTitle} productImage={product.pictures[0].thumbNail} productPrice={product.productPrice} shopingCartId={product.id} productQuantity={product.count} setLoading={props.setLoading} />);
  const toggleRow = () => {
    if (showRow) {
      return <FaChevronUp onClick={() => setShowRow(!showRow)} className="font_icon up" />;
    } else {
      return <FaChevronDown onClick={() => setShowRow(!showRow)} className="font_icon down" />;
    }
  };
  return (
    <div className="container cart">
      <div className="row cart_seller" onClick={() => setShowRow(!showRow)}>
        <div className="col-4 m-auto text-left">
          <a className="nav_Icons active">
            {toggleRow()}
            {/* <FaChevronDown className="font_icon" />
            <FaChevronUp className="font_icon" /> */}
          </a>
        </div>
        <div className="col-8 text-right d-flex pr-1">
          <p className="seller_name d-inline-block mr-2 text-truncate rtl">{props.sellerName}</p>
          <img src={props.sellerAvatar} className="userImage" />
        </div>
      </div>
      <div className="row products_rows" hidden={!showRow}>
        {/* <ProductRow productName={'نام کالای یک'} productImage={'/static/img/no-product-image.png'} productPrice={550000} productQuantity={2} />
        <ProductRow productName={'نام کالای دو'} productImage={'/static/img/product2.png'} productPrice={6550000} productQuantity={1} />
        <ProductRow productName={'نام کالای سه'} productImage={'/static/img/product3.png'} productPrice={1050000} productQuantity={1} />
        <ProductRow productName={'نام کالای چهار'} productImage={'/static/img/product.png'} productPrice={250000} productQuantity={4} /> */}
        {renderProductsRow}
      </div>
      {/* // Call To Seller
      <a href="tel:+1-303-499-7111">+1 (303) 499-7111</a> */}
    </div>
  );
};
export default memo(Cart);