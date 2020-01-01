import React, { useState, useEffect, useRef, memo } from "react";
import { FaSearch } from "react-icons/fa";
const Search = () => {
  const [search, setSearch] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  let searchInput = useRef();
  const searchInlineClass = searchFocus ? "search_inline search_inline_focus" : "search_inline search_inline_blur";
  const inputFocus = () => {
    setSearchFocus(true);
  };
  const inputBlur = () => {
    if (searchInput.current.value.length <= 0) {
      setSearchFocus(false);
    }
  };
  return (
    <form className="inline">
      <div className="top_search text-center">
        <input
          type="text"
          placeholder="جستجو"
          className="form-control mr-sm-2 text-right search_input"
          onFocus={() => {
            inputFocus();
          }}
          onBlur={() => {
            inputBlur();
          }}
          ref={searchInput}
        />
        <div className={searchInlineClass}>
          <FaSearch />
        </div>
      </div>
    </form>
  );
};
export default memo(Search);