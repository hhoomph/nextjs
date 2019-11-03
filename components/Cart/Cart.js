import React, { Fragment, useState, useEffect, memo } from 'react';
import Link from '../Link';
import { FaTimesCircle, FaTimes, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import '../../scss/components/cart.scss';
const Cart = props => {
  const nextCtx = props.ctx;
  const [showRow, setShowRow] = useState(true);
  const toggleRow = () => {
    if (showRow) {
      return <FaChevronUp onClick={() => setShowRow(!showRow)} className="font_icon up" />;
    } else {
      return <FaChevronDown onClick={() => setShowRow(!showRow)} className="font_icon down" />;
    }
  };
  const [productQuantity, setProductQuantity] = useState('1');
  const handleSelect = e => {
    setProductQuantity(e.target.value);
  };
  return (
    <div className="container cart">
      <div className="row cart_seller" onClick={() => setShowRow(!showRow)}>
        <div className="col-4 m-auto text-left">
          <a className="nav_Icons active">
            {toggleRow()}
            {/* <FaChevronDown className="font_icon" />
            <FaChevronUp className="font_icon" /> */}
          </a>
        </div>
        <div className="col-8 text-right">
          <p className="user_name d-inline-block mr-2">فروشنده ی یک</p>
          <img src="/static/img/profile.png" className="userImage" />
        </div>
      </div>
      <div className="row products_rows" hidden={!showRow}>
        <div className="col rtl d-flex justify-content-start product_row">
          <div className="product_name text-truncate">نام کالای یک</div>
          <div className="product_quantity">
            {/* <span>تعداد : </span> */}
            <select title="تعداد" className="form-control" value={productQuantity} onChange={handleSelect}>
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
            </select>
          </div>
          <div className="product_price">
            5،000،000 <span> تومان </span>
          </div>
          <div className="product_close">
            <FaTimesCircle className="font_icon" />
          </div>
        </div>
        <div className="col-12 rtl d-flex justify-content-start product_row">
          <div className="product_name text-truncate">نام کالای یک</div>
          <div className="product_quantity">
            {/* <span>تعداد : </span> */}
            <select title="تعداد" className="form-control" value={productQuantity} onChange={handleSelect}>
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
            </select>
          </div>
          <div className="product_price">
            5،000،000 <span> تومان </span>
          </div>
          <div className="product_close">
            <FaTimesCircle className="font_icon" />
          </div>
        </div>
        <div className="col-12 rtl d-flex justify-content-start product_row">
          <div className="product_name text-truncate">نام کالای یک</div>
          <div className="product_quantity">
            {/* <span>تعداد : </span> */}
            <select title="تعداد" className="form-control" value={productQuantity} onChange={handleSelect}>
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
            </select>
          </div>
          <div className="product_price">
            5،000،000 <span> تومان </span>
          </div>
          <div className="product_close">
            <FaTimesCircle className="font_icon" />
          </div>
        </div>
        <div className="col-12 rtl d-flex justify-content-start product_row">
          <div className="product_name text-truncate">نام کالای یک</div>
          <div className="product_quantity">
            {/* <span>تعداد : </span> */}
            <select title="تعداد" className="form-control" value={productQuantity} onChange={handleSelect}>
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
            </select>
          </div>
          <div className="product_price">
            5،000،000 <span> تومان </span>
          </div>
          <div className="product_close">
            <FaTimesCircle className="font_icon" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Cart);