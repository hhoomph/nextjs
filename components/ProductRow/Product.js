import React, { Fragment, useState, useEffect, useContext, memo } from 'react';
import Link from '../Link';
import fetchData from '../../utils/fetchData';
import Router from 'next/router';
import { FaShoppingBasket } from 'react-icons/fa';
import WindowsWidth from '../WindowsWidth';
import { numberSeparator, removeSeprator } from '../../utils/tools';
import { CartCountContext } from '../../context/context';
const Product = props => {
  const cartCountDispatch = useContext(CartCountContext);
  const width = WindowsWidth();
  const productClass = () => {
    // If Windows.Width < 992 (large) just show 5 coulmn users else show 11 users
    if (width > 1442) {
      return 'col-6 col-lg-3 col-xl-2 product';
    } else {
      return 'col-6 col-lg-3 product';
    }
  };
  const addToCart = async () => {
    //setLoading(true);
    const result = await fetchData(
      'User/U_Cart/Add',
      {
        method: 'POST',
        body: JSON.stringify({
          productId: props.id,
          count: 1
        })
      },
      props.ctx
    );
    if (result.isSuccess) {
      //toast.success('محصول شما با موفقیت به سبد خرید اضافه شد.');
      cartCountDispatch({ type: 'add' });
    } else if (result.message != undefined) {
      //toast.warn(result.message);
    } else if (result.error != undefined) {
      //toast.error(result.error);
    }
    //setLoading(false);
  };
  return (
    <div className={productClass()}>
      <div className="product_frame">
        <Link href={`/product/${props.id}`} passHref>
          <a className="product_link">
            <img src={props.image} alt={props.productName} className="product_img" />
          </a>
        </Link>
        <div className="product_basket" id={props.id} onClick={addToCart}>
          <p>سبد خرید</p>
          <FaShoppingBasket className="svg_Icons" />
        </div>
        <Link href={`/user/${props.sellerUserName}`} passHref>
          <a className="product_user">
            <img src={props.sellerAvatar} alt={props.sellerUserName} className="product_img" />
          </a>
        </Link>
        <div className="product_text">
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
    </div>
  );
};
export default memo(Product);