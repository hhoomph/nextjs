import React, { Fragment, useReducer, useState, useContext, useRef, useEffect, memo } from "react";
import dynamic from "next/dynamic";
import Loading from "../components/Loader/Loader";
import fetchData from "../utils/fetchData";
import "../scss/components/mapPage.scss";
import { ToastContainer, toast } from "react-toastify";
import { FaGripLines, FaArrowUp } from "react-icons/fa";
import "react-toastify/scss/main.scss";
const Nav = dynamic({
  loader: () => import("../components/Nav/Nav"),
  loading: () => <Loading />,
  ssr: true
});
const UserSuggest = dynamic({
  loader: () => import("../components/UserSuggest/UserSuggest2"),
  loading: () => <Loading />,
  ssr: true
});
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
const FirstCatProductsRow = dynamic({
  loader: () => import("../components/CatProductsRow/FirstCatProductsRow"),
  loading: () => <Loading />,
  ssr: true
});
let lastScrollTop = 0;
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
  const allCategories = props.allCategories.data || [];
  const [topScale, setTopScale] = useState(0.9);
  const [lastScroll, setLastScroll] = useState(0);
  const scrollButton = useRef();
  const scrollDiv = useRef();
  const scrollHandle = () => {
    const st = document.documentElement.scrollTop;
    console.log(st, lastScrollTop);
    // if (st >= lastScrollTop) {
    //   // downscroll code
    //   if (st > 22 && st < 450) {
    //     let t = window.innerHeight - 50;
    //     window.scrollTo(0, t);
    //     //window.scrollTo(0, 590);
    //   } else if (st < 22) {
    //     window.scrollTo(0, 0);
    //   }
    // } else {
    //   // upscroll code
    //   if (st < 500) {
    //     window.scrollTo(0, 0);
    //   }
    // }
    // lastScrollTop = st;
    if (st >= 26 && st < 310) {
      // scrollDiv.current.scrollIntoView({
      //   behavior: 'smooth',
      //   block: 'start'
      // });
      let t = window.innerHeight - 50;
      window.scrollTo(0, t);
      //window.scrollTo(0, 590);
    } else if (st < 26) {
      window.scrollTo(0, 0);
    } else if (st < 516 && st > 300) {
      window.scrollTo(0, 0);
      //window.scrollTo(0, 590);
    }
  };
  const handleScrollSize = () => {
    let mass = Math.min(2.5, 1.12 - 0.005 * document.documentElement.scrollTop);
    setTopScale(mass);
    //lastScrollTop = document.documentElement.scrollTop;
  };
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = e => {
    setSearchValue(e.current.value);
  };
  const showFirstCatProductsRow = allCategories.map(cat => <FirstCatProductsRow key={cat.id} id={cat.id} title={cat.titel} />);
  useEffect(() => {
    window.addEventListener("scroll", handleScrollSize);
    return () => window.removeEventListener("scroll", handleScrollSize);
  }, []);
  switch (view) {
    case 1:
      return (
        <>
          <Nav />
          <MapHeader setView={setView} searchValue={searchValue} handleSearchChange={handleSearchChange} />
          <div className="container mb-1 rtl p-0 mapContainer">
            <MapComponent id="map_id" searchValue={searchValue} />
          </div>
          <div className="container mb-1 rtl" onTouchEndCapture={scrollHandle}>
            <div className="row">
              <div className="col-12 d-flex justify-content-center pt-0 scroller_div">
                <FaGripLines
                  className="font-icon scroller_line"
                  onClick={scrollHandle}
                  onTouchEndCapture={scrollHandle}
                  style={{ transform: `scale(${topScale})` }}
                />
              </div>
              <div className={`col-12 d-flex justify-content-start p-0 pt-4 map_user_suggestion`}>
                <UserSuggest id="1" image="user.png" />
                <UserSuggest id="2" active={true} image="profile.png" />
                <UserSuggest id="3" image="user.png" />
                <UserSuggest id="4" image="profile.png" />
                <UserSuggest id="5" image="user.png" />
                <UserSuggest id="6" image="profile.png" />
              </div>
            </div>
          </div>
          <div ref={scrollDiv} onTouchEndCapture={scrollHandle}>
            {showFirstCatProductsRow}
          </div>
        </>
      );
      break;
    case 2:
      return (
        <>
          <Nav />
          <SearchPage setView={setView} />
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
          <div className="container mb-1 rtl" onTouchEndCapture={scrollHandle}>
            <div className="row">
              <div className="col-12 d-flex justify-content-center pt-0 scroller_div">
                <FaGripLines
                  className="font-icon scroller_line"
                  onClick={scrollHandle}
                  onTouchEndCapture={scrollHandle}
                  style={{ transform: `scale(${topScale})` }}
                />
              </div>
              <div className={`col-12 d-flex justify-content-start p-0 pt-4 map_user_suggestion`}>
                <UserSuggest id="1" image="user.png" />
                <UserSuggest id="2" active={true} image="profile.png" />
                <UserSuggest id="3" image="user.png" />
                <UserSuggest id="4" image="profile.png" />
                <UserSuggest id="5" image="user.png" />
                <UserSuggest id="6" image="profile.png" />
              </div>
            </div>
          </div>
          <div ref={scrollDiv} onTouchEndCapture={scrollHandle}>
            {showFirstCatProductsRow}
          </div>
        </>
      );
      break;
  }
};
Page.getInitialProps = async function(context) {
  // Get All Categories
  const allCategories = await fetchData(
    "Common/C_Category/GetAllParentAsync",
    {
      method: "GET"
    },
    context
  );
  return { allCategories };
};
export default Page;