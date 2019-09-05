import React, { Fragment, useState, useEffect, memo } from 'react';
import User from './User';
import Link from '../Link';
import WindowsWidth from '../WindowsWidth';
import { IoIosMore } from 'react-icons/io';
import '../../scss/components/userSuggest.scss';
const UserSuggest = () => {
  const width = WindowsWidth();
  const renderUsers = () => {
    // If Windows.Width < 992 (large) just show 5 coulmn users else show 11 users
    if (width < 992) {
      return (
        <>
          <User id="1" image="user.png" />
          <User id="2" image="profile.png" />
          <User id="3" image="user.png" />
          <User id="4" image="profile.png" />
          <User id="5" image="user.png" />
        </>
      );
    } else {
      return (
        <>
          <User id="1" image="user.png" />
          <User id="2" image="profile.png" />
          <User id="3" image="user.png" />
          <User id="4" image="profile.png" />
          <User id="5" image="user.png" />
          {}
          <User id="6" image="profile.png" />
          <User id="7" image="user.png" />
          <User id="8" image="profile.png" />
          <User id="9" image="user.png" />
          <User id="10" image="profile.png" />
          <User id="11" image="user.png" />
        </>
      );
    }
  };
  return (
    <div className="container user_Suggestion">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-start rtl pt-3">
            {renderUsers()}
          </div>
          <Link href="/user" passHref>
            <a className="more ml-2">
              <IoIosMore />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default memo(UserSuggest);