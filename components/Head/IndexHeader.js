import React, { useState, useEffect, memo } from "react";
import Link from "../Link";
import { FaShoppingBasket, FaRegUserCircle } from "react-icons/fa";
// import { ReactComponent as SendSvg } from "../../public/static/svg/send.svg";
import { ReactComponent as SendSvg } from "../../public/static/svg/send.svg";
import { ReactComponent as BasketSvg } from "../../public/static/svg/shopping-basket.svg";
import "../../scss/components/indexHeader.scss";
const IndexHeader = props => {
  return (
    <div className="container d-lg-none mt-1 index_header">
      <div className="row d-flex d-lg-none">
        <div className="col-4">
          <Link href="/cart" passHref>
            <a className="nav_Icons active">
              <BasketSvg className="svg_Icons" />
              {props.cartCount > 0 && <div className="badge badge-success">{props.cartCount}</div>}
            </a>
          </Link>
        </div>
        <div className="col-4 d-flex justify-content-center">
          <Link href="/" passHref>
            <a className="navbar-brand">
              <img src="/static/img/text-logo.png" width="80" height="80" className="d-inline-block align-top" alt="" />
            </a>
          </Link>
        </div>
        <div className="col-4 d-flex justify-content-end">
          <Link href="/direct" passHref>
            <a className="nav_Icons">
              <SendSvg className="svg_Icons" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default memo(IndexHeader);