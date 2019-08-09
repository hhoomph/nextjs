import React, { Fragment, useState, useEffect, memo } from 'react';
import Link from '../Link';
const Category = props => {
  return (
    <li className={props.active ? 'nav-item active' : 'nav-item'}>
      <i className="bullet"></i>
      <Link href={`/categories/${props.id}`} passHref>
        <a className={props.active ? 'nav-link active' : 'nav-link'}>{props.name}</a>
      </Link>
    </li>
  );
};
export default memo(Category);