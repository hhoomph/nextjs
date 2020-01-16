import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../components/Link";
import dynamic from "next/dynamic";
import Loading from "../components/Loader/Loading";
import Auth from "../components/Auth/Auth";
import { useRouter } from "next/router";
import fetchData from "../utils/fetchData";
import SubmitButton from "../components/Button/SubmitButton";
import { FaArrowRight, FaArrowLeft, FaTimes, FaFileUpload } from "react-icons/fa";
import { numberSeparator, removeSeparator } from "../utils/tools";
import { ToastContainer, toast } from "react-toastify";
import "../scss/components/ticket.scss";
const Nav = dynamic({
  loader: () => import("../components/Nav/Nav"),
  loading: () => <Loading />,
  ssr: true
});
const Ticket = dynamic({
  loader: () => import("../components/Ticket/Ticket"),
  loading: () => <Loading />,
  ssr: true
});
const Page = props => {
  const Router = useRouter();
  const parentId = Router.query.id;
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [page, setPage] = useState(2);
  const [isFetching, setIsFetching] = useState(false);
  const [createOrReply, setCreateOrReply] = useState(0);
  const [replyUserName, setReplyUserName] = useState(null);
  console.log(props.Response.data);
  //
  const [messages, setMessages] = useState(props.Response.data !== undefined && props.Response.data.model !== undefined ? props.Response.data.model : []);
  const ParentId = "";
  const [content, setContent] = useState("");
  const fileInput = useRef();
  const textRef = useRef();
  const focusOnTextArea = () => {
    textRef.current.focus();
  };
  toast.configure({
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  //const showComments = messages.map(tik => <Ticket key={tik.ticketId} ticketId={tik.ticketId} focusOnTextArea={focusOnTextArea} />);
  const answerTicket = async () => {
    toast.dismiss();
    const errs = [];
    const formData = new FormData();
    formData.append("ParentId", ParentId);
    if (content.trim() === "") {
      errs.push("لطفا متن تیکت را مشخص کنید.");
    } else {
      formData.append("Content", content);
    }
    const types = ["image/png", "image/jpeg", "image/gif"];
    const files = Array.from(fileInput.current.files);
    if (files.length > 5) {
      return toast.warn("تنها امکان آپلود 5 فایل همزمان وجود دارد.");
    }
    files.forEach((file, i) => {
      if (types.every(type => file.type !== type)) {
        errs.push(`فرمت '${file.type}' پشتیبانی نمی شود.`);
      }
      if (file.size > 2550000) {
        errs.push(`حجم فایل '${file.name}' بیشتر از حد مجاز است، لطفا فایل کم حجم تری انتخاب کنید.`);
      }
      //formData.append(`Files${i}`, file);
    });
    if (errs.length) {
      return errs.forEach(err => toast.warn(err));
    }
    formData.append("Files", files);
    setLoading(true);
    const result = await fetchData(
      "User/U_Support/CreateTicketAnswer",
      {
        method: "POST",
        body: formData
      },
      props.ctx,
      true
    );
    if (result.isSuccess) {
      fileInput.current.value = "";
      setContent("");
      toast.success("تیکت شما با موفقیت ثبت شد.");
      setPage(1);
      setTimeout(() => setIsFetching(false), 200);
    } else if (result.message != undefined) {
      toast.warn(result.message);
    } else if (result.error != undefined) {
      toast.error(result.error);
    }
    setLoading(false);
  };
  const getTickets = async () => {
    const Response = await fetchData(
      "User/U_Support/GetTicketResponse",
      {
        method: "POST",
        body: JSON.stringify({
          ticketStatus: "All",
          parentId: parentId,
          page: 1,
          pageSize: 10
        })
      },
      props.ctx
    );
    if (Response.isSuccess) {
      console.log(Response.data);
    }
  };
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 60 < document.documentElement.offsetHeight || isFetching) return;
    setIsFetching(true);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (!isFetching) return;
  }, [isFetching]);
  useEffect(() => {
    getTickets();
    focusOnTextArea();
  }, []);
  return (
    <>
      <title>قارون</title>
      <Nav _tkn={props._tkn} statusHub={props.statusHub} />
      <div className="container pb-0 pr-0 ticket_head">
        <div className="row p-2 cart_title">
          <div className="col-1 align-self-center pr-2" onClick={() => Router.back()}>
            <FaArrowLeft className="font_icon back_icon" />
          </div>
          <div className="col-10 p-0 text-center align-self-center">
            <h5 className="mr-0 ml-2 mt-1 page_title">موضوع تیکت</h5>
          </div>
        </div>
      </div>
      <div className="container pb-5 rtl ticket_page">
        <div className="row pb-5 mb-5">
          <div className="col-12 mt-2 _ticket">
            <div className="row">
              <div className="col-2 d-flex justify-content-center align-self-center">
                <a className="user_img">
                  <img src="/static/img/user.jpg" />
                </a>
              </div>
              <div className="col-10 pl-0 pr-2">
                <div className="row m-auto p-0 justify-content-end">
                  <div className="col-12 p-0 rtl content">
                    <a className="user_name">user name USER_NAME</a>
                    <div className="message">
                      متن پیام متن پیام تست دمو متن پیام متن پیام تست دمو متن پیام متن پیام تست دمو متن پیام متن پیام تست دمو متن پیام متن پیام تست دمو متن پیام متن پیام تست دمو متن پیام متن پیام تست
                      دمو متن پیام متن پیام تست دمو
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 pl-5 mt-2 text-left attach_files">
                <img className="file" src="/static/img/product.png" />
                <img className="file" src="/static/img/product2.png" />
                <img className="file" src="/static/img/product5.jpg" />
                <img className="file" src="/static/img/product6.jpg" />
                <img className="file" src="/static/img/user.png" />
              </div>
              <div className="col-12 text-center">
                <div className="time ml-2">29 دی ماه 1398 ساعت 10 و نیم</div>
              </div>
              <div className="col-12">
                <hr />
              </div>
            </div>
          </div>
          <div className="col-12 mt-2 _ticket _admin">
            <div className="row">
              <div className="col-2 d-flex justify-content-center align-self-center">
                <a className="user_img">
                  <img src="/static/img/user.jpg" />
                </a>
              </div>
              <div className="col-10">
                <div className="row m-auto p-0 justify-content-end">
                  <div className="col-12 p-0 rtl content">
                    <a className="user_name">user name USER_NAME</a>
                    <div className="message">
                      متن پیام متن پیام تست دمو متن پیام متن پیام تست دمو متن پیام متن پیام تست دمو متن پیام متن پیام تست دمو متن پیام متن پیام تست دمو متن پیام متن پیام تست دمو متن پیام متن پیام تست
                      دمو متن پیام متن پیام تست دمو
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 pl-2 mt-2 text-left attach_files">
                <img className="file" src="/static/img/product.png" />
                <img className="file" src="/static/img/product2.png" />
                <img className="file" src="/static/img/product5.jpg" />
                <img className="file" src="/static/img/product6.jpg" />
                <img className="file" src="/static/img/user.png" />
              </div>
              <div className="col-12 text-center">
                <div className="time ml-2">29 دی ماه 1398 ساعت 10 و نیم</div>
              </div>
              <div className="col-12">
                <hr />
              </div>
            </div>
          </div>
          {loading2 && (
            <div className="col-12 mt-2 p-0 _ticket">
              <Loading />
            </div>
          )}
        </div>
        <div className="row reply_to_notify" hidden={createOrReply === 0}>
          <FaTimes
            className="font_icon"
            onClick={() => {
              setCreateOrReply(0);
              setContent("");
            }}
          />
          <p> پاسخ دادن به نظر @{replyUserName}</p>
        </div>
        <div className="row fixed-bottom input_text">
          <div className="col-12">
            <div className="row p-3">
              <textarea type="text" className="form-control col-9" placeholder="متن پیام" ref={textRef} value={content} onChange={e => setContent(e.target.value)} />
              <input type="file" accept="image/*" ref={fileInput} multiple={true} hidden={true} />
              <div className="btn btn_main file_upload_btn" onClick={() => fileInput.current.click()}>
                <FaFileUpload className="font_icon" />
              </div>
              <div className="col-2 align-self-center">
                <SubmitButton loading={loading} text="ارسال" className="btn btn-main send_comment" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
Page.getInitialProps = async function(context) {
  const { id } = context.query;
  const Response = await fetchData(
    "User/U_Support/GetTicketResponse",
    {
      method: "POST",
      body: JSON.stringify({
        ticketStatus: "All",
        parentId: id,
        page: 1,
        pageSize: 10
      })
    },
    context
  );
  return { Response };
};
export default Auth(Page);