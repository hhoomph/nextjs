import React, { Fragment, useState, useEffect, memo } from 'react';
import Link from '../Link';
import { IoIosMore } from 'react-icons/io';
import WindowsWidth from '../WindowsWidth';
import '../../scss/components/categoriesRow.scss';
const Category = (props) => {
  const width = WindowsWidth();
  const renderCatLi = () => {
    // If Windows.Width < 992 (large) just show 5 coulmn users else show 11 users
    // if (width < 992) {
    //   return (
    //     <>
    //       <li className="nav-item">
    //         <Link href="/category/" passHref>
    //           <a className="nav-link active">سوپر مارکت</a>
    //         </Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link href="/category/" passHref>
    //           <a className="nav-link">رستوران و فست فود</a>
    //         </Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link href="/category/" passHref>
    //           <a className="nav-link">نان و شیرینی</a>
    //         </Link>
    //       </li>
    //     </>
    //   );
    // } else {
      return (
        <>
          <li className="nav-item">
            <Link href="/category/" passHref>
              <a className="nav-link active">سوپر مارکت</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/category/" passHref>
              <a className="nav-link">رستوران و فست فود</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/category/" passHref>
              <a className="nav-link">نان و شیرینی</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/category/" passHref>
              <a className="nav-link">سوپر مارکت</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/category/" passHref>
              <a className="nav-link">رستوران و فست فود</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/category/" passHref>
              <a className="nav-link">نان و شیرینی</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/category/" passHref>
              <a className="nav-link">سوپر مارکت</a>
            </Link>
          </li>
        </>
      );
    // }
  };
  return (
    <ul className="nav">
      {renderCatLi()}
      <li className="nav-item">
        <Link href="/categories" passHref>
          <a className="more nav-link">
            <IoIosMore />
          </a>
        </Link>
      </li>
    </ul>
  );
};
export default memo(Category);