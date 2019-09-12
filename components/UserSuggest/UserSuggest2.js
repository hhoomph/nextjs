import React, { Fragment, useContext, useState, useEffect, memo } from 'react';
import User from './User';
import Link from '../Link';
import WindowsWidth from '../WindowsWidth';
import { IoIosMore } from 'react-icons/io';
import AppContext from '../../context/index';
import '../../scss/components/userSuggest2.scss';
const UserSuggest = props => {
  const width = WindowsWidth();
  const userClass = width > 992 ? 'p-2 text-center col-2' : 'p-2 text-center col-4';
  return (
    <div className={userClass}>
      <Link href={`/user/${props.id}`} passHref>
        <a className="user_link">
          <img src={`../../static/img/${props.image}`} alt="" className="rounded-circle img-thumbnail" />
        </a>
      </Link>
      <p className="user_name m-2">سیما کاظمی</p>
      <a className="btn btn-main mb-2 follow">دنبال کردن</a>
    </div>
  );
};
export default memo(UserSuggest);