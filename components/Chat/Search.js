import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../Link";
import dynamic from "next/dynamic";
import Loading from "../Loader/Loader";
import fetchData from "../../utils/fetchData";
import { FaArrowRight, FaArrowLeft, FaSearch, FaTimes } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { numberSeparator, removeSeparator } from "../../utils/tools";
import "../../scss/components/searchComponent.scss";
import { async } from "q";
// const User = dynamic({
//   loader: () => import("./User"),
//   loading: () => <Loading />,
//   ssr: true
// });
const User = props => {
  const [hide, setHide] = useState(false);
  return (
    <div className="col-12 mt-2 p-0 user" hidden={hide}>
      <Link href={`/user/${props.userName}`} passHref>
        <a className="link">
          <img src={props.image} />
        </a>
      </Link>
      <div className="_txt">
        <FaTimes className="close" onClick={() => setHide(true)} />
        <Link href={`/user/${props.userName}`} passHref>
          <a className="name">{props.userName}</a>
        </Link>
        <div className="displayName">{props.name}</div>
      </div>
    </div>
  );
};
const Search = props => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const searchInput = useRef();
  const [filters, setFilters] = useState([
    { id: 0, name: "همه", filter: "All", active: true },
    { id: 1, name: "محصول", filter: "ProductName", active: false },
    { id: 2, name: "افراد", filter: "UserName", active: false },
    { id: 3, name: "مکان", filter: "CityOrProvince", active: false },
    { id: 4, name: "برچسب", filter: "HashTag", active: false }
  ]);
  const toggleActiveFilter = index => {
    filters[index];
    const filterObject = filters.filter(s => filters.indexOf(s) == index)[0];
    filterObject.active = true;
    const otherFilterObject = filters
      .filter(s => filters.indexOf(s) !== index)
      .map(s => {
        s.active = false;
        return s;
      });
    const all = otherFilterObject.concat(filterObject).sort((a, b) => a.id - b.id);
    setFilters(all);
  };
  const showFilters = filters.map(filter => {
    let classN = filter.active ? "nav-item active" : "nav-item";
    return (
      <li key={filter.id} className={classN}>
        <a
          className="nav-link"
          onClick={() => {
            toggleActiveFilter(filter.id);
          }}
        >
          {filter.name}
        </a>
      </li>
    );
  });
  const handleSearch = async (s = search) => {
    if (s.length > 0) {
      const filterType = filters.filter(s => s.active === true)[0].filter;
      const result = await fetchData(
        "User/U_Search/GetShopsInMap",
        {
          method: "POST",
          body: JSON.stringify({
            searchType: filterType,
            page: 1,
            pageSize: 15,
            search: s
          })
        },
        props.ctx
      );
      if (result !== undefined && result.isSuccess) {
        setSearchResult(result.data);
      }
    }
  };
  useEffect(() => {
    handleSearch();
  }, [search, filters]);
  useEffect(() => {
    searchInput.current.focus();
  }, []);
  const showResult = searchResult.map(res => {
    const img = res.avatar !== null ? `https://api.qarun.ir/${res.avatar}` : "/static/img/no-product-image.png";
    if (res.userId !== null) {
      return <User key={res.userId + res.userName} id={res.userId} image={img} name={res.displayName} userName={res.userName} price={""} />;
    } else {
      return "";
    }
  });
  return (
    <>
      <div className="container pb-0 map_header search_component">
        <div className="row">
          <div className="col-12 d-flex rtl align-items-center flex-row-reverse">
            <input
              type="text"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                handleSearch(e.target.value);
              }}
              className="form-control searchInput"
              ref={searchInput}
              placeholder="جستجو"
            />
            <FiChevronRight className="font_icon back_icon" onClick={() => props.setView(1)} />
          </div>
          <div className="col-12 p-0">
            <ul className="nav d-flex ltr align-items-center flex-row-reverse filters">{showFilters}</ul>
          </div>
        </div>
      </div>
      <div className="container mt-5 pt-5 rtl search_result">
        <div className="row pl-1 pr-1">
          {showResult.length > 0 ? (
            showResult
          ) : (
            <div className="no_result_div">
              <FaSearch className="font_icon" /> <p className="no_result"> دنبال چه چیزی هستید؟ </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default memo(Search);