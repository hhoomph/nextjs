import React, { Fragment, useState, useEffect, useContext, memo } from "react";
import Link from "../Link";
import fetchData from "../../utils/fetchData";
import Router from "next/router";
import { FaShoppingBasket } from "react-icons/fa";
import WindowsWidth from "../WindowsWidth";
import { numberSeparator, removeSeparator } from "../../utils/tools";
import { CartCountContext } from "../../context/context";
const Product = props => {
  const cartCountDispatch = useContext(CartCountContext);
  const addToCart = async () => {
    //setLoading(true);
    const result = await fetchData(
      "User/U_Cart/Add",
      {
        method: "POST",
        body: JSON.stringify({
          productId: props.id,
          count: 1
        })
      },
      props.ctx
    );
    if (result !== undefined && result.isSuccess !== undefined && result.isSuccess) {
      //toast.success('محصول شما با موفقیت به سبد خرید اضافه شد.');
      cartCountDispatch({ type: "add" });
    } else if (result !== undefined && result.message != undefined) {
      //toast.warn(result.message);
    } else if (result !== undefined && result.error != undefined) {
      //toast.error(result.error);
    }
    //setLoading(false);
  };
  return (
    <div className="col-4 col-lg-2 product">
      <div className="product_frame">
        <Link href={`/user/${props.sellerUserName}`} passHref>
          <a className="product_user text-truncate">
            {props.sellerUserName}
            <img src={props.sellerAvatar} alt={props.sellerUserName} className="product_img" />
          </a>
        </Link>
        <Link href={`/product/${props.id}`} as={`/product/${props.id}/${props.productName.trim().replace(/ /g, "-")}`} passHref>
          <a className="product_link">
            <img src={props.image} alt={props.productName} className="product_img" />
          </a>
        </Link>
        {/* <div className="product_basket" id={props.id} onClick={addToCart}>
          <p>سبد خرید</p>
          <FaShoppingBasket className="svg_Icons" />
        </div> */}
        <div className="product_text mb-1 p-0">
          <p className="text-truncate">{props.productName}</p>
          <p>
            <span className="product_price">{numberSeparator(props.price)} </span>
            <span className="product_currency">تومان</span>
          </p>
          {props.oldPrice && props.oldPrice !== props.price ? (
            <p className="price_old">
              <span className="product_price">{numberSeparator(props.oldPrice)}</span>
              <span className="product_currency">تومان</span>
            </p>
          ) : (
            <p className="price_old"></p>
          )}
        </div>
      </div>
      {/* <div className="product_text mb-1">
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
      </div> */}
    </div>
  );
};
export default memo(Product);