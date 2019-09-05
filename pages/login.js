import React, { Fragment, useState, useContext, useRef, useEffect, memo } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../components/Loader/Loader';
import fetch from 'isomorphic-unfetch';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import '../scss/style.scss';
import '../scss/components/login.scss';
import { secondsToMs } from '../utils/tools';
import SubmitButton from '../components/Button/SubmitButton';
import Nav from '../components/Nav/Nav';
import LoginHeader from '../components/Head/loginHeader';
function Page(props) {
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
      }
    };
    useEffect(() => {
      const id = setInterval(() => {
        if (timer < 0) {
          clearInterval(id);
        } else {
          setTimer(t => t - 1);
        }
      }, 1000);
      return () => clearInterval(id);
    }, []);
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
                <input value={userName} onChange={e => setUserName(e.target.value)} type="text" className="form-control mt-1 mb-4" placeholder=" موبایل &nbsp; | &nbsp; ایمیل " />
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
                <div className="btn-block mt-4 timer">{secondsToMs(timer)}</div>
              </form>
            </div>
          </div>
        </>
      );
    }
  };
  const Counter = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      const id = setInterval(() => {
        setCount(c => c - 1);
      }, 1000);
      return () => clearInterval(id);
    }, []);
    return <h1>{count}</h1>;
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