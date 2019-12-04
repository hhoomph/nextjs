import React, { useState, useEffect, useRef, memo } from 'react';
import Link from '../Link';
import dynamic from 'next/dynamic';
import Loading from '../Loader/Loader';
import fetchData from '../../utils/fetchData';
import { FaArrowRight, FaSearch } from 'react-icons/fa';
import { numberSeparator, removeSeparator } from '../../utils/tools';
import '../../scss/components/searchComponent.scss';
import { async } from 'q';
const Product = dynamic({
  loader: () => import('./Product'),
  loading: () => <Loading />,
  ssr: true
});
const User = dynamic({
  loader: () => import('./User'),
  loading: () => <Loading />,
  ssr: true
});
const Header = props => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
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
        'User/U_Search/GetShopsInMap',
        {
          method: 'POST',
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
  const showResult = searchResult.map(res => {
    const img = res.avatar !== null ? `https://api.qaroon.ir/${res.avatar}` : '/static/img/no-product-image.png';
    if (res.userId !== null) {
      return <User key={res.userId + res.userName} id={res.userId} image={img} name={res.displayName} userName={res.userName} price={``} />;
    } else {
      return <Product key={res.id + res.displayName} id={res.id} image={img} name={res.displayName || ''} userName={res.userName} price={numberSeparator(res.lastPrice)} />;
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
            <FaArrowRight className="font_icon search_icon" onClick={() => props.setView(1)} />
          </div>
          <div className="col-12 p-0">
            <ul className="nav d-flex ltr align-items-center flex-row-reverse filters">{showFilters}</ul>
          </div>
        </div>
      </div>
      <div className="container mt-5 pt-5 rtl search_result">
        <div className="row pl-1 pr-1">
          {/* <Product id={1} image={'/static/img/product5.jpg'} name={'کشمش پلویی نام محصول'} userName={''} price={numberSeparator(150000)} />
          <User id={2} image={'/static/img/user.png'} name={'نام نمایشی'} userName={'user_name_UserName'} price={``} />
          <Product id={1} image={'/static/img/product5.jpg'} name={'کشمش پلویی نام محصول'} userName={''} price={numberSeparator(150000)} />
          <User id={2} image={'/static/img/user.png'} name={'نام نمایشی'} userName={'user_name_UserName'} price={``} />
          <Product id={1} image={'/static/img/product5.jpg'} name={'کشمش پلویی نام محصول'} userName={''} price={numberSeparator(150000)} />
          <User id={2} image={'/static/img/user.png'} name={'نام نمایشی'} userName={'user_name_UserName'} price={``} />
          <Product id={1} image={'/static/img/product5.jpg'} name={'کشمش پلویی نام محصول'} userName={''} price={numberSeparator(150000)} />
          <User id={2} image={'/static/img/user.png'} name={'نام نمایشی'} userName={'user_name_UserName'} price={``} /> */}
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
export default memo(Header);