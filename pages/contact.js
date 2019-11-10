import React, { Fragment, useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../components/Loader/Loading';
import fetchData from '../utils/fetchData';
import Nav from '../components/Nav/Nav';
import SubmitButton from '../components/Button/SubmitButton';
function Page(props) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const sendForm = () => {
    setLoading(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setEmail('');
      setText('');
      setLoading(false);
    }, 500);
  };
  return (
    <>
      <Nav />
      <div className="container mb-5">
        <div className="row">
          <div className="col-12 mb-5">
            <div className="row d-flex justify-content-start rtl pr-2 pt-4 mb-5">
              <h3>تماس با قارون</h3>
              <div className="col-12 mt-3">
                <form className="checkoutForm">
                  <div className="form-group row">
                    <label htmlFor="name" className="col-form-label">
                      نام
                    </label>
                    <input value={name} onChange={e => setName(e.target.value)} type="text" id="name" className="form-control mt-1 mb-4 col-sm-12" placeholder="نام" />
                  </div>
                  <div className="form-group row">
                    <label htmlFor="name" className="col-form-label">
                      ایمیل
                    </label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="text" id="name" className="form-control mt-1 mb-4 col-sm-12" placeholder="ایمیل" />
                  </div>
                  <div className="form-group row">
                    <label htmlFor="name" className="col-form-label">
                      موبایل
                    </label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} type="text" id="name" className="form-control mt-1 mb-4 col-sm-12" placeholder="موبایل" />
                  </div>
                  <div className="form-group row">
                    <label htmlFor="email" className="col-form-label">
                      متن پیام
                    </label>
                    <textarea value={text} onChange={e => setText(e.target.value)} id="text" className="form-control mt-1 mb-4  col-sm-12" placeholder="متن پیام" />
                  </div>
                  <div className="text-center" style={{ marginTop: '-15px' }}>
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