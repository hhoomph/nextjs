import React, { useState, useEffect, useRef, memo } from "react";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";
import Logout from "../Auth/Logout";
import Link from "../Link";
import {} from "react-icons/fa";
import { TiHeartOutline } from "react-icons/ti";
import { AiOutlineFilter, AiOutlineSetting, AiOutlineExclamationCircle } from "react-icons/ai";
import { MdLockOutline, MdHeadsetMic, MdExitToApp } from "react-icons/md";
import { GiThorHammer } from "react-icons/gi";
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
            <a className="nav-link">
              <TiHeartOutline className="font_icon" />
              علاقه مندی ها
            </a>
          </Link>
        </div>
        <div className="nav-item" onClick={() => props.setLimitModalShow(true)}>
          <a className="nav-link">
            <AiOutlineFilter className="font_icon" />
            محدودیت فروش
          </a>
        </div>
        <div className="nav-item">
          <Link href="/terms" passHref>
            <a className="nav-link">
              <GiThorHammer className="font_icon" />
              شرایط و قوانین
            </a>
          </Link>
        </div>
        <div className="nav-item">
          <Link href="/privacy" passHref>
            <a className="nav-link">
              <MdLockOutline className="font_icon" />
              حریم خصوصی
            </a>
          </Link>
        </div>
        <div className="nav-item">
          <Link href="/support" passHref>
            <a className="nav-link">
              <MdHeadsetMic className="font_icon" />
              پشتیبانی
            </a>
          </Link>
        </div>
        <div className="nav-item">
          <Link href="/about-us" passHref>
            <a className="nav-link">
              <AiOutlineExclamationCircle className="font_icon" />
              درباره ما
            </a>
          </Link>
        </div>
        <div
          className="nav-item"
          onClick={() => {
            Logout();
          }}
        >
          <a className="nav-link">
            <MdExitToApp className="font_icon" />
            خروج
          </a>
        </div>
      </div>
      <div className="sidebar-footer p-2">
        <div
          className="nav-item"
          onClick={() => {
            props.setView(2);
          }}
        >
          <a className="nav-link">
            <AiOutlineSetting className="font_icon" />
            ویرایش نمایه
          </a>
        </div>
      </div>
    </div>
  );
};
export default memo(SideBar);