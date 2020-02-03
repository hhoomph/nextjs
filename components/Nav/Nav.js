import React, { useState, useEffect, memo, useReducer, useContext } from "react";
import Link from "../Link";
import Router from "next/router";
import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";
import Search from "./Search";
import { FiGrid } from "react-icons/fi";
import { FaShoppingBasket, FaRegUserCircle } from "react-icons/fa";
import { ReactComponent as HomeSvg } from "../../public/static/svg/home.svg";
import { ReactComponent as MenuSvg } from "../../public/static/svg/menu.svg";
import { ReactComponent as HeartGray } from "../../public/static/svg/insta/heart-gray.svg";
import { ReactComponent as UserSvg } from "../../public/static/svg/profile.svg";
import { ReactComponent as AddSvg } from "../../public/static/svg/add.svg";
import { ReactComponent as SearchSvg } from "../../public/static/svg/search2.svg";
import { OrderCountContext } from "../../context/context";
import { orderCountReduser } from "../../context/reducer";
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
  // const [orderCount, setOrderCount] = useState(0);
  const [orderCount, orderCountDispatch] = useReducer(orderCountReduser, 0);
  const [eventCount, setEventCount] = useState(0);
  useEffect(() => {
    if (props._tkn !== undefined) {
      const baseHub = new HubConnectionBuilder()
        .withUrl("https://api.qarun.ir/baseHub", {
          accessTokenFactory: () => {
            return props._tkn;
          }
        })
        .configureLogging(LogLevel.Error)
        .build();
      baseHub
        .start({ withCredentials: false })
        .then(function() {
          console.log("baseHub connected");
          // baseHub.invoke("GetEventsCount", res => {
          // });
          baseHub.on("EventsCount", res => {
            console.log(res);
            setEventCount(res);
          });
          // baseHub.invoke("GetOrderCount", res => {
          // });
          baseHub.on("OrderCount", res => {
            console.log(res);
            // setOrderCount(res);
            orderCountDispatch({ type: "refresh", payload: res });
          });
        })
        .catch(err => console.error(err.toString()));
      // chat hub
      const chatHub = new HubConnectionBuilder()
        .withUrl("https://api.qarun.ir/chatHub", {
          accessTokenFactory: () => {
            return props._tkn;
          }
        })
        .configureLogging(LogLevel.Error)
        .build();
      chatHub
        .start({ withCredentials: false })
        .then(function() {
          console.log("chatHub connected");
          chatHub.on("ReciveMessage", res => {
            console.log(res);
          });
          chatHub
            .invoke("SendMessage", "chat name", "OtherUserId", "Content", "ContentType")
            .then(function(res) {
              //console.log(res);
            })
            .catch(err => console.error(err.toString()));
          // chatHub.invoke("GetOrderCount", res => {
          // });
        })
        .catch(err => console.error(err.toString()));
    }
  }, []);
  return (
    <>
      {/* Top Navbar in Desktop Mode */}
      <nav className="d-none d-lg-flex top_nav navbar navbar-expand navbar-white bg-white">
        <div className="col-4 d-flex">
          <Link href="/cart" passHref>
            <a className="nav_Icons active">
              <FaShoppingBasket />
              {props.cartCount > 0 && <div className="badge badge-success">{props.cartCount}</div>}
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
      {/* Bottom Navbar in Mobile Mode */}
      <nav className="d-flex d-lg-none bottom_nav navbar fixed-bottom navbar-white bg-white">
        <div className="col-12 d-flex justify-content-center p-1">
          <Link href="/profile" passHref>
            {orderCount > 0 ? (
              <a className="nav_Icons notify">
                <UserIcon className="svg_Icons" />
                <Link href="/order" passHref>
                  <div className="badge badge-success">
                    <FaShoppingBasket className="font_icon" />
                    {orderCount}
                    <span className="arrow-down"></span>
                  </div>
                </Link>
              </a>
            ) : (
              <a className="nav_Icons">
                <UserIcon className="svg_Icons" />
              </a>
            )}
          </Link>
          <Link href="/activity" passHref>
            {eventCount > 0 ? (
              <a className="nav_Icons notify">
                <HeartIcon className="svg_Icons" />
                <div className="badge badge-success">
                  <HeartIcon className="font_icon" />
                  {eventCount}
                  <span className="arrow-down"></span>
                </div>
              </a>
            ) : (
              <a className="nav_Icons">
                {/* <MenuSvg className="svg_Icons" /> */}
                <HeartIcon className="svg_Icons" />
              </a>
            )}
            {/* If Have Notify*/}
            {/* <a className="nav_Icons notify">
              <MenuSvg className="svg_Icons" />
              <HeartIcon className="svg_Icons" />
              <div className="badge badge-success">
                <HeartIcon className="font_icon" />2<span className="arrow-down"></span>
              </div>
            </a> */}
          </Link>
          <Link href="/add-product" passHref>
            <a className="nav_Icons">
              <AddSvg className="svg_Icons" />
            </a>
          </Link>
          <Link href="/search" passHref>
            <a className="nav_Icons">
              <SearchSvg className="svg_Icons" />
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