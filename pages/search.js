import React, { Fragment, useReducer, useState, useContext, useRef, useEffect, memo } from "react";
import dynamic from "next/dynamic";
import Loading from "../components/Loader/Loader";
import fetch from "isomorphic-unfetch";
import nextCookie from "next-cookies";
import cookie from "js-cookie";
import Nav from "../components/Nav/Nav";
import UserSuggest from "../components/UserSuggest/UserSuggest2";
import "../scss/components/mapPage.scss";
import { ToastContainer, toast } from "react-toastify";
import { FaGripLines } from "react-icons/fa";
import "react-toastify/scss/main.scss";
const MapComponent = dynamic({
  loader: () => import("../components/Map/Map"),
  loading: () => <Loading />,
  ssr: false
});
const MapHeader = dynamic({
  loader: () => import("../components/Head/mapHeader"),
  loading: () => <Loading />,
  ssr: true
});
const SearchPage = dynamic({
  loader: () => import("../components/Search/Search"),
  loading: () => <Loading />,
  ssr: true
});
const Page = props => {
  toast.configure({
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  const [view, setView] = useState(1);
  const scrollDiv = useRef();
  const scrollHandle = () => {};
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = e => {
    setSearchValue(e.current.value);
  };
  switch (view) {
    case 1:
      return (
        <>
          <Nav />
          <MapHeader setView={setView} searchValue={searchValue} handleSearchChange={handleSearchChange} />
          <div className="container mb-1 rtl p-0 mapContainer">
            <MapComponent id="map_id" searchValue={searchValue} />
          </div>
          <div className="container mb-1 rtl">
            <div className="row">
              <div className="col-12 d-flex justify-content-center pt-0 scroller_div">
                <FaGripLines className="font-icon scroller_line" />
              </div>
              <div className="col-12 d-flex justify-content-center p-0 pt-4 map_user_suggestion">
                {/* <FaGripLines className="font-icon scroller_line" /> */}
                <UserSuggest id="1" image="user.png" />
                <UserSuggest id="2" active={true} image="profile.png" />
                <UserSuggest id="3" image="user.png" />
                <UserSuggest id="4" image="profile.png" />
                <UserSuggest id="5" image="user.png" />
                <UserSuggest id="6" image="profile.png" />
              </div>
            </div>
          </div>
        </>
      );
      break;
    case 2:
      return (
        <>
          <Nav />
          <SearchPage />
        </>
      );
      break;
    default:
      return (
        <>
          <Nav />
          <MapHeader setView={setView} searchValue={searchValue} handleSearchChange={handleSearchChange} />
          <div className="container mb-1 rtl p-0 mapContainer">
            <MapComponent id="map_id" searchValue={searchValue} />
          </div>
          <div className="container mb-1 rtl">
            <div className="row">
              <div className="col-12 d-flex justify-content-center pt-0 scroller_div">
                <FaGripLines className="font-icon scroller_line" />
              </div>
              <div className="col-12 d-flex justify-content-center p-0 pt-4 map_user_suggestion">
                {/* <FaGripLines className="font-icon scroller_line" /> */}
                <UserSuggest id="1" image="user.png" />
                <UserSuggest id="2" active={true} image="profile.png" />
                <UserSuggest id="3" image="user.png" />
                <UserSuggest id="4" image="profile.png" />
                <UserSuggest id="5" image="user.png" />
                <UserSuggest id="6" image="profile.png" />
              </div>
            </div>
          </div>
        </>
      );
      break;
  }
  // if (typeof window !== "undefined" && window.document !== undefined) {
  //   //console.log('browser');
  //   return (
  //     <>
  //       <Nav />
  //       <MapHeader setView={setView} searchValue={searchValue} handleSearchChange={handleSearchChange} />
  //       <div className="container mb-1 rtl p-0 mapContainer">
  //         <MapComponent id="map_id" searchValue={searchValue} />
  //       </div>
  //       <div className="container mb-1 rtl">
  //         <div className="row">
  //           <div className="col-12 d-flex justify-content-center pt-0 scroller_div">
  //             <FaGripLines className="font-icon scroller_line" />
  //           </div>
  //           <div className="col-12 d-flex justify-content-center p-0 pt-4 map_user_suggestion">
  //             {/* <FaGripLines className="font-icon scroller_line" /> */}
  //             <UserSuggest id="1" image="user.png" />
  //             <UserSuggest id="2" active={true} image="profile.png" />
  //             <UserSuggest id="3" image="user.png" />
  //             <UserSuggest id="4" image="profile.png" />
  //             <UserSuggest id="5" image="user.png" />
  //             <UserSuggest id="6" image="profile.png" />
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
  // } else if (process) {
  //   //console.log('node');
  //   return (
  //     <>
  //       <Nav />
  //       <MapHeader searchValue={searchValue} handleSearchChange={handleSearchChange} />
  //       <div className="container mb-1 rtl mapContainer justify-content-center p-0">نقشه پشتیبانی نمی شود</div>
  //       <div className="container mb-1 rtl">
  //         <div className="row">
  //           <div className="col-12 d-flex justify-content-center pt-0 scroller_div" ref={scrollDiv}>
  //             <FaGripLines className="font-icon scroller_line" onScroll={scrollHandle} />
  //           </div>
  //           <div className="col-12 d-flex justify-content-start pt-4 map_user_suggestion">
  //             {/* <FaGripLines className="font-icon scroller_line" /> */}
  //             <UserSuggest id="1" image="user.png" />
  //             <UserSuggest id="2" active={true} image="profile.png" />
  //             <UserSuggest id="3" image="user.png" />
  //             <UserSuggest id="4" image="profile.png" />
  //             <UserSuggest id="5" image="user.png" />
  //             <UserSuggest id="6" image="profile.png" />
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }
};
Page.getInitialProps = async function(context) {
  // const apiBaseUrl = `https://www.pooshako.com/api/`;
  // const url = `${apiBaseUrl}Common/Location/GetProvinces`;
  // const response = await fetch(url, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json'
  //   }
  //   //body: JSON.stringify(image)
  // });
  // const result = await response.json();
  // return { result };
};
export default Page;