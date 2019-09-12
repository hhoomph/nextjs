import React, { Fragment, useContext, useState, useEffect, memo } from 'react';
import User from './User';
import Link from '../Link';
import WindowsWidth from '../WindowsWidth';
import { IoIosMore } from 'react-icons/io';
import AppContext from '../../context/index';
import '../../scss/components/userSuggest.scss';
const UserSuggest = () => {
  const width = WindowsWidth();
  const userClass = width > 992 ? 'col-1' : 'col-3';
  const res = useContext(AppContext);
  const renderUsers = () => {
    // If Windows.Width < 992 (large) just show 5 coulmn users else show 11 users
    // if (width < 992) {
    //   return (
    //     <>
    //       <User id="1" image="user.png" />
    //       <User id="2" image="profile.png" />
    //       <User id="3" image="user.png" />
    //       <User id="4" image="profile.png" />
    //       <User id="5" image="user.png" />
    //     </>
    //   );
    // } else {
    //   return (
    //     <>
    //       <User id="1" image="user.png" />
    //       <User id="2" image="profile.png" />
    //       <User id="3" image="user.png" />
    //       <User id="4" image="profile.png" />
    //       <User id="5" image="user.png" />
    //       <User id="6" image="profile.png" />
    //       <User id="7" image="user.png" />
    //       <User id="8" image="profile.png" />
    //       <User id="9" image="user.png" />
    //       <User id="10" image="profile.png" />
    //       <User id="11" image="user.png" />
    //     </>
    //   );
    // }
    return (
      <>
        <User id="1" image="user.png" />
        <User id="2" image="profile.png" />
        <User id="3" image="user.png" />
        <User id="4" image="profile.png" />
        <User id="5" image="user.png" />
        <User id="6" image="profile.png" />
        <User id="7" image="user.png" />
        <User id="8" image="profile.png" />
        <User id="9" image="user.png" />
        <User id="10" image="profile.png" />
        <User id="11" image="user.png" />
        <div className={userClass + ` d-flex flex-column justify-content-end`}>
          <Link href="/user" passHref>
            <a className="more ml-2">
              <IoIosMore />
            </a>
          </Link>
        </div>
      </>
    );
    // return res.result.result.map(v => <User id={v.Id} key={v.Id} image="user.png" title={v.Title} />);
  };
  return (
    <div className="container user_Suggestion">
      <div className="row">
        <div className="col p-0">
          <div className="d-flex justify-content-start rtl pt-3 pb-3 over_flow">{renderUsers()}</div>
        </div>
      </div>
    </div>
  );
};
export default memo(UserSuggest);