import React, { useState, useEffect, memo } from 'react';
import Link from '../Link';
import Search from './Search';
import { FiGrid } from 'react-icons/fi';
import { FaShoppingBasket, FaRegUserCircle } from 'react-icons/fa';
import { ReactComponent as HomeSvg } from '../../static/svg/home.svg';
import { ReactComponent as MenuSvg } from '../../static/svg/menu.svg';
import { ReactComponent as UserSvg } from '../../static/svg/profile.svg';
import { ReactComponent as AddSvg } from '../../static/svg/plus.svg';
import { ReactComponent as SearchSvg } from '../../static/svg/search.svg';
import '../../scss/components/nav.scss';
// check prev and next state to use Memo
const areEqual = (prevProps, nextProps) => {
  return prevProps === nextProps;
};
const Nav = () => {
  return (
    <>
      <nav className="d-none d-md-flex top_nav navbar navbar-expand navbar-white bg-white">
        <div className="col-4 d-flex">
          <Link href="/" passHref>
            <a className="nav_Icons active">
              <FaShoppingBasket />
              <div className="badge badge-success">10</div>
            </a>
          </Link>
          <Link href="/counter" passHref>
            <a className="nav_Icons">
              <FaRegUserCircle />
            </a>
          </Link>
          <Link href="/todo" passHref>
            <a className="nav_Icons">
              <FiGrid />
            </a>
          </Link>
        </div>
        <div className="col-4 d-flex justify-content-center">
          <Search/>
        </div>
        <div className="col-4 d-flex justify-content-end">
          <Link href="/" passHref>
            <a className="navbar-brand">
              <img src="../../static/img/splash.png" width="80" height="80" className="d-inline-block align-top" alt="" />
            </a>
          </Link>
        </div>
      </nav>
      <nav className="d-flex d-md-none bottom_nav navbar fixed-bottom navbar-white bg-white">
        <div className="col-12 d-flex justify-content-center">
          <Link href="/counter" passHref>
            <a className="nav_Icons">
              <UserSvg className="svg_Icons" />
            </a>
          </Link>
          <Link href="/counter" passHref>
            <a className="nav_Icons">
              <SearchSvg className="svg_Icons" transform="rotate(90)" />
            </a>
          </Link>
          <Link href="/" passHref>
            <a className="nav_Icons">
              <AddSvg className="svg_Icons" />
            </a>
          </Link>
          <Link href="/todo" passHref>
            <a className="nav_Icons">
              <MenuSvg className="svg_Icons" />
            </a>
          </Link>
          <Link href="/" passHref>
            <a className="nav_Icons">
              <HomeSvg className="svg_Icons" />
            </a>
          </Link>
        </div>
      </nav>
    </>
  );
};
export default memo(Nav, areEqual);