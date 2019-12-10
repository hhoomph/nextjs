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
const User = dynamic({
  loader: () => import("../components/Activity/User"),
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
  //   const img = res.avatar !== null ? `https://api.qarun.ir/${res.avatar}` : '/static/img/no-product-image.png';
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
      <div className="container pb-5 rtl search_result activity_page">
        <div className="row pl-1 pr-1 pb-5 mb-5">
          <User id={1} type={'invite'} image={"/static/img/user.jpg"} followed={false} productImage={"/static/img/product5.jpg"} productId={'1'} message={'متن پیام متن پیام'} name={"نام نمایشی"} userName={"user_name_UserName"} time={`2 هفته`} />
          <User id={2} type={'productLike'} image={"/static/img/user.png"} followed={true} productImage={"/static/img/product4.jpg"} message={'شما را دنبال میکند'} name={"نام نمایشی"} userName={"user_name_UserName"} time={`1 روز پیش`} />
          <User id={3} type={'follow'} image={"/static/img/user.png"} followed={true} productImage={"/static/img/product6.jpg"} message={'متن پیام متن پیام'} name={"نام نمایشی"} userName={"user_name_UserName"} time={`50 دقیقه`} />
          <User id={4} type={'productLike'} image={"/static/img/profile.png"} followed={true} productImage={"/static/img/product5.jpg"} message={'پست شما را پسندید'} name={"نام نمایشی"} userName={"user_name_UserName"} time={`5 دقیقه پیش`} />
          <User id={5} type={'productLike'} image={"/static/img/user.jpg"} followed={false} productImage={"/static/img/product4.jpg"} message={'متن پیام متن پیام'} name={"نام نمایشی"} userName={"user_name_UserName"} time={`1 ماه`} />
          <User id={6} type={'productLike'} image={"/static/img/user.png"} followed={true} productImage={"/static/img/product6.jpg"} message={'شمار را دنبال میکند'} name={"نام نمایشی"} userName={"user_name_UserName"} time={`یک هفته`} />
          <User id={7} type={'comment'} image={"/static/img/user.png"} followed={false} productImage={"/static/img/product5.jpg"} message={'متن پیام متن پیام'} name={"نام نمایشی"} userName={"user_name_UserName"} time={`1 روز پیش`} />
          <User id={8} type={'commentLike'} image={"/static/img/profile.png"} followed={true} productImage={"/static/img/product6.jpg"} message={'پاسخ نطرتان "گرونه" را داد: "قیمت خریدمه"'} name={"نام نمایشی"} userName={"user_name_UserName"} time={`یک هفته پیش`} />
        </div>
      </div>
    </>
  );
};
export default Auth(Page);