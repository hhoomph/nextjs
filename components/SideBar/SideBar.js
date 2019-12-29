import React, { useState, useEffect, useRef, memo } from "react";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";
import Logout from "../Auth/Logout";
import Link from "../Link";
import "../../scss/components/sideBar.scss";
const SideBar = props => {
  const node = useRef();
  const handleClickOutside = e => {
    setTimeout(() => {
      if (node.current !== undefined && node.current !== null) {
        if (node.current.contains(e.target)) {
          return;
        }
        // outside click
        props.setIsOpen(false);
      }
    }, 200);
  };
  useEffect(() => {
    if (props.isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props.isOpen]);
  return (
    <div className={classNames("sidebar rtl", { "is-open": props.isOpen })} ref={node}>
      <div className="sidebar-header p-2">
        <h5>{props.userName}</h5>
      </div>
      <div className="flex-column pt-2">
        <div className="nav-item">
          <Link href="/favorite" passHref>
            <a className="nav-link">علاقه مندی ها</a>
          </Link>
        </div>
        <div className="nav-item">
          <Link href="/limit" passHref>
            <a className="nav-link">محدودیت فروش</a>
          </Link>
        </div>
        <div className="nav-item">
          <Link href="/terms" passHref>
            <a className="nav-link">شرایط و قوانین</a>
          </Link>
        </div>
        <div className="nav-item">
          <Link href="/privacy" passHref>
            <a className="nav-link">حریم خصوصی</a>
          </Link>
        </div>
        <div className="nav-item">
          <Link href="/support" passHref>
            <a className="nav-link">پشتیبانی</a>
          </Link>
        </div>
        <div className="nav-item">
          <Link href="/about-us" passHref>
            <a className="nav-link">درباره ما</a>
          </Link>
        </div>
        <div
          className="nav-item"
          onClick={() => {
            Logout();
          }}
        >
          <a className="nav-link">خروج</a>
        </div>
      </div>
      <div className="sidebar-footer p-2">
        <div
          className="nav-item"
          onClick={() => {
            props.setView(2);
          }}
        >
          <a className="nav-link">ویرایش نمایه</a>
        </div>
      </div>
    </div>
  );
};
export default memo(SideBar);