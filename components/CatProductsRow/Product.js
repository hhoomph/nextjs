import React, { Fragment, useState, useEffect, memo } from 'react';
import Link from '../Link';
import { FaShoppingBasket } from 'react-icons/fa';
import WindowsWidth from '../WindowsWidth';
import { numberSeparator, removeSeparator } from '../../utils/tools';
const Product = props => {
  return (
    <div className="col-4 col-lg-2 product">
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
            <img src="../../static/img/profile.png" alt="نام کاربر" className="product_img" />
          </a>
        </Link>
      </div>
      <div className="product_text mb-1">
        <p>
          <span className="product_price">{numberSeparator(props.price)} </span>
          <span className="product_currency">تومان</span>
        </p>
        {props.oldPrice && (
          <p className="price_old">
            <span className="product_price">{numberSeparator(props.oldPrice)}</span>
            <span className="product_currency">تومان</span>
          </p>
        )}
      </div>
    </div>
  );
};
export default memo(Product);