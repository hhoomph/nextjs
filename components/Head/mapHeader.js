import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../Link";
// import { ReactComponent as MicroSvg } from '../../public/static/svg/microphone.svg';
// import { ReactComponent as MenuSvg } from '../../public/static/svg/menu-line.svg';
import { FaSearch } from "react-icons/fa";
const Header = props => {
  const searchInput = useRef();
  return (
    <div className="container map_header">
      <div className="row">
        <div className="col-12 d-flex flex-row-reverse align-items-center">
          {/* <MenuSvg className="svg_icon menu" /> */}
          <input ref={searchInput} onFocus={() => props.setView(2)} type="text" className="form-control searchInput" placeholder="دنبال چه هستید؟" />
          <FaSearch className="font_icon search_icon" onClick={() => props.setView(2)} />
          {/* <MicroSvg className="svg_icon microphone" /> */}
        </div>
      </div>
    </div>
  );
};
export default memo(Header);
