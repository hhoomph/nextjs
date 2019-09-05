import React, { Fragment, useState, useEffect, memo } from 'react';
import Link from '../Link';
import '../../scss/components/CategoryMenu.scss';
import Category from './Category';
import { ReactComponent as LeftSvg } from '../../static/svg/left-arrow.svg';
const CategoryMenu = () => {
  return (
    <div className="container-fluid overflow-hidden rtl pt-3 category_menu">
      <div className="row mb-3 header_link">
        <div className="col-6 text-left">
          <Link href="/" passHref>
            <a className="qarun_title">قارون</a>
          </Link>
        </div>
        <div className="col-6 text-right">
          <Link href="/" passHref>
            <a>
              <LeftSvg className="svg_icon" />
            </a>
          </Link>
        </div>
      </div>
      <div className="row pl-2">
        <div className="col">
          <ul className="nav">
            <Category id={1} name={'سوپر مارکت'} />
            <Category id={2} name={'رستوران و فست فود'} active={true} />
            <Category id={3} name={'نان و شیرینی'} />
            <Category id={4} name={'میوه و سبزی'} />
            <Category id={5} name={'مد و پوشاک'} />
            <Category id={6} name={'زیبایی و سلامت'} />
            <Category id={7} name={'عطاری و دارویی'} />
            <Category id={8} name={'صنایع دستی'} />
            <Category id={9} name={'الکترونیک و دیجیتال'} />
            <Category id={10} name={'لوازم منزل'} />
            <Category id={11} name={'کتاب و تحریر'} />
          </ul>
        </div>
      </div>
    </div>
  );
};
export default CategoryMenu;