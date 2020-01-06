import React, { Fragment, useState, useEffect, useContext, memo } from "react";
import Link from "../Link";
import Router from "next/router";
import fetchData from "../../utils/fetchData";
import { CartContext, CartCountContext } from "../../context/context";
import { FaTimesCircle, FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import { numberSeparator, removeSeparator } from "../../utils/tools";
import "../../scss/components/cart.scss";
const ProductRow = props => {
  const nextCtx = props.ctx;
  const type = props.type;
  const { shopingCartId, productId, setLoading } = props;
  const [productQuantity, setProductQuantity] = useState(props.productQuantity);
  const cartDispatch = useContext(CartContext);
  const cartCountDispatch = useContext(CartCountContext);
  const handleSelect = e => {
    setProductQuantity(e.target.value);
  };
  const getCartData = async () => {
    setLoading(true);
    const getCartDataRes = await fetchData(
      "User/U_Cart/GetAll",
      {
        method: "GET"
      },
      props.ctx
    );
    if (getCartDataRes !== undefined && getCartDataRes.isSuccess) {
      let cData = getCartDataRes.data || [];
      cartDispatch({ type: "refresh", payload: [] });
      cartDispatch({ type: "refresh", payload: cData });
    }
    setLoading(false);
  };
  const addProductQuantity = async () => {
    setLoading(true);
    const result = await fetchData(
      "User/U_Cart/Add",
      {
        method: "POST",
        body: JSON.stringify({
          productId: productId,
          count: 1
        })
      },
      props.ctx
    );
    if (result.isSuccess) {
      getCartData();
      cartCountDispatch({ type: "add" });
    }
    setLoading(false);
  };
  const reduceProductQuantity = async () => {
    setLoading(true);
    const result = await fetchData(
      "User/U_Cart/Reduce",
      {
        method: "POST",
        body: JSON.stringify({
          shopingCartId: shopingCartId
        })
      },
      props.ctx
    );
    if (result.isSuccess) {
      getCartData();
      cartCountDispatch({ type: "remove" });
    }
    setLoading(false);
  };
  const deleteProduct = async productQuantity => {
    setLoading(true);
    const result = await fetchData(
      "User/U_Cart/Delete",
      {
        method: "POST",
        body: JSON.stringify({
          shopingCartId: shopingCartId
        })
      },
      props.ctx
    );
    if (result.isSuccess) {
      getCartData();
      cartCountDispatch({ type: "delete", payload: productQuantity });
    }
    setLoading(false);
  };
  return (
    <div className="col-12 p-0 pr-3 pl-3 rtl d-flex justify-content-start product_row">
      <div className="col-2 p-0  align-self-center">
        <Link href={`/product/${productId}`} as={`/product/${productId}/${props.productName.trim().replace(/ /g, "-")}`} passHref>
          <img className="product_img" src={`https://api.qarun.ir/${props.productImage}`} />
        </Link>
      </div>
      <div className="col-10 p-0 align-self-center">
        <div className="col-12 p-1 d-flex">
          <div className="product_name text-truncate">{props.productName}</div>
          <div className="mr-2 price_label">مبلغ کل</div>
        </div>
        <div className="col-12 p-1 d-flex">
          <div className="col-5 p-0 product_price">
            {numberSeparator(props.productPrice)} <span> تومان </span>
          </div>
          <div className="col-2 p-0 product_quantity">{productQuantity} عدد</div>
          <div className="col-5 product_total_price_val">{numberSeparator(productQuantity * props.productPrice)} تومان</div>
        </div>
      </div>
    </div>
  );
};
export default memo(ProductRow);