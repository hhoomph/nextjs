import React, { Fragment, useState, useEffect, memo } from 'react';
import Link from '../Link';
import { ReactComponent as LeftSvg } from '../../static/svg/left-arrow.svg';
import '../../scss/components/CategoryMenu.scss';
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
            <li className="nav-item">
              <i class="bullet"></i>
              <Link href="/categories" passHref>
                <a className="nav-link">سوپر مارکت</a>
              </Link>
            </li>
            <li className="nav-item active">
              <i class="bullet"></i>
              <Link href="/categories" passHref>
                <a className="nav-link">رستوران و فست فود</a>
              </Link>
            </li>
            <li className="nav-item">
              <i class="bullet"></i>
              <Link href="/categories" passHref>
                <a className="nav-link">نان و شیرینی</a>
              </Link>
            </li>
            <li className="nav-item">
              <i class="bullet"></i>
              <Link href="/categories" passHref>
                <a className="nav-link">میوه و سبزی</a>
              </Link>
            </li>
            <li className="nav-item">
              <i class="bullet"></i>
              <Link href="/categories" passHref>
                <a className="nav-link">مد و پوشاک</a>
              </Link>
            </li>
            <li className="nav-item">
              <i class="bullet"></i>
              <Link href="/categories" passHref>
                <a className="nav-link">زیبایی و سلامت</a>
              </Link>
            </li>
            <li className="nav-item">
              <i class="bullet"></i>
              <Link href="/categories" passHref>
                <a className="nav-link">عطاری و دارویی</a>
              </Link>
            </li>
            <li className="nav-item">
              <i class="bullet"></i>
              <Link href="/categories" passHref>
                <a className="nav-link">صنایع دستی</a>
              </Link>
            </li>
            <li className="nav-item">
              <i class="bullet"></i>
              <Link href="/categories" passHref>
                <a className="nav-link">الکترونیک و دیجیتال</a>
              </Link>
            </li>
            <li className="nav-item">
              <i class="bullet"></i>
              <Link href="/categories" passHref>
                <a className="nav-link">لوازم منزل</a>
              </Link>
            </li>
            <li className="nav-item">
              <i class="bullet"></i>
              <Link href="/categories" passHref>
                <a className="nav-link">کتاب و تحریر</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default memo(CategoryMenu);