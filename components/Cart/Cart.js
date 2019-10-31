import React, { Fragment, useState, useEffect, memo } from 'react';
import Link from '../Link';
import { FaTimesCircle, FaTimes, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import '../../scss/components/cart.scss';
const Cart = props => {
  const nextCtx = props.ctx;
  return (
    <div className="container cart">
      <div className="row cart_seller">
        <div className="col-4 text-left">
          <a className="nav_Icons active">
            <FaChevronDown className="font_icon" />
            <FaChevronUp className="font_icon" />
          </a>
        </div>
        <div className="col-8 text-right">
          <p className="user_name d-inline-block mr-2">فروشنده ی یک</p>
          <img src="/static/img/profile.png" className="userImage" />
        </div>
      </div>
      <div className="row products_row">
        <div className="col">
          <div className="product_name">نام کالای 1</div>
          <div className="product_quantity">
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Cart);