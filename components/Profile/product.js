import React, { Fragment, useState, useEffect, memo } from 'react';
import Link from '../Link';
import { FaShoppingBasket, FaTimesCircle } from 'react-icons/fa';
import { ReactComponent as RemoveSvg } from '../../public/static/svg/remove-button.svg';
import WindowsWidth from '../WindowsWidth';
import { numberSeparator, removeSeparator } from '../../utils/tools';
import '../../scss/components/profileProduct.scss';
const Product = props => {
  return (
    <div className="col-4 col-lg-2 product">
      <div className="product_frame">
        <Link href={`/product/${props.id}`} passHref>
          <a className="product_link">
            <img src={`/static/img/${props.image}`} alt="نام محصول" className="product_img" />
          </a>
        </Link>
        {props.basket && (
          <div className="product_basket" id={props.id} title="افزودن به سبد خرید">
            <p>سبد خرید</p>
            <FaShoppingBasket className="svg_Icons" />
          </div>
        )}
        {props.delete && (
          <a className="product_action" title="حذف محصول">
            <FaTimesCircle className="svg_icon" />
          </a>
        )}
      </div>
      {props.showPrice && (
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
      )}
    </div>
  );
};
export default memo(Product);