import React, { useState, useEffect, memo } from "react";
import Link from "../Link";
import Search from "./Search";
import { FiGrid } from "react-icons/fi";
import { FaShoppingBasket, FaRegUserCircle } from "react-icons/fa";
import { ReactComponent as HomeSvg } from "../../public/static/svg/home.svg";
import { ReactComponent as MenuSvg } from "../../public/static/svg/menu.svg";
import { ReactComponent as HeartGray } from "../../public/static/svg/insta/heart-gray.svg";
import { ReactComponent as UserSvg } from "../../public/static/svg/profile.svg";
import { ReactComponent as AddSvg } from "../../public/static/svg/plus.svg";
import { ReactComponent as SearchSvg } from "../../public/static/svg/search.svg";
import "../../scss/components/nav.scss";
// check prev and next state to use Memo
const areEqual = (prevProps, nextProps) => {
  return prevProps === nextProps;
};
const Nav = props => {
  return (
    <>
      {/* Top Navbar in Desktop Mode */}
      <nav className="d-none d-lg-flex top_nav navbar navbar-expand navbar-white bg-white">
        <div className="col-4 d-flex">
          <Link href="/cart" passHref>
            <a className="nav_Icons active">
              <FaShoppingBasket />
              <div className="badge badge-success">{props.cartCount}</div>
            </a>
          </Link>
          <Link href="/profile" passHref>
            <a className="nav_Icons">
              <FaRegUserCircle />
            </a>
          </Link>
          <Link href="/category" passHref>
            <a className="nav_Icons">
              <FiGrid />
            </a>
          </Link>
        </div>
        <div className="col-4 d-flex justify-content-center">
          <Search />
        </div>
        <div className="col-4 d-flex justify-content-end">
          <Link href="/" passHref>
            <a className="navbar-brand">
              <img src="/static/img/splash.png" width="80" height="80" className="d-inline-block align-top" alt="" />
            </a>
          </Link>
        </div>
      </nav>
      {/* Bottom Navbar in Desktop Mode */}
      <nav className="d-none d-lg-flex fixed-bottom top_nav navbar navbar-expand navbar-white desktop_bottom">
        <div className="col-12 d-flex justify-content-center">
          <Link href="/terms" passHref>
            <a className="nav-link">شرایط و قوانین</a>
          </Link>
          <Link href="/complaint" passHref>
            <a className="nav-link">ثبت شکایات</a>
          </Link>
          <Link href="/contact" passHref>
            <a className="nav-link">تماس با ما</a>
          </Link>
          <Link href="/about-us" passHref>
            <a className="nav-link">درباره ما</a>
          </Link>
        </div>
      </nav>
      {/* Bottom Navbar in Mobile Mode */}
      <nav className="d-flex d-lg-none bottom_nav navbar fixed-bottom navbar-white bg-white">
        <div className="col-12 d-flex justify-content-center p-1">
          <Link href="/profile" passHref>
            <a className="nav_Icons">
              <UserSvg className="svg_Icons" />
              {/* <img src={"/static/img/user.png"} className="svg_Icons" style={{ width: "2rem", height: "2rem" }} />
              <div className="badge badge-success">2</div> */}
            </a>
          </Link>
          <Link href="/search" passHref>
            <a className="nav_Icons">
              <SearchSvg className="svg_Icons" transform="rotate(90)" />
            </a>
          </Link>
          <Link href="/add-product" passHref>
            <a className="nav_Icons">
              <AddSvg className="svg_Icons" />
            </a>
          </Link>
          <Link href="/category" passHref>
            <a className="nav_Icons">
              <MenuSvg className="svg_Icons" />
              {/* <HeartGray className="svg_Icons" /> */}
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