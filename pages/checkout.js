import React, { Fragment, useContext, useRef, useState, useEffect, memo } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../components/Loader/Loading';
import Router from 'next/router';
import Nav from '../components/Nav/Nav';
import Auth from '../components/Auth/Auth';
import fetchData from '../utils/fetchData';
import { FaCheck, FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { numberSeparator, removeSeparator, forceNumeric } from '../utils/tools';
import SubmitButton from '../components/Button/SubmitButton';
import '../scss/components/checkout.scss';
//import { setTimeout } from 'core-js';
function Page(props) {
  const nextCtx = props.ctx;
  const [view, setView] = useState(1);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(1);
  const handleRadioPayment = e => {
    setPaymentMethod(e.target.value);
  };
  toast.configure({
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  const stepTwo = () => {
    // check validation
    setView(2);
  };
  switch (view) {
    case 1:
      // if (typeof window !== 'undefined') {
      //   window.scroll(0, 0);
      // }
      return (
        <>
          <Nav />
          <div className="container mb-1 rtl checkout_page">
            <div className="row mb-3 p-2 header_link">
              <div className="col pt-2 text-center">
                <a className="d-inline-block btn-main" onClick={stepTwo}>
                  ثبت نهایی
                  {loading ? <Loading className="font_icon" /> : <FaArrowLeft className="font_icon" />}
                </a>
              </div>
            </div>
            <div className="container">
              <div className="row mt-3 mb-5 checkout_form">
                <div className="col">
                  <form className="checkoutForm">
                    <div className="form-group row">
                      <label htmlFor="email" className="col-form-label">
                        آدرس
                      </label>
                      <textarea value={address} onChange={e => setAddress(e.target.value)} id="address" className="form-control mt-1 mb-4  col-sm-12" placeholder="آدرس" />
                    </div>
                    <div className="form-group row">
                      <label htmlFor="name" className="col-form-label">
                        تلفن
                      </label>
                      <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} type="text" id="phoneNumber" className="form-control mt-1 mb-4 col-sm-12" placeholder="تلفن" />
                    </div>
                    <div className="form-group row">
                      <label htmlFor="email" className="col-form-label">
                        توضیحات تکمیلی
                      </label>
                      <textarea value={description} onChange={e => setDescription(e.target.value)} id="description" className="form-control mt-1 mb-4  col-sm-12" placeholder="توضیحات تکمیلی" />
                    </div>
                  </form>
                </div>
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
          <div className="container mb-1 rtl checkout_page">
            <div className="row mb-3 p-2 header_link">
              <div className="col pt-2 text-center">
                <a className="d-inline-block btn-main">
                  پرداخت
                  {loading ? <Loading className="font_icon" /> : <FaArrowLeft className="font_icon" />}
                </a>
              </div>
            </div>
            <div className="container">
              <div className="row mt-3 mb-5 checkout_form">
                <div className="col">
                  <form className="paymentForm">
                    <div className="form-group row">
                      <div className="col-12">
                        <div className="custom-control custom-radio">
                          <input type="radio" onChange={e => setPaymentMethod(e.target.value)} checked={paymentMethod == 1} className="custom-control-input" value={1} />
                          <label className="custom-control-label" onClick={e => setPaymentMethod(1)}>آنی</label>
                          <p className="payment_info">پرداخت آنلاین مستقیم از درگاه بانکی</p>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-12">
                        <div className="custom-control custom-radio">
                          <input type="radio" className="custom-control-input" onChange={e => setPaymentMethod(e.target.value)} checked={paymentMethod == 2} value={2} />
                          <label className="custom-control-label" onClick={e => setPaymentMethod(2)}>کسر از موجودی</label>
                          <p className="payment_info">پرداخت از موجودی کیف پول قارون</p>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-12">
                        <div className="custom-control custom-radio">
                          <input type="radio" className="custom-control-input" onChange={e => setPaymentMethod(e.target.value)} checked={paymentMethod == 3} value={3} />
                          <label className="custom-control-label" onClick={e => setPaymentMethod(3)}>نقدی</label>
                          <p className="payment_info">
                            پرداخت نقدی به فروشنده در محل
                            <span>در این نوع پرداخت مسوولیت پرداخت به عهده کاربر می باشد</span>
                            <span>این نوع پرداخت معاف از ضمانت بازگشت وجه می باشد</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      );
      break;
    default:
      // if (typeof window !== 'undefined') {
      //   window.scroll(0, 0);
      // }
      return (
        <>
          <Nav />
        </>
      );
      break;
  }
}
Page.getInitialProps = async function(context) {
  // const result = await fetchData(
  //   'Common/C_Category/GetAllParentAsync',
  //   {
  //     method: 'GET'
  //   },
  //   context
  // );
  // return { result };
};
export default Auth(Page);