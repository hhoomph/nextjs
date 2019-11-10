import React, { Fragment, useContext, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../components/Loader/Loading';
import fetchData from '../utils/fetchData';
import Nav from '../components/Nav/Nav';
function Page(props) {
  return (
    <>
      <Nav />
      <div className="container mb-1">
        <div className="row">
          <div className="col-12">
            <div className="row d-flex justify-content-start rtl pr-2 pt-4">
              <h3>شرایط و قوانین استفاده از سرویس‌ها و خدمات قارون</h3>
              <div className="col-12 mt-3">
                <p>شرایط و قوانین استفاده از سرویس‌ها و خدمات قارون</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
Page.getInitialProps = async function(context) {};
export default Page;