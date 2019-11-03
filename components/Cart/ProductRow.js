import React, { Fragment, useState, useEffect, memo } from 'react';
import Link from '../Link';
import { FaTimesCircle, FaPlusSquare, FaMinusSquare } from 'react-icons/fa';
import '../../scss/components/cart.scss';
const ProductRow = props => {
  const nextCtx = props.ctx;
  const [productQuantity, setProductQuantity] = useState(props.productQuantity);
  const handleSelect = e => {
    setProductQuantity(e.target.value);
  };
  return (
    <div className="col-12 p-0 rtl d-flex justify-content-start product_row">
      <div className="col-3 p-0  align-self-center">
        <img className="product_img" src={props.productImage} />
      </div>
      <div className="col-9 p-0 align-self-center">
        <div className="col-12 p-1 d-flex">
          <div className="product_name text-truncate">{props.productName}</div>
          <div className="product_close">
            <FaTimesCircle className="font_icon" />
          </div>
        </div>
        <div className="col-12 p-1 d-flex">
          <div className="product_price">
            {props.productPrice} <span> تومان </span>
          </div>
          <div className="product_quantity">
            <span>تعداد : </span>
            <div className="add_quantity" onClick={() => setProductQuantity(productQuantity + 1)}>
            <FaPlusSquare className="font_icon" />
            </div>
            <div className="val_quantity">{productQuantity}</div>
            <div className="delete_quantity" onClick={() => (productQuantity > 1 ? setProductQuantity(productQuantity - 1) : setProductQuantity(1))}>
            <FaMinusSquare className="font_icon" />
            </div>
            {/* <select title="تعداد" className="form-control" value={productQuantity} onChange={handleSelect}>
              <option value="-1" disabled>
                تعداد
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
            </select> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(ProductRow);