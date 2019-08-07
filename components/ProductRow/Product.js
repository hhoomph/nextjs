import React, { Fragment, useState, useEffect, memo } from 'react';
import Link from '../Link';
import { FaShoppingBasket } from 'react-icons/fa';
import WindowsWidth from '../WindowsWidth';
import { numberSeprator, removeSeprator } from '../../utils/tools';
const Product = props => {
  const width = WindowsWidth();
  const productClass = () => {
    // If Windows.Width < 992 (large) just show 5 coulmn users else show 11 users
    if (width > 1442) {
      return 'col-6 col-lg-3 col-xl-2 product';
    } else {
      return 'col-6 col-lg-3 product';
    }
  };
  return (
    <div className={productClass()}>
      <div className="product_frame">
        <Link href={`/product/${props.id}`} passHref>
          <a className="product_link">
            <img src={`../../static/img/${props.image}`} alt="نام محصول" className="product_img" />
          </a>
        </Link>
        <div className="product_basket" id={props.id}>
          <p>سبد خرید</p>
          <FaShoppingBasket className="svg_Icons" />
        </div>
        <Link href={`/user/${props.userId}`} passHref>
          <a className="product_user">
            <img src={`../../static/img/${props.userImage}`} alt="نام کاربر" className="product_img" />
          </a>
        </Link>
      </div>
      {/* <div className="product_text mb-1">
        <p>
          <span className="product_price">{numberSeprator(props.price)} </span>
          <span className="product_currency">تومان</span>
        </p>
        {props.oldPrice && (
          <p className="price_old">
            <span className="product_price">{numberSeprator(props.oldPrice)}</span>
            <span className="product_currency">تومان</span>
          </p>
        )}
      </div> */}
    </div>
  );
};
export default memo(Product);