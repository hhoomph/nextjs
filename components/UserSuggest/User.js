import React, { useState, useEffect, memo } from 'react';
import Link from 'next/link';
import WindowsWidth from '../WindowsWidth';
const User = props => {
  const width = WindowsWidth();
  const userClass = width > 992 ? 'col-1' : width > 400 ? 'col-2' : 'col-3';
  return (
    <div className={'userClass'}>
      <Link href={`/user/${props.id}`} passHref>
        <a className="mr-2 user_link">
          <img src={`../../static/img/${props.image}`} alt="" className="rounded-circle img-thumbnail" />
        </a>
      </Link>
    </div>
  );
};
export default memo(User);