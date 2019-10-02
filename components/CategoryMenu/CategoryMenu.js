import React, { Fragment, useState, useEffect, memo } from 'react';
import { useRouter } from 'next/router';
import Link from '../Link';
import '../../scss/components/CategoryMenu.scss';
import Category from './Category';
import { ReactComponent as LeftSvg } from '../../static/svg/left-arrow.svg';
const CategoryMenu = props => {
  const categories = props.categories;
  const router = useRouter();
  const showCats = categories.map(category => <Category key={category.id} id={category.id} name={category.titel} />);
  return (
    <div className="container-fluid overflow-hidden rtl pt-3 category_menu">
      <div className="row mb-3 header_link">
        <div className="col-6 text-left">
          <Link href="/" passHref>
            <a className="qarun_title">قارون</a>
          </Link>
        </div>
        <div className="col-6 text-right">
          <a onClick={() => router.back()} style={{ cursor: 'pointer' }}>
            <LeftSvg className="svg_icon" />
          </a>
        </div>
      </div>
      <div className="row pl-2">
        <div className="col">
          <ul className="nav">{showCats}</ul>
        </div>
      </div>
    </div>
  );
};
export default CategoryMenu;