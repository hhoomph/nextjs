import React, { Fragment, useContext, useReducer, useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../components/Loader/Loading';
import { useRouter } from 'next/router';
import Nav from '../components/Nav/Nav';
import ProfileHeader from '../components/Head/profileHeader';
import Product from '../components/Profile/product';
import Auth from '../components/Auth/Auth';
import fetchData from '../utils/fetchData';
import SubmitButton from '../components/Button/SubmitButton';
import { numberSeparator, removeSeparator, forceNumeric } from '../utils/tools';
import { FaArrowLeft, FaArrowRight, FaMinus, FaPlus, FaCaretDown, FaCaretUp } from 'react-icons/fa';
import '../scss/components/inventory.scss';
const User = dynamic({
  loader: () => import('../components/Friend/User'),
  loading: () => <Loading />,
  ssr: true
});
function Page(props) {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Nav />
      <div className="container pt-3 inventory_page">
        <div className="row">
          <div className="col-12 text-center">
            <p className="inventory_price rtl">{numberSeparator(532000)} تومان</p>
          </div>
        </div>
        <div className="row p-2 cart_title">
          <div className="col text-center">
            <h3 className="mr-2 ml-2 mt-1 page_title">موجودی حساب</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-block pb-2">
            <div className="col-6 text-center float-right">
              <SubmitButton loading={loading} onClick={() => setProductImages()} text="شارژ" className="d-inline-block btn-main charge">
                <FaPlus className="font_icon" />
              </SubmitButton>
            </div>
            <div className="col-6 text-center float-left">
              <SubmitButton loading={loading} onClick={() => setProductImages()} text="برداشت" className="d-inline-block btn-main removal">
                <FaMinus className="font_icon" />
              </SubmitButton>
            </div>
          </div>
          <hr />
        </div>
        <div className="row rtl">
          <div className="col-12">
            <p className="amount">1,597,000</p>
            <p className="date">5/6/98</p>
            <FaCaretDown className="font_icon" style={{color: '#F44336'}} />
          </div>
          <div className="col-12">
            <p className="amount">2,435,000</p>
            <p className="date">12/06/1398</p>
            <FaCaretUp className="font_icon" style={{color: '#4CAF50'}} />
          </div>
        </div>
      </div>
    </>
  );
}
Page.getInitialProps = async function(context) {};
export default Auth(Page);