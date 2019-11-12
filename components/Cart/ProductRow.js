import React, { Fragment, useState, useEffect, useContext, memo } from 'react';
import Link from '../Link';
import fetchData from '../../utils/fetchData';
import { CartContext, CartCountContext } from '../../context/context';
import { FaTimesCircle, FaPlusSquare, FaMinusSquare } from 'react-icons/fa';
import { numberSeparator, removeSeparator } from '../../utils/tools';
import '../../scss/components/cart.scss';
const ProductRow = props => {
  const nextCtx = props.ctx;
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
      'User/U_Cart/GetAll',
      {
        method: 'GET'
      },
      props.ctx
    );
    if (getCartDataRes !== undefined && getCartDataRes.isSuccess) {
      let cData = getCartDataRes.data || [];
      cartDispatch({ type: 'refresh', payload: [] });
      cartDispatch({ type: 'refresh', payload: cData });
    }
    setLoading(false);
  };
  const addProductQuantity = async () => {
    setLoading(true);
    const result = await fetchData(
      'User/U_Cart/Add',
      {
        method: 'POST',
        body: JSON.stringify({
          productId: productId,
          count: 1
        })
      },
      props.ctx
    );
    if (result.isSuccess) {
      getCartData();
      cartCountDispatch({ type: 'add' });
    }
    setLoading(false);
  };
  const reduceProductQuantity = async () => {
    setLoading(true);
    const result = await fetchData(
      'User/U_Cart/Reduce',
      {
        method: 'POST',
        body: JSON.stringify({
          shopingCartId: shopingCartId
        })
      },
      props.ctx
    );
    if (result.isSuccess) {
      getCartData();
      cartCountDispatch({ type: 'remove' });
    }
    setLoading(false);
  };
  const deleteProduct = async () => {
    setLoading(true);
    const result = await fetchData(
      'User/U_Cart/Delete',
      {
        method: 'POST',
        body: JSON.stringify({
          shopingCartId: shopingCartId
        })
      },
      props.ctx
    );
    if (result.isSuccess) {
      getCartData();
    }
    setLoading(false);
  };
  return (
    <div className="col-12 p-0 rtl d-flex justify-content-start product_row">
      <div className="col-3 p-0  align-self-center">
        <Link href={`/product/${productId}`} passHref>
          <img className="product_img" src={`https://api.qaroon.ir/${props.productImage}`} />
        </Link>
      </div>
      <div className="col-9 p-0 align-self-center">
        <div className="col-12 p-1 d-flex">
          <div className="product_name text-truncate">{props.productName}</div>
          <div className="product_close" onClick={deleteProduct}>
            <FaTimesCircle className="font_icon" />
          </div>
        </div>
        <div className="col-12 p-1 d-flex">
          <div className="product_price">
            {numberSeparator(props.productPrice)} <span> تومان </span>
          </div>
          <div className="product_quantity">
            <span>تعداد : </span>
            <div
              className="add_quantity"
              onClick={() => {
                addProductQuantity();
                // setProductQuantity(productQuantity + 1);
              }}
            >
              <FaPlusSquare className="font_icon" />
            </div>
            <div className="val_quantity">{productQuantity}</div>
            <div
              className="delete_quantity"
              onClick={() => {
                reduceProductQuantity();
                //productQuantity > 1 ? setProductQuantity(productQuantity - 1) : setProductQuantity(1);
              }}
            >
              <FaMinusSquare className="font_icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(ProductRow);