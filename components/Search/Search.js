import React, { useState, useEffect, useRef, memo } from 'react';
import Link from '../Link';
import { FaArrowRight, FaTimes } from 'react-icons/fa';
import '../../scss/components/searchComponent.scss';
const Header = props => {
  const searchInput = useRef();
  const [filters, setFilters] = useState([
    { id: 0, name: 'همه', filter: 'All', active: true },
    { id: 1, name: 'محصول', filter: 'ProductName', active: false },
    { id: 2, name: 'افراد', filter: 'UserName', active: false },
    { id: 3, name: 'مکان', filter: 'CityOrProvince', active: false },
    { id: 4, name: 'برچسب', filter: 'HashTag', active: false }
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
    let classN = filter.active ? 'nav-item active' : 'nav-item';
    return (
      <li key={filter.id} className={classN}>
        <a
          className="nav-link"
          onClick={() => {
            // handleSort(filter.filter);
            toggleActiveFilter(filter.id);
          }}
        >
          {filter.name}
        </a>
      </li>
    );
  });
  return (
    <>
      <div className="container pb-0 map_header search_component">
        <div className="row">
          <div className="col-12 d-flex rtl align-items-center flex-row-reverse">
            <input type="text" className="form-control searchInput" placeholder="جستجو" />
            <FaArrowRight className="font_icon search_icon" onClick={() => props.setView(1)} />
          </div>
          <div className="col-12 p-0">
            <ul className="nav d-flex ltr align-items-center flex-row-reverse filters">{showFilters}</ul>
          </div>
        </div>
      </div>
      <div className="container mt-5 pt-5 rtl search_result">
        <div className="row pl-2 pr-2">
          <div className="col-12 mt-2 p-0 product">
            <a className="link">
              <img src="/static/img/product5.jpg" />
            </a>
            <div className="_txt">
              <FaTimes className="close" />
              <a className="name">کشمش پلویی نام</a>
              <div className="price">
                <span>150000</span>
                <span>تومان</span>
              </div>
            </div>
          </div>
          <div className="col-12 mt-2 p-0 user">
            <a className="link">
              <img src="/static/img/user.png" />
            </a>
            <div className="_txt">
              <FaTimes className="close" />
              <a className="name">user name</a>
              <div className="displayName">نام نمایشی</div>
            </div>
          </div>
          <div className="col-12 mt-2 p-0 user">
            <a className="link">
              <img src="/static/img/user.png" />
            </a>
            <div className="_txt">
              <FaTimes className="close" />
              <a className="name">user name</a>
              <div className="displayName">نام نمایشی</div>
            </div>
          </div>
          <div className="col-12 mt-2 p-0 product">
            <a className="link">
              <img src="/static/img/product5.jpg" />
            </a>
            <div className="_txt">
              <FaTimes className="close" />
              <a className="name">کشمش پلویی نام</a>
              <div className="price">
                <span>150000</span>
                <span>تومان</span>
              </div>
            </div>
          </div>
          <div className="col-12 mt-2 p-0 user">
            <a className="link">
              <img src="/static/img/user.png" />
            </a>
            <div className="_txt">
              <FaTimes className="close" />
              <a className="name">user name</a>
              <div className="displayName">نام نمایشی</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(Header);