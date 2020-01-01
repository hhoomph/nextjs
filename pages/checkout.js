import React, { Fragment, useContext, useRef, useState, useEffect, memo } from "react";
import dynamic from "next/dynamic";
import Loading from "../components/Loader/Loading";
import Router from "next/router";
import Nav from "../components/Nav/Nav";
import Auth from "../components/Auth/Auth";
import fetchData from "../utils/fetchData";
import { FaCheck, FaArrowLeft, FaArrowRight, FaTimes, FaCheckDouble } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { numberSeparator, removeSeparator, forceNumeric } from "../utils/tools";
import SubmitButton from "../components/Button/SubmitButton";
import "../scss/components/checkout.scss";
//import { setTimeout } from 'core-js';
function Page(props) {
  const nextCtx = props.ctx;
  const _orderId = props.id || null;
  console.log(_orderId);
  const [view, setView] = useState(1);
  const [loading, setLoading] = useState(false);
  const _addresses =
    props.Res !== undefined &&
    props.Res.data !== undefined &&
    props.Res.data !== null &&
    props.Res.data.address !== undefined &&
    props.Res.data.address !== null &&
    props.Res.data.address.length > 0
      ? props.Res.data.address
      : [];
  const _address = _addresses.length > 0 ? _addresses[_addresses.length - 1] : "";
  const _phone = props.Res.data !== null && props.Res.data.phoneNumber ? props.Res.data.phoneNumber : "";
  const [address, setAddress] = useState(_address);
  const [phoneNumber, setPhoneNumber] = useState(_phone);
  const [description, setDescription] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [orderId, setOrderId] = useState(0);
  const handleRadioPayment = e => {
    setPaymentMethod(e.target.value);
  };
  toast.configure({
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  const stepTwo = async () => {
    if (address.length > 0) {
      if (phoneNumber !== "") {
        // setLoading(true);
        // const Res = await fetchData(
        //   "User/U_Order/AddS2",
        //   {
        //     method: "POST",
        //     body: JSON.stringify({
        //       phoneNumber: phoneNumber,
        //       address: address,
        //       description: description
        //     })
        //   },
        //   nextCtx
        // );
        // if (Res !== undefined && Res.isSuccess) {
        //   setOrderId(Res.data.orderId);
        //   setView(2);
        // } else if (Res !== undefined && Res.message != undefined) {
        //   toast.warn(Res.message);
        // } else if (Res !== undefined && Res.error != undefined) {
        //   toast.error(Res.error);
        // }
        // setLoading(false);
        setView(2);
      } else {
        toast.warn("لطفا تلفن همراه را وارد نمایید.");
      }
    } else {
      toast.warn("لطفا آدرس را وارد نمایید.");
    }
  };
  const stepThree = async () => {
    setLoading(true);
    const Res = await fetchData(
      "User/U_Order/AddS3",
      {
        method: "POST",
        body: JSON.stringify({
          //orderId: orderId,   -> Send Old Order Id for repayment order (if customer canceled an order)
          phoneNumber: phoneNumber,
          address: address,
          description: description,
          orderPaymentType: paymentMethod
        })
      },
      nextCtx
    );
    if (Res !== undefined && Res.isSuccess) {
      // setOrderId(Res.data.orderId);
      // setView(2);
      Router.push("/cart");
    } else if (Res !== undefined && Res.message != undefined) {
      toast.warn(Res.message);
    } else if (Res !== undefined && Res.error != undefined) {
      toast.error(Res.error);
    }
    setLoading(false);
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
                {loading ? <Loading className="font_icon" /> : <FaCheck className="font_icon" />}
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
                    <textarea
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      id="address"
                      className="form-control mt-1 mb-4  col-sm-12"
                      placeholder="آدرس"
                    />
                  </div>
                  <div className="form-group row">
                    <label htmlFor="name" className="col-form-label">
                        تلفن
                    </label>
                    <input
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      type="text"
                      id="phoneNumber"
                      className="form-control mt-1 mb-4 col-sm-12"
                      placeholder="تلفن"
                    />
                  </div>
                  <div className="form-group row">
                    <label htmlFor="email" className="col-form-label">
                        توضیحات تکمیلی
                    </label>
                    <textarea
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      id="description"
                      className="form-control mt-1 mb-4  col-sm-12"
                      placeholder="توضیحات تکمیلی"
                    />
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
              <a className="d-inline-block btn-main" onClick={stepThree}>
                  پرداخت
                {loading ? <Loading className="font_icon" /> : <FaCheckDouble className="font_icon" />}
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
                        <input
                          type="radio"
                          onChange={e => setPaymentMethod(e.target.value)}
                          checked={paymentMethod == 1}
                          className="custom-control-input"
                          value={1}
                        />
                        <label className="custom-control-label" onClick={e => setPaymentMethod(1)}>
                            آنی
                        </label>
                        <p className="payment_info">پرداخت آنلاین مستقیم از درگاه بانکی</p>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-12">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input"
                          onChange={e => setPaymentMethod(e.target.value)}
                          checked={paymentMethod == 2}
                          value={2}
                        />
                        <label className="custom-control-label" onClick={e => setPaymentMethod(2)}>
                            کسر از موجودی
                        </label>
                        <p className="payment_info">پرداخت از موجودی کیف پول قارون</p>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-12">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input"
                          onChange={e => setPaymentMethod(e.target.value)}
                          checked={paymentMethod == 3}
                          value={3}
                        />
                        <label className="custom-control-label" onClick={e => setPaymentMethod(3)}>
                            نقدی
                        </label>
                        <p className="payment_info">
                            پرداخت نقدی به فروشنده در محل
                          {/* <div>این نوع پرداخت معاف از ضمانت بازگشت وجه می باشد</div> */}
                          <div>مسئولیت این پرداخت به عهده کاربر می باشد.</div>
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
  const { id } = context.query;
  const Res = await fetchData(
    "User/U_Order/AddS1",
    {
      method: "POST"
    },
    context
  );
  return { Res, id };
};
export default Auth(Page);