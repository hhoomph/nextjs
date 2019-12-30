import React, { Fragment, useState, useEffect, memo } from "react";
import Link from "../Link";
import { IoIosMore } from "react-icons/io";
import "../../scss/components/categoriesRow.scss";
const Category = props => {
  const showCats = props.categories.map(cat => (
    <li key={cat.id} className="nav-item user_cats">
      <a
        className={props.catActive == cat.id ? "nav-link active" : "nav-link"}
        id={cat.id}
        onClick={() => {
          props.setPage(1);
          props.setCatActive(cat.id);
        }}
      >
        {cat.titel}
      </a>
    </li>
  ));
  return (
    <ul className="nav">
      {showCats}
      {/* <li className="nav-item">
        <Link href="/categories" passHref>
          <a className="more nav-link">
            <IoIosMore />
          </a>
        </Link>
      </li> */}
    </ul>
  );
};
export default memo(Category);