import React, { Fragment, useContext, useState, useEffect, memo } from 'react';
import User from './User';
import Link from '../Link';
import WindowsWidth from '../WindowsWidth';
import { IoIosMore } from 'react-icons/io';
import AppContext from '../../context/context';
import '../../scss/components/userSuggest2.scss';
const UserSuggest = props => {
  const width = WindowsWidth();
  const userClass = width > 992 ? 'p-1 text-center col-2 user_div' : 'p-1 text-center col-4 user_div';
  return (
    <div className={userClass + (props.active ? ' active' : '')}>
      <div className="user_link_img">
        <Link href={`/user/${props.id}`} passHref>
          <a className="user_link">
            <img src={`/static/img/${props.image}`} alt="" className="rounded-circle img-thumbnail" />
          </a>
        </Link>
      </div>
      <p className="user_name m-2">userName</p>
      <p className="display_name m-2">سیما کاظمی</p>
      <a className="btn btn-main mb-2 follow">دنبال کردن</a>
    </div>
  );
};
export default memo(UserSuggest);