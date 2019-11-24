import React, { Fragment, useReducer, useState, useContext, useRef, useEffect, memo } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../components/Loader/Loader';
import fetchData from '../utils/fetchData';
import Nav from '../components/Nav/Nav';
import UserSuggest from '../components/UserSuggest/UserSuggest2';
import '../scss/components/mapPage.scss';
import { ToastContainer, toast } from 'react-toastify';
import { FaGripLines, FaArrowUp } from 'react-icons/fa';
import 'react-toastify/scss/main.scss';
const MapComponent = dynamic({
  loader: () => import('../components/Map/Map'),
  loading: () => <Loading />,
  ssr: false
});
const MapHeader = dynamic({
  loader: () => import('../components/Head/mapHeader'),
  loading: () => <Loading />,
  ssr: true
});
const SearchPage = dynamic({
  loader: () => import('../components/Search/Search'),
  loading: () => <Loading />,
  ssr: true
});
const FirstCatProductsRow = dynamic({
  loader: () => import('../components/CatProductsRow/FirstCatProductsRow'),
  loading: () => <Loading />,
  ssr: true
});
const Page = props => {
  toast.configure({
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  const [view, setView] = useState(1);
  const allCategories = props.allCategories.data || [];
  const [topClass, setTopClass] = useState(0.9);
  const scrollButton = useRef();
  const scrollDiv = useRef();
  const scrollHandle = () => {
    //console.log(document.documentElement.scrollTop);
    if (document.documentElement.scrollTop > 25 && document.documentElement.scrollTop < 300) {
      // scrollDiv.current.scrollIntoView({
      //   behavior: 'smooth',
      //   block: 'start'
      // });
      let t = window.innerHeight - 50;
      window.scrollTo(0, t);
      //window.scrollTo(0, 590);
    } else if (document.documentElement.scrollTop <= 25) {
      window.scrollTo(0, 0);
    } else if (document.documentElement.scrollTop < 580 && document.documentElement.scrollTop > 300) {
      window.scrollTo(0, 0);
      //window.scrollTo(0, 590);
    }
    //window.scrollTo(0, 590);
    //setTopClass('top');
    //scrollDiv.current.scrollTo(0, 590);
    // scrollDiv.current.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'end',
    //   inline: 'nearest'
    // });
  };
  const handleScrollSize = () => {
    let mass = Math.min(2.5, 0.9 + 0.005 * document.documentElement.scrollTop);
    setTopClass(mass);
  };
  const [searchValue, setSearchValue] = useState('');
  const handleSearchChange = e => {
    setSearchValue(e.current.value);
  };
  const showFirstCatProductsRow = allCategories.map(cat => <FirstCatProductsRow key={cat.id} id={cat.id} title={cat.titel} />);
  useEffect(() => {
    window.addEventListener('scroll', handleScrollSize, false);
    return () => window.removeEventListener('scroll', handleScrollSize);
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
                <FaGripLines className="font-icon scroller_line" onClick={scrollHandle} onTouchEndCapture={scrollHandle} style={{ transform: `scale(${topClass})` }} />
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
                <FaGripLines className="font-icon scroller_line" onClick={scrollHandle} onTouchEndCapture={scrollHandle} style={{ transform: `scale(${topClass})` }} />
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
  //             <FaGripLines className="font-icon scroller_line"  />
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
  // Get All Categories
  const allCategories = await fetchData(
    'Common/C_Category/GetAllParentAsync',
    {
      method: 'GET'
    },
    context
  );
  return { allCategories };
};
export default Page;