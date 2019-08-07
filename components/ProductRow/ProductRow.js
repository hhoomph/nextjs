import React, { Fragment, useState, useEffect, memo } from 'react';
import Link from '../Link';
import Product from './Product';
import '../../scss/components/productRow.scss';
const ProductsRow = () => {
  return (
    <div className="container mt-1">
      <div className="row rtl product_row">
        <Product id={1} price={120000} oldPrice={'140000'} image={'product.png'} userId={1} userImage={'user.png'} />
        <Product id={2} price={140000} image={'product3.png'} userId={2} userImage={'user.png'} />
        <Product id={3} price={120000} image={'product2.png'} userId={1} userImage={'profile.png'} />
        <Product id={4} price={130000} image={'product.png'} userId={2} userImage={'user.png'} />
        <Product id={5} price={120000} image={'product3.png'} userId={3} userImage={'profile.png'} />
        <Product id={6} price={110000} oldPrice={'120000'} image={'product2.png'} userImage={'user.png'} userId={2} />
        <Product id={7} price={120000} image={'product3.png'} userId={2} userImage={'profile.png'}/>
        <Product id={8} price={130000} image={'product2.png'} userId={1} userImage={'user.png'} />
      </div>
    </div>
  );
};
export default memo(ProductsRow);