import React, { Fragment, useContext, useState, useEffect, memo } from 'react';
import User from './User';
import Link from '../Link';
import WindowsWidth from '../WindowsWidth';
import { IoIosMore } from 'react-icons/io';
import AppContext from '../../context/index';
import '../../scss/components/userSuggest.scss';
import { FiUsers } from 'react-icons/fi';
const UserSuggest = props => {
  const users = props.users;
  const width = WindowsWidth();
  const userClass = width > 992 ? 'col-1' : 'col-3';
  const res = useContext(AppContext);
  const renderUsers = users.map(user => <User key={user.id} id={user.id} userName={user.userName} alt={user.displayName} image={`https://api.qarun.ir/${user.userAvatar}`} />);
  return (
    <div className="container user_Suggestion">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-start rtl over_flow">{renderUsers}</div>
        </div>
      </div>
    </div>
  );
};
export default memo(UserSuggest);