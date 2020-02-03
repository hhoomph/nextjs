import React, { useState, useEffect, memo } from "react";
import Link from "../Link";
import "../../scss/components/nav.scss";
// check prev and next state to use Memo
const areEqual = (prevProps, nextProps) => {
  return prevProps === nextProps;
};
const HeartIcon = props => {
  return (
    <svg aria-label="Activity Feed" className={props.className} fill="#262626" viewBox="0 0 48 48">
      <path d="M34.3 3.5C27.2 3.5 24 8.8 24 8.8s-3.2-5.3-10.3-5.3C6.4 3.5.5 9.9.5 17.8s6.1 12.4 12.2 17.8c9.2 8.2 9.8 8.9 11.3 8.9s2.1-.7 11.3-8.9c6.2-5.5 12.2-10 12.2-17.8 0-7.9-5.9-14.3-13.2-14.3zm-1 29.8c-5.4 4.8-8.3 7.5-9.3 8.1-1-.7-4.6-3.9-9.3-8.1-5.5-4.9-11.2-9-11.2-15.6 0-6.2 4.6-11.3 10.2-11.3 4.1 0 6.3 2 7.9 4.2 3.6 5.1 1.2 5.1 4.8 0 1.6-2.2 3.8-4.2 7.9-4.2 5.6 0 10.2 5.1 10.2 11.3 0 6.7-5.7 10.8-11.2 15.6z"></path>
    </svg>
  );
};
const UserIcon = props => {
  return (
    <svg aria-label="Profile" className={props.className} fill="#262626" viewBox="0 0 48 48">
      <g>
        <path d="M24 27c-7.1 0-12.9-5.8-12.9-12.9s5.8-13 12.9-13c7.1 0 12.9 5.8 12.9 12.9S31.1 27 24 27zm0-22.9c-5.5 0-9.9 4.5-9.9 9.9s4.4 10 9.9 10 9.9-4.5 9.9-9.9-4.4-10-9.9-10zM44 46.9c-.8 0-1.5-.7-1.5-1.5V42c0-5-4-9-9-9h-19c-5 0-9 4-9 9v3.4c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5V42c0-6.6 5.4-12 12-12h19c6.6 0 12 5.4 12 12v3.4c0 .8-.7 1.5-1.5 1.5z"></path>
      </g>
    </svg>
  );
};
const Nav = props => {
  return (
    <>
      {/* Bottom Navbar in Desktop Mode */}
      <nav className="d-none d-lg-flex fixed-bottom top_nav navbar navbar-expand navbar-white desktop_bottom">
        <div className="col-2 d-flex justify-content-start">
          <a target="_blank" rel="noopener noreferrer" className="e_namad" href="https://trustseal.enamad.ir/?id=140574&amp;Code=dv9rwi5TnCtPdn7kFsn1">
            <img alt="ای نماد" style={{ cursor: "poinoter" }} src="https://Trustseal.eNamad.ir/logo.aspx?id=140574&amp;Code=dv9rwi5TnCtPdn7kFsn1" id="dv9rwi5TnCtPdn7kFsn1" />
          </a>
        </div>
        <div className="col-10 d-flex justify-content-end">
          {/* <Link href="/help" passHref>
            <a className="nav-link">راهنمای ثبت سفارش</a>
          </Link> */}
          <Link href="/terms" passHref>
            <a className="nav-link">شرایط و قوانین</a>
          </Link>
          {/* <Link href="/complaint" passHref>
            <a className="nav-link">ثبت شکایات</a>
          </Link> */}
          <Link href="/contact" passHref>
            <a className="nav-link">تماس با ما</a>
          </Link>
          <Link href="/about-us" passHref>
            <a className="nav-link">درباره ما</a>
          </Link>
        </div>
      </nav>
    </>
  );
};
export default memo(Nav, areEqual);