import React, { useState, useEffect, useRef, memo } from 'react';
import Link from '../Link';
import { FaSearch } from 'react-icons/fa';
const Header = props => {
  const searchInput = useRef();
  return (
    <div className="container map_header">
      <div className="row">
        <div className="col-12 d-flex rtl align-items-center">
          <input
            ref={searchInput}
            onChange={() => {
              props.handleSearchChange(searchInput);
            }}
            value={props.searchValue}
            type="text"
            className="form-control searchInput"
            placeholder="جستجو"
          />
          <FaSearch className="font_icon search_icon" />
        </div>
      </div>
    </div>
  );
};
export default memo(Header);