import React, { Fragment, useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Loading from "../components/Loader/Loading";
import fetchData from "../utils/fetchData";
import Nav from "../components/Nav/Nav";
import SubmitButton from "../components/Button/SubmitButton";
import { ToastContainer, toast } from "react-toastify";
import "../scss/components/aboutPage.scss";
function Page(props) {
  toast.configure({
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const sendForm = () => {
    toast.dismiss();
    if (name === "" || phone === "" || email === "" || text === "") {
      toast.warn("لطفا تمامی فیلد ها را بدرستی وارد نمایید.");
    } else {
      setLoading(true);
      setTimeout(() => {
        setName("");
        setPhone("");
        setEmail("");
        setText("");
        setLoading(false);
        toast.success("پیام شما با موفقیت ثبت شد.");
      }, 900);
    }
  };
  return (
    <>
      <title>قارون</title>
      <Nav />
      <div className="container mb-5 about_page">
        <div className="row">
          <div className="col-12 mb-5">
            <div className="row d-flex justify-content-start rtl pt-4 mb-5">
              <div className="col-12 text-center page_title">
                <h2>ثبت شکایات</h2>
                <hr />
              </div>
              <div className="col-12 mt-3">
                <form className="contactForm">
                  <div className="form-group row">
                    <label htmlFor="name" className="col-form-label">
                      نام
                    </label>
                    <input
                      value={name}
                      onChange={e => setName(e.target.value)}
                      type="text"
                      id="name"
                      className="form-control mt-1 mb-4 col-sm-12"
                      placeholder="نام"
                    />
                  </div>
                  <div className="form-group row">
                    <label htmlFor="name" className="col-form-label">
                      ایمیل
                    </label>
                    <input
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      type="text"
                      id="name"
                      className="form-control mt-1 mb-4 col-sm-12"
                      placeholder="ایمیل"
                    />
                  </div>
                  <div className="form-group row">
                    <label htmlFor="name" className="col-form-label">
                      موبایل
                    </label>
                    <input
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      type="text"
                      id="name"
                      className="form-control mt-1 mb-4 col-sm-12"
                      placeholder="موبایل"
                    />
                  </div>
                  <div className="form-group row">
                    <label htmlFor="email" className="col-form-label">
                      متن پیام
                    </label>
                    <textarea
                      value={text}
                      onChange={e => setText(e.target.value)}
                      id="text"
                      className="form-control mt-1 mb-4  col-sm-12"
                      placeholder="متن پیام"
                    />
                  </div>
                  <div className="text-center" style={{ marginTop: "-15px" }}>
                    <SubmitButton loading={loading} className="btn-main" text="ارسال" onClick={sendForm} />
                  </div>
                </form>
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