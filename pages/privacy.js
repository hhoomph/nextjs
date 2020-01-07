import React, { Fragment, useContext, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Loading from "../components/Loader/Loading";
import fetchData from "../utils/fetchData";
import Nav from "../components/Nav/Nav";
import "../scss/components/aboutPage.scss";
function Page(props) {
  return (
    <>
      <Nav />
      <div className="container mb-1 about_page">
        <div className="row">
          <div className="col-12">
            <div className="row d-flex justify-content-start rtl pt-4">
              <div className="col-12 text-center page_title">
                <h2>حریم خصوصی</h2>
                <hr />
              </div>
              <div className="col-12 mt-3">
                <p className="content_text">
                  قارون بازاری برای عرضه و تقاضای آنلاین طیف گسترده ای از محصولات با تنوع چشمگیر، همراه با طرحهای ویژه تجاریست که کاربرانش را در سود معاملات خود سهیم مینماید. بازار آنلاین اجتماعی
                  قارون با هدف ایجاد یک بستر گسترده تجاری برای عموم کاربران جامعه و بازاری وسیع، متنوع و رقابتی باتوجه به شرایط بومی هر موقعیت می باشد که دارای ویژگیهای منحصر بفردی جهت کاربری هرچه
                  ساده تر و بهتر برای استفاده کنندگان خود است. دراین راستا ایجاد فضایی جذاب و پویا درعین حال ساده و امن برای کاربران از اهمیت خاصی برخوردار است.
                </p>
                <p className="content_text">بطور کلی مخاطبین و جامعه کاربری قارون عموم مردم و استفاده کنندگان اینترنت بدون محدودیت جغرافیایی میباشند.</p>
                <p className="content_text">مشتریان: افرادی که خریدار محصولات مورد نظر خود در اینترنت اند و بابت آن پول پرداخت میکنند.</p>
                <p className="content_text">فروشندگان: افرادی که کالاهای خود را به مشتریان عرضه مینمایند.</p>
                <p className="content_text">بازاریابان: افرادی که بابت معرفی قارون به دوستان خود و نقشی که در توسعه فروش و بازار دارند،در سود معاملات هریک از دوستانشان با قارون سهیم هستند.</p>
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