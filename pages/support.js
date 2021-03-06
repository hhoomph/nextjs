import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../components/Link";
import dynamic from "next/dynamic";
import Loading from "../components/Loader/Loading";
import Auth from "../components/Auth/Auth";
import { useRouter } from "next/router";
import fetchData from "../utils/fetchData";
import SubmitButton from "../components/Button/SubmitButton";
import { FaArrowLeft, FaPlusCircle, FaFileUpload } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { MdAddBox } from "react-icons/md";
import { numberSeparator, removeSeparator } from "../utils/tools";
import { ToastContainer, toast } from "react-toastify";
import { MdHeadsetMic } from "react-icons/md";
import { Modal } from "react-bootstrap";
import "../scss/components/ticket.scss";
const Nav = dynamic({
  loader: () => import("../components/Nav/Nav"),
  loading: () => <Loading />,
  ssr: true
});
const Ticket = props => {
  const Router = useRouter();
  return (
    <div
      className="col-12 mt-2 p-0 pt-1 ticket_row"
      onClick={() =>
        Router.push({
          pathname: "/ticket",
          query: { id: props.ticketId }
        })
      }
    >
      <div className="row">
        <div className="col-2 col-md-1 align-self-center">
          <a className="ticket_icon">
            <MdHeadsetMic className="font_icon" />
          </a>
        </div>
        <div className="col-10 p-0">
          <div className="row m-auto p-0 pl-2 justify-content-start">
            <div className="col-10 p-0 rtl content">
              <div className="subject">{props.subject}</div>
              <div className="status ml-2">{props.adminAnswered ? <span className="badge badge-success">پاسخ داده شده</span> : <span className="badge badge-warning">در انتظار پاسخ</span>}</div>
              <div className="time ml-2">{props.insertDateP}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Page = props => {
  const Router = useRouter();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [tickets, setTickets] = useState(props.Tickets.data.model || []);
  const [modalShow, setModalShow] = useState(false);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const fileInput = useRef();
  toast.configure({
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  const showTickets = tickets.map(t => (
    <Ticket
      key={t.ticketId}
      ticketId={t.ticketId}
      subject={t.subject}
      content={t.content}
      insertDateP={t.insertDateP}
      filesUrl={t.filesUrl}
      adminAnswered={t.adminAnswered}
      userAnswered={t.userAnswered}
      userViewed={t.userViewed}
      adminViewed={t.adminViewed}
      senderName={t.senderName}
      senderId={t.senderId}
      senderType={t.senderType}
    />
  ));
  const addTicket = async () => {
    // toast.dismiss();
    // const errs = [];
    // const formData = new FormData();
    // if (subject.trim() === "") {
    //   errs.push("لطفا موضوع تیکت را مشخص کنید.");
    // } else {
    //   formData.append("Subject", subject);
    // }
    // if (content.trim() === "") {
    //   errs.push("لطفا متن تیکت را مشخص کنید.");
    // } else {
    //   formData.append("Content", content);
    // }
    // const types = ["image/png", "image/jpeg", "image/gif"];
    // const files = Array.from(fileInput.current.files);
    // if (files.length > 1) {
    //   return toast.warn("تنها امکان آپلود 1 فایل همزمان وجود دارد.");
    // }
    // files.forEach((file, i) => {
    //   if (types.every(type => file.type !== type)) {
    //     errs.push(`فرمت '${file.type}' پشتیبانی نمی شود.`);
    //   }
    //   if (file.size > 2550000) {
    //     errs.push(`حجم فایل '${file.name}' بیشتر از حد مجاز است، لطفا فایل کم حجم تری انتخاب کنید.`);
    //   }
    //   //formData.append(`Files${i}`, file);
    // });
    // if (errs.length) {
    //   return errs.forEach(err => toast.warn(err));
    // }
    // formData.append("File", files[0]);
    // // const fileList = [];
    // // for (let i = 0; i < fileInput.current.files.length; i++) {
    // //   fileList.push(fileInput.current.files[i]);
    // //   console.log(fileInput.current.files[i]);
    // // }
    // setLoading(true);
    // const result = await fetchData(
    //   "User/U_Support/Create",
    //   {
    //     method: "POST",
    //     body: formData
    //     // body: JSON.stringify({
    //     //   Subject: subject,
    //     //   Content: content,
    //     //   File : files[0]
    //     // })
    //   },
    //   props.ctx,
    //   true
    // );
    // if (result.isSuccess) {
    //   setModalShow(false);
    //   fileInput.current.value = "";
    //   setSubject("");
    //   setContent("");
    //   toast.success("تیکت شما با موفقیت ثبت شد.");
    //   setPage(1);
    //   setTimeout(() => setIsFetching(false), 200);
    //   getTickets();
    // } else if (result.message != undefined) {
    //   toast.warn(result.message);
    // } else if (result.error != undefined) {
    //   toast.error(result.error);
    // }
    // setLoading(false);
    toast.dismiss();
    const errs = [];
    const file = fileInput.current.files[0];
    try {
      fileInput.current.value = "";
      const formData = new FormData();
      const types = ["image/png", "image/jpeg", "image/gif"];
      if (types.every(type => file.type !== type)) {
        errs.push(`فرمت '${file.type}' پشتیبانی نمی شود.`);
      }
      if (file.size > 4550000) {
        errs.push(`حجم فایل '${file.name}' بیشتر از حد مجاز است، لطفا فایل کم حجم تری انتخاب کنید.`);
      }
      formData.append("File", file);
      if (subject.trim() === "") {
        errs.push("لطفا موضوع تیکت را مشخص کنید.");
      } else {
        formData.append("Subject", subject);
      }
      if (content.trim() === "") {
        errs.push("لطفا متن تیکت را مشخص کنید.");
      } else {
        formData.append("Content", content);
      }
      if (errs.length) {
        return errs.forEach(err => toast.warn(err));
      }
      setLoading(true);
      const result = await fetchData(
        "User/U_Support/Create",
        {
          method: "POST",
          body: formData
        },
        props.ctx,
        true
      );
      if (result.isSuccess) {
        setModalShow(false);
        fileInput.current.value = "";
        setSubject("");
        setContent("");
        toast.success("تیکت شما با موفقیت ثبت شد.");
        setPage(1);
        setTimeout(() => setIsFetching(false), 200);
        getTickets();
      } else if (result.message != undefined) {
        toast.warn(result.message);
      } else if (result.error != undefined) {
        toast.error(result.error);
      }
      setLoading(false);
    } catch (e) {
      toast.warn("متاسفانه خطایی رخ داده است.");
      console.error(e);
    }
  };
  const getTickets = async () => {
    setLoading(true);
    const result = await fetchData(
      "User/U_Support/GetAll",
      {
        method: "POST",
        body: JSON.stringify({
          page: 1,
          pageSize: 10
        })
      },
      props.ctx
    );
    if (result !== undefined && result.isSuccess) {
      if (page === 1) {
        setTickets(result.data.model);
      } else {
        setTickets(tickets.concat(result.data.model));
      }
      if (result.data.model.length >= 10) {
        setPage(page + 1);
        setTimeout(() => setIsFetching(false), 200);
      }
    } else if (result.message != undefined) {
      setTimeout(() => setIsFetching(false), 200);
    } else if (result.error != undefined) {
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
  return (
    <>
      <title>قارون</title>
      <Nav _tkn={props._tkn} />
      <div className="container pb-0 pr-1 ticket_head">
        <div className="row p-2 cart_title">
          <div className="col-3 p-0 text-left align-self-center">
            <MdAddBox className="font_icon add_ticket" title="افزودن تیکت" onClick={() => setModalShow(true)} />
          </div>
          <div className="col-6 p-0 text-center align-self-center">
            <h5 className="mr-0 ml-2 mt-1 page_title">پشتیبانی</h5>
          </div>
          <div className="col-3 text-right align-self-center" onClick={() => Router.back()}>
            <FiChevronRight className="font_icon back_icon" />
          </div>
        </div>
      </div>
      {/* Add Ticket Modal */}
      <Modal onHide={() => setModalShow(false)} show={modalShow} size="xl" scrollable className="share_modal">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">ایجاد تیکت جدید</Modal.Title>
        </Modal.Header>
        <Modal.Body className="add_ticket">
          <div className="col-12 p-0 rtl d-flex align-items-center">
            <label className="col-4 col-form-label text-left pr-0 pl-0">موضوع تیکت :</label>
            <div className="col-8 pr-0 pl-1">
              <input value={subject} onChange={e => setSubject(e.target.value)} type="text" className="form-control" placeholder="موضوع تیکت" />
            </div>
          </div>
          <div className="col-12 mt-2 p-0 rtl d-flex align-items-center">
            <label className="col-4 col-form-label text-left pr-0 pl-0">متن تیکت :</label>
            <div className="col-8 pr-0 pl-1">
              <textarea value={content} onChange={e => setContent(e.target.value)} className="form-control" placeholder="متن تیکت" />
            </div>
          </div>
          <div className="col-12 mt-2 p-0 rtl d-flex align-items-center">
            <label className="col-4 col-form-label text-left pr-0 pl-0">فایل ضمیمه:</label>
            <div className="col-8 text-center p-0">
              <input type="file" accept="image/*" multiple={true} ref={fileInput} hidden={true} />
              <div className="btn btn_main file_upload_btn" onClick={() => fileInput.current.click()}>
                <FaFileUpload className="font_icon" />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <SubmitButton loading={loading} onClick={addTicket} text="ثبت تیکت" className="d-inline-block btn-main btn-green">
            <FaPlusCircle className="font_icon" />
          </SubmitButton>
        </Modal.Footer>
      </Modal>
      <div className="container pb-5 rtl ticket_page">
        <div className="row pl-1 pr-1 pb-5 mb-5">
          {showTickets}
          {loading && (
            <div className="col-12 mt-2 p-0 user">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
Page.getInitialProps = async function(context) {
  const Tickets = await fetchData(
    "User/U_Support/GetAll",
    {
      method: "POST",
      body: JSON.stringify({
        page: 1,
        pageSize: 10
      })
    },
    context
  );
  return { Tickets };
};
export default Auth(Page);