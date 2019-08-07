import React, { Fragment, useState, useEffect, memo } from 'react';
import Link from '../Link';
const Sort = (props) => {
  return (
    <ul className="nav">
      <li className="nav-item">
        <Link href="?sort=new" passHref>
          <a className="nav-link active">تازه</a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="?sort=popular" passHref>
          <a className="nav-link">محبوب</a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="?sort=selling" passHref>
          <a className="nav-link">پرفروش</a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="?sort=offer" passHref>
          <a className="nav-link">تخفیف دار</a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="?sort=active" passHref>
          <a className="nav-link"> فعال</a>
        </Link>
      </li>
    </ul>
  );
};
export default memo(Sort);