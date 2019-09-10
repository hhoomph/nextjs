import React, { Fragment, useState, useContext, useRef, useEffect, memo } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../components/Loader/Loader';
import fetch from 'isomorphic-unfetch';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import '../scss/style.scss';
import '../scss/components/login.scss';
import { secondsToMs, forceNumeric } from '../utils/tools';
import useInterval from '../components/useInterval';
import SubmitButton from '../components/Button/SubmitButton';
import Nav from '../components/Nav/Nav';
import LoginHeader from '../components/Head/loginHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/scss/main.scss';
function Page(props) {
  toast.configure();
  const View = () => {
    const [step, setStep] = useState(1);
    const [userName, setUserName] = useState('');
    const [code, setCode] = useState('');
    const [timer, setTimer] = useState(0);
    const handleSubmit = () => {
      if (userName.length > 0) {
        setStep(2);
        setTimer(60);
      } else {
        toast.dismiss();
        toast.warn('لطفا شماره موبایل یا ایمیل خود را وارد کنید.', {
          position: 'top-right',
          autoClose: 55000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      }
    };
    const handleResend = () => {
      if (userName.length > 0 && step == 2) {
        setStep(2);
        setTimer(60);
      } else {
        toast.error('لطفا شماره موبایل یا ایمیل خود را وارد کنید.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      }
    };
    useInterval(() => {
      if (timer > 0) {
        setTimer(currentTime => currentTime - 1);
      }
    }, 1000);
    // useEffect(() => {
    //   const id = setInterval(() => {
    //     if (timer < 0) {
    //       clearInterval(id);
    //     } else {
    //       setTimer(currentTime => currentTime - 1);
    //     }
    //   }, 1000);
    //   return () => clearInterval(id);
    // }, [timer]);
    const Resend = () => {
      if (timer > 0) {
        return <div className="btn-block mt-4 timer">{secondsToMs(timer)}</div>;
      } else {
        return <SubmitButton onClick={() => handleResend()} text="ارسال مجدد" className="mt-4 btn btn-lg btn-block timer" />;
      }
    };
    if (step == 1) {
      return (
        <>
          <div className="row">
            <div className="col d-block text-center messages">
              <p className="text_message">لطفا شماره موبایل یا ایمیل خود را وارد نمایید</p>
            </div>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center">
              <form className="loginForm">
                <input value={userName} onChange={e => setUserName(forceNumeric(e.target.value))} type="text" className="form-control mt-1 mb-4" placeholder=" موبایل &nbsp; | &nbsp; ایمیل " />
                <SubmitButton onClick={() => handleSubmit()} text="ادامه" className="btn btn-lg btn-block btn-submit" />
              </form>
            </div>
          </div>
        </>
      );
    } else if (step == 2) {
      return (
        <>
          <div className="row">
            <div className="col d-block text-center messages">
              <p className="text_message">کد ارسالی به شماره {userName} را وارد نمایید </p>
              <div className="change_userName">
                <a
                  onClick={() => {
                    setStep(1);
                  }}
                >
                  ( تغییر شماره همراه )
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center">
              <form className="loginForm">
                <input value={code} onChange={e => setCode(e.target.value)} type="text" className="form-control mt-1 mb-4" placeholder=" کد ارسالی " />
                <SubmitButton text="ورود" className="btn btn-lg btn-block btn-submit" />
                <Resend />
              </form>
            </div>
          </div>
        </>
      );
    }
  };
  return (
    <>
      <Nav />
      <LoginHeader />
      <div className="container mb-1 rtl login">
        <View />
      </div>
    </>
  );
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