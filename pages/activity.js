import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../components/Link";
import dynamic from "next/dynamic";
import Loading from "../components/Loader/Loader";
import Auth from "../components/Auth/Auth";
import fetchData from "../utils/fetchData";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { numberSeparator, removeSeparator } from "../utils/tools";
import "../scss/components/searchComponent.scss";
const Nav = dynamic({
  loader: () => import("../components/Nav/Nav"),
  loading: () => <Loading />,
  ssr: true
});
const Product = dynamic({
  loader: () => import("../components/Search/Product"),
  loading: () => <Loading />,
  ssr: true
});
const User = dynamic({
  loader: () => import("../components/Search/User"),
  loading: () => <Loading />,
  ssr: true
});
const Page = props => {
  // const [search, setSearch] = useState('');
  // const [searchResult, setSearchResult] = useState([]);
  // const searchInput = useRef();
  // const [filters, setFilters] = useState([
  //   { id: 0, name: 'همه', filter: 'All', active: true },
  //   { id: 1, name: 'محصول', filter: 'ProductName', active: false },
  //   { id: 2, name: 'افراد', filter: 'UserName', active: false },
  //   { id: 3, name: 'مکان', filter: 'CityOrProvince', active: false },
  //   { id: 4, name: 'برچسب', filter: 'HashTag', active: false }
  // ]);
  // const toggleActiveFilter = index => {
  //   filters[index];
  //   const filterObject = filters.filter(s => filters.indexOf(s) == index)[0];
  //   filterObject.active = true;
  //   const otherFilterObject = filters
  //     .filter(s => filters.indexOf(s) !== index)
  //     .map(s => {
  //       s.active = false;
  //       return s;
  //     });
  //   const all = otherFilterObject.concat(filterObject).sort((a, b) => a.id - b.id);
  //   setFilters(all);
  // };
  // const showFilters = filters.map(filter => {
  //   let classN = filter.active ? 'nav-item active' : 'nav-item';
  //   return (
  //     <li key={filter.id} className={classN}>
  //       <a
  //         className="nav-link"
  //         onClick={() => {
  //           toggleActiveFilter(filter.id);
  //         }}
  //       >
  //         {filter.name}
  //       </a>
  //     </li>
  //   );
  // });
  // const handleSearch = async (s = search) => {
  //   if (s.length > 0) {
  //     const filterType = filters.filter(s => s.active === true)[0].filter;
  //     const result = await fetchData(
  //       'User/U_Search/GetShopsInMap',
  //       {
  //         method: 'POST',
  //         body: JSON.stringify({
  //           searchType: filterType,
  //           page: 1,
  //           pageSize: 15,
  //           search: s
  //         })
  //       },
  //       props.ctx
  //     );
  //     if (result !== undefined && result.isSuccess) {
  //       setSearchResult(result.data);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   handleSearch();
  // }, [search, filters]);
  // const showResult = searchResult.map(res => {
  //   const img = res.avatar !== null ? `https://api.qaroon.ir/${res.avatar}` : '/static/img/no-product-image.png';
  //   if (res.userId !== null) {
  //     return <User key={res.userId + res.userName} id={res.userId} image={img} name={res.displayName} userName={res.userName} price={``} />;
  //   } else {
  //     return <Product key={res.id + res.displayName} id={res.id} image={img} name={res.displayName || ''} userName={res.userName} price={numberSeparator(res.lastPrice)} />;
  //   }
  // });
  return (
    <>
      <Nav/>
      <div className="container pb-0 search_component">
        <div className="row p-2 cart_title">
          <div className="col text-center">
            <h5 className="mr-2 ml-2 mt-1 page_title">فعالیت ها</h5>
          </div>
        </div>
      </div>
      <div className="container rtl search_result activity_page">
        <div className="row pl-1 pr-1">
          <Product id={1} image={"/static/img/product5.jpg"} name={"کشمش پلویی نام محصول"} userName={""} price={numberSeparator(150000)} />
          <User id={2} image={"/static/img/user.jpg"} name={"نام نمایشی"} userName={"user_name_UserName"} price={``} />
          <Product id={1} image={"/static/img/product5.jpg"} name={"کشمش پلویی نام محصول"} userName={""} price={numberSeparator(150000)} />
          <User id={2} image={"/static/img/user.png"} name={"نام نمایشی"} userName={"user_name_UserName"} price={``} />
          <Product id={1} image={"/static/img/product5.jpg"} name={"کشمش پلویی نام محصول"} userName={""} price={numberSeparator(150000)} />
          <User id={2} image={"/static/img/user.png"} name={"نام نمایشی"} userName={"user_name_UserName"} price={``} />
          <Product id={1} image={"/static/img/product5.jpg"} name={"کشمش پلویی نام محصول"} userName={""} price={numberSeparator(150000)} />
          <User id={2} image={"/static/img/profile.png"} name={"نام نمایشی"} userName={"user_name_UserName"} price={``} />
        </div>
      </div>
    </>
  );
};
export default Auth(Page);