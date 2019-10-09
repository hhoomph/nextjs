import React, { Fragment, useState, useEffect, memo } from 'react';
import Link from '../Link';
import Category from './Category';
import Sort from './Sort';
import Product from './Product';
import '../../scss/components/catProductsRow.scss';
const CatProductsRow = () => {
  return (
    <div className="container mb-1 cat_product_row">
      <div className="row">
        <div className="col">
          <div className="row d-flex justify-content-start rtl pr-2 categories">
            {/* <Category /> */}
          </div>
          <div className="row d-flex justify-content-center rtl pr-2 mb-3 cat_sort">
            <Sort />
          </div>
          <div className="row d-flex justify-content-start rtl products">
            <Product id={1} price={120000} oldPrice={'140000'} image={'product.png'} userId={1} />
            <Product id={2} price={140000} image={'product3.png'} userId={2} />
            <Product id={3} price={120000} image={'product2.png'} userId={1} />
            <Product id={4} price={130000} image={'product.png'} userId={2} />
            <Product id={5} price={120000} image={'product3.png'} userId={3} />
            <Product id={6} price={110000} oldPrice={'120000'} image={'product2.png'} userId={2}  />
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(CatProductsRow);