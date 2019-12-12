import React, { Fragment, useState, useContext, useRef, useEffect, memo } from "react";
import dynamic from "next/dynamic";
import Loading from "../components/Loader/Loader";
import fetch from "isomorphic-unfetch";
import axios from "axios";
import nextCookie from "next-cookies";
import cookie from "js-cookie";
import "../scss/components/login.scss";
import { secondsToMs, forceNumeric } from "../utils/tools";
import useInterval from "../components/useInterval";
import SubmitButton from "../components/Button/SubmitButton";
import Nav from "../components/Nav/Nav";
import LoginHeader from "../components/Head/loginHeader";
import { ToastContainer, toast } from "react-toastify";
import getHost from "../utils/get-host";
import Router from "next/router";
const EMAIL_RX = /[A-Z0-9a-z._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,64}/;
const Mobile_RX = /(\+98|0|98|0098)?([ ]|-|[()]){0,2}9[0-9]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/;
const Page = props => {
  toast.configure({
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  const View = () => {
    const [step, setStep] = useState(1);
    const [userName, setUserName] = useState("");
    const [reagent, setReagent] = useState("");
    const [code, setCode] = useState("");
    const [timer, setTimer] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmitStep1 = async () => {
      toast.dismiss();
      if (userName.length > 0) {
        if ((Mobile_RX.test(userName) && userName.length < 12) || EMAIL_RX.test(userName)) {
          setIsLoading(true);
          const apiUrl = `${getHost()}Common/C_Account/RegisterOrLogin`;
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ phoneNumber_Or_Email: userName, marketerCode: reagent }),
            credentials: "include"
          });
          if (response != undefined && response.ok) {
            const result = await response.json();
            if (result.isSuccess) {
              toast.success("کد فعال سازی با موفقیت برای شما ارسال شد.");
              setStep(2);
              setTimer(60);
            } else {
              toast.warn(result.message);
            }
            setIsLoading(false);
          } else {
            toast.error("متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید.");
            setIsLoading(false);
          }
        } else {
          toast.warn("لطفا شماره موبایل یا ایمیل خود را به درستی وارد کنید.");
        }
      } else {
        toast.warn("لطفا شماره موبایل یا ایمیل خود را وارد کنید.");
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
        return <SubmitButton loading={isLoading} onClick={() => handleSubmitStep1()} text="ارسال مجدد" className="mt-4 btn btn-lg btn-block timer" />;
      }
    };
    const handleSubmitStep2 = async () => {
      toast.dismiss();
      if (userName.length > 0 && code.length > 0 && step == 2) {
        setIsLoading(true);
        const apiUrl = `${getHost()}Common/C_Account/Token`;
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify({ phoneNumber_Or_Email: userName, code: code }),
          credentials: "include"
        });
        if (response != undefined && response.ok) {
          const result = await response.json();
          if (result.isSuccess) {
            const accessToken = result.data.accessToken;
            const refreshToken = result.data.refreshToken;
            cookie.set("accessToken", accessToken, { expires: 30 });
            cookie.set("refreshToken", refreshToken, { expires: 30 });
            //toast.success(`ورود شما با موفقیت انجام شد.`);
            Router.push("/profile");
          } else {
            toast.warn(result.message);
          }
          setIsLoading(false);
        } else {
          toast.error("متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید.");
          setIsLoading(false);
        }
      } else {
        toast.warn("لطفا کد ارسال شده به موبایل یا ایمیل خود را وارد کنید.");
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
                <input
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                  type="text"
                  className="form-control mt-1 mb-3"
                  placeholder=" موبایل &nbsp; | &nbsp; ایمیل "
                  onKeyPress={e => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSubmitStep1();
                    }
                  }}
                />
                <input value={reagent} onChange={e => setReagent(e.target.value)} type="text" className="form-control mb-4" placeholder=" معرف " />
                <SubmitButton loading={isLoading} onClick={() => handleSubmitStep1()} text="ادامه" className="btn btn-lg btn-block btn-submit" />
              </form>
            </div>
          </div>
        </>
      );
    } else if (step == 2) {
      let change_txt = EMAIL_RX.test(userName) ? `کد ارسالی به ایمیل ${userName} را وارد نمایید` : `کد ارسالی به شماره ${userName} را وارد نمایید`;
      return (
        <>
          <div className="row">
            <div className="col d-block text-center messages">
              <p className="text_message"> {change_txt} </p>
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
                <input
                  value={code}
                  onChange={e => setCode(forceNumeric(e.target.value))}
                  type="text"
                  className="form-control mt-1 mb-4"
                  placeholder=" کد ارسالی "
                  onKeyPress={e => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSubmitStep2();
                    }
                  }}
                />
                <SubmitButton loading={isLoading} onClick={() => handleSubmitStep2()} text="ورود" className="btn btn-lg btn-block btn-submit" />
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