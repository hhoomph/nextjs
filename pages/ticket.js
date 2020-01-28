import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../components/Link";
import dynamic from "next/dynamic";
import Loading from "../components/Loader/Loading";
import Auth from "../components/Auth/Auth";
import { useRouter } from "next/router";
import fetchData from "../utils/fetchData";
import SubmitButton from "../components/Button/SubmitButton";
import { FaArrowRight, FaArrowLeft, FaTimes, FaFileUpload } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
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
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  console.log(props.Response.data);
  //
  const mainSubject = props.Response.data !== undefined && props.Response.data.model !== undefined && props.Response.data.model[0] !== undefined ? props.Response.data.model[0].subject : "نامشخص";
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
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  const showMesseges = messages.map(tik => {
    const isAdmin = tik.senderType === 2 ? true : false;
    return <Ticket key={tik.ticketId} parentId={tik.parentId} ticketId={tik.ticketId} isAdmin={isAdmin} subject={tik.subject} content={tik.content} insertDateP={tik.insertDateP} filesUrl={tik.filesUrl} adminAnswered={tik.adminAnswered} userAnswered={tik.userAnswered} senderName={tik.senderName} senderEmail={tik.senderEmail} senderPhoneNumber={tik.senderPhoneNumber} senderId={tik.senderId} senderType={tik.senderType} focusOnTextArea={focusOnTextArea} />;
  });
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
    setLoading(true);
    const Response = await fetchData(
      "User/U_Support/GetTicketResponse",
      {
        method: "POST",
        body: JSON.stringify({
          ticketStatus: "All",
          parentId: parentId,
          page: page,
          pageSize: 10
        })
      },
      props.ctx
    );
    if (Response !== undefined && Response.isSuccess) {
      console.log(Response.data);
      if (page === 1) {
        setMessages(Response.data.model);
      } else {
        setMessages(messages.concat(Response.data.model));
      }
      if (Response !== undefined && Response.data.model.length >= 9) {
        setPage(page + 1);
        setTimeout(() => setIsFetching(false), 200);
      }
    } else if (Response !== undefined && Response.message != undefined) {
      setTimeout(() => setIsFetching(false), 200);
    } else if (Response !== undefined && Response.error != undefined) {
      setTimeout(() => setIsFetching(false), 200);
    }
    setLoading(false);
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
    getTickets();
  }, [isFetching]);
  useEffect(() => {
    focusOnTextArea();
  }, []);
  return (
    <>
      <title>قارون</title>
      <Nav _tkn={props._tkn} />
      <div className="container pb-0 pr-0 ticket_head">
        <div className="row p-2 cart_title justify-content-end">
          <div className="col-1 p-0 text-center align-self-center"> </div>
          <div className="col-8 p-0 text-center align-self-center">
            <h6 className="mr-0 ml-2 mt-1 page_title">{mainSubject}</h6>
          </div>
          <div className="col-2 text-right align-self-center pr-4" onClick={() => Router.back()}>
            <FiChevronRight className="font_icon back_icon" />
          </div>
        </div>
      </div>
      <div className="container pb-5 rtl ticket_page">
        <div className="row pb-5 mb-5">
          {showMesseges}
          {loading2 && (
            <div className="col-11 m-auto pt-2 _ticket">
              <Loading />
            </div>
          )}
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