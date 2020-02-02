import React, { Fragment, useState, useEffect, useContext, memo } from "react";
import Link from "../Link";
import fetchData from "../../utils/fetchData";
import Router from "next/router";
import { FaShoppingBasket, FaTimesCircle, FaPlusCircle, FaMinusCircle, FaPlus } from "react-icons/fa";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import WindowsWidth from "../WindowsWidth";
import { numberSeparator, removeSeparator } from "../../utils/tools";
import { CartContext, CartCountContext } from "../../context/context";
const Product = props => {
  const cartDispatch = useContext(CartContext);
  const cartCountDispatch = useContext(CartCountContext);
  const width = WindowsWidth();
  const [cartCountNumb, setCartCountNumb] = useState(props.cartCount);
  const productClass = () => {
    // If Windows.Width < 992 (large) just show 5 column users else show 11 users
    if (width > 1442) {
      return "col-6 col-lg-3 col-xl-2 product";
    } else {
      return "col-6 col-lg-3 product";
    }
  };
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
    if (result.isSuccess) {
      //toast.success('محصول شما با موفقیت به سبد خرید اضافه شد.');
      cartCountDispatch({ type: "add" });
      setCartCountNumb(cartCountNumb + 1);
    } else if (result.message != undefined) {
      //toast.warn(result.message);
    } else if (result.error != undefined) {
      //toast.error(result.error);
    }
    //setLoading(false);
  };
  // const getCartData = async () => {
  //   const getCartDataRes = await fetchData(
  //     "User/U_Cart/GetAll",
  //     {
  //       method: "GET"
  //     },
  //     props.ctx
  //   );
  //   if (getCartDataRes !== undefined && getCartDataRes.isSuccess) {
  //     let cData = getCartDataRes.data || [];
  //     cartDispatch({ type: "refresh", payload: [] });
  //     cartDispatch({ type: "refresh", payload: cData });
  //   }
  // };
  const addProductQuantity = async () => {
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
    if (result.isSuccess) {
      cartCountDispatch({ type: "add" });
      setCartCountNumb(cartCountNumb + 1);
    }
  };
  const reduceProductQuantity = async () => {
    const result = await fetchData(
      "User/U_Cart/Reduce",
      {
        method: "POST",
        body: JSON.stringify({
          productId: props.id
        })
      },
      props.ctx
    );
    if (result.isSuccess) {
      cartCountDispatch({ type: "remove" });
      setCartCountNumb(cartCountNumb - 1);
    }
  };
  return (
    <div className={productClass()}>
      <div className="product_frame">
        <Link href={`/user/${props.sellerUserName}`} passHref>
          <a className="text-truncate product_user">
            {props.sellerUserName}
            <img src={props.sellerAvatar} alt={props.sellerUserName} className="product_img" />
          </a>
        </Link>
        <Link href={`/product/${props.id}`} as={`/product/${props.id}/${props.productName.trim().replace(/ /g, "-")}`} passHref>
          <a className="product_link">
            <img src={props.image} alt={props.productName} className="product_img" />
          </a>
        </Link>
        {cartCountNumb <= 0 && (
          <div className="product_basket" id={props.id} onClick={addToCart}>
            <p>سبد خرید</p>
            <FaPlusCircle className="font_icon" />
          </div>
        )}
        {/* <div className={`cart_basket_div ${cartCountNumb > 0 ? "" : "hide_crt"}`}> */}
        {cartCountNumb > 0 && (
          <div className={"cart_basket_div"}>
            <div className="basket_add" onClick={addProductQuantity}>
              <IoMdAdd className="font_icon" />
            </div>
            <div className="basket_value">{cartCountNumb}</div>
            <div className="basket_reduce" onClick={reduceProductQuantity}>
              <IoMdRemove className="font_icon" />
            </div>
          </div>
        )}
        <div className="product_text">
          <p className="text-truncate text-center product_name">{props.productName}</p>
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
    </div>
  );
};
export default memo(Product);