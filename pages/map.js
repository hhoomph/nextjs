import React, { Fragment, useState, useContext, useRef, useEffect, memo } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../components/Loader/Loader';
import fetch from 'isomorphic-unfetch';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import '../scss/style.scss';
import { secondsToMs, forceNumeric } from '../utils/tools';
import Nav from '../components/Nav/Nav';
import MapHeader from '../components/Head/mapHeader';
import '../scss/components/mapPage.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/scss/main.scss';
const MapComponent = dynamic({
  loader: () => import('../components/Map/Map'),
  loading: () => <Loading />,
  ssr: false
});
function Page(props) {
  toast.configure();
  if (typeof window !== 'undefined' && window.document !== undefined) {
    return (
      <>
        <Nav />
        <MapHeader />
        <div className="container mb-1 rtl">
          <MapComponent />
        </div>
      </>
    );
  } else if (process) {
    //console.log('node');
    return (
      <>
        <Nav />
        <MapHeader />
        <div className="container mb-1 rtl justify-content-center">نقشه پشتیبانی نمی شود</div>
      </>
    );
  }
}
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