import React, { Fragment, useContext, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../components/Loader/Loading';
import fetchData from '../utils/fetchData';
import Nav from '../components/Nav/Nav';
import '../scss/components/aboutPage.scss';
function Page(props) {
  return (
    <>
      <Nav />
      <div className="container mb-1 about_page">
        <div className="row">
          <div className="col-12">
            <div className="row d-flex justify-content-start rtl pt-4">
              <div className="col-12 text-center page_title">
                <h2>تماس با ما</h2>
                <hr />
              </div>
              <div className="col-12 mt-3">
                <p className="content_text">آدرس : قم - خیابان معلم - مجتمع ناشران - واحد 309</p>
                <p className="content_text">تلفن : 02537730041</p>
                <p className="content_text">همراه : 09301502230</p>
                <p className="content_text">ایمیل : info@qarun.ir</p>
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