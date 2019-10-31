import React, { Fragment, useReducer, useState, useContext, useRef, useEffect, memo } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../components/Loader/Loader';
import fetch from 'isomorphic-unfetch';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import Nav from '../components/Nav/Nav';
import MapHeader from '../components/Head/mapHeader';
import UserSuggest from '../components/UserSuggest/UserSuggest2';
import '../scss/components/mapPage.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/scss/main.scss';
const MapComponent = dynamic({
  loader: () => import('../components/Map/Map'),
  loading: () => <Loading />,
  ssr: false
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
  const [searchValue, setSearchValue] = useState('');
  const handleSearchChange = e => {
    setSearchValue(e.current.value);
  };
  if (typeof window !== 'undefined' && window.document !== undefined) {
    //console.log('browser');
    return (
      <>
        <Nav />
        <MapHeader searchValue={searchValue} handleSearchChange={handleSearchChange} />
        <div className="container mb-1 rtl p-0 mapContainer">
          <MapComponent id="map_id" searchValue={searchValue} />
        </div>
        <div className="container mb-1 rtl">
          <div className="row">
            <div className="d-flex justify-content-center pr-2 map_user_suggestion">
              <UserSuggest id="1" image="user.png" />
              <UserSuggest id="2" image="profile.png" />
              <UserSuggest id="3" image="user.png" />
              <UserSuggest id="4" image="profile.png" />
              <UserSuggest id="5" image="user.png" />
              <UserSuggest id="6" image="profile.png" />
            </div>
          </div>
        </div>
      </>
    );
  } else if (process) {
    //console.log('node');
    return (
      <>
        <Nav />
        <MapHeader searchValue={searchValue} handleSearchChange={handleSearchChange} />
        <div className="container mb-1 rtl mapContainer justify-content-center p-0">نقشه پشتیبانی نمی شود</div>
        <div className="container mb-1 rtl">
          <div className="row">
            <div className="col d-flex justify-content-start pr-2 map_user_suggestion">
              <UserSuggest id="1" image="user.png" />
              <UserSuggest id="2" image="profile.png" />
              <UserSuggest id="3" image="user.png" />
              <UserSuggest id="4" image="profile.png" />
              <UserSuggest id="5" image="user.png" />
              <UserSuggest id="6" image="profile.png" />
            </div>
          </div>
        </div>
      </>
    );
  }
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