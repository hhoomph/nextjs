import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../components/Link";
import dynamic from "next/dynamic";
import Loading from "../components/Loader/Loading";
import Auth from "../components/Auth/Auth";
import { useRouter } from "next/router";
import fetchData from "../utils/fetchData";
import SubmitButton from "../components/Button/SubmitButton";
import { FaArrowLeft, FaPlusCircle, FaFileUpload } from "react-icons/fa";
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
const ticket = props => {
  const Router = useRouter();
  return (
    <div
      className="col-12 mt-2 p-0 pt-1 ticket_row"
      onClick={() =>
        Router.push({
          pathname: "/ticket",
          query: { id: "ticketId" }
        })
      }
    >
      <div className="row">
        <div className="col-2 align-self-center">
          <a className="ticket_icon">
            <MdHeadsetMic className="font_icon" />
          </a>
        </div>
        <div className="col-10 p-0">
          <div className="row m-auto p-0 pl-2 justify-content-start">
            <div className="col-10 p-0 rtl content">
              <div className="subject">موضوع تیکت موضوع مشکل یا مسئله</div>
              <div className="status ml-2">
                <span className="badge badge-warning">در انتظار پاسخ</span>
              </div>
              <div className="time ml-2">29 دی ماه 1398</div>
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
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      console.log();
    }
  };
  const addTicket = async () => {
    toast.dismiss();
    const errs = [];
    const formData = new FormData();
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
      formData.append(`Files${i}`, file);
    });
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
      <Nav />
      <div className="container pb-0 pr-0 ticket_head">
        <div className="row p-2 cart_title">
          <div className="col-1 align-self-center pr-2" onClick={() => Router.back()}>
            <FaArrowLeft className="font_icon back_icon" />
          </div>
          <div className="col-5 p-0 text-right align-self-center">
            <MdAddBox className="font_icon add_ticket" title="افزودن تیکت" onClick={() => setModalShow(true)} />
          </div>
          <div className="col-5 p-0 text-center align-self-center">
            <h5 className="mr-0 ml-2 mt-1 page_title">پشتیبانی</h5>
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
              <input type="file" accept="image/*" onChange={onSelectFile} ref={fileInput} hidden={true} />
              <div className="btn btn_main file_upload_btn" onClick={() => fileInput.current.click()}>
                <FaFileUpload className="font_icon" />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <SubmitButton loading={loading} onClick={addTicket} text="ثبت تیکت" className="d-inline-block btn-main">
            <FaPlusCircle className="font_icon" />
          </SubmitButton>
        </Modal.Footer>
      </Modal>
      <div className="container pb-5 rtl ticket_page">
        <div className="row pl-1 pr-1 pb-5 mb-5">
          <div className="col-12 mt-2 p-0 pt-1 ticket_row">
            <div className="row">
              <div className="col-2 align-self-center">
                <a className="ticket_icon">
                  <MdHeadsetMic className="font_icon" />
                </a>
              </div>
              <div className="col-10 p-0">
                <div className="row m-auto p-0 pl-2 justify-content-start">
                  <div className="col-10 p-0 rtl content">
                    <div className="subject">موضوع تیکت موضوع مشکل یا مسئله</div>
                    <div className="status ml-2">
                      <span className="badge badge-warning">در انتظار پاسخ</span>
                    </div>
                    <div className="time ml-2">29 دی ماه 1398</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-2 p-0 pt-1 ticket_row">
            <div className="row">
              <div className="col-2 align-self-center">
                <a className="ticket_icon">
                  <MdHeadsetMic className="font_icon" />
                </a>
              </div>
              <div className="col-10 p-0">
                <div className="row m-auto p-0 pl-2 justify-content-start">
                  <div className="col-10 p-0 rtl content">
                    <div className="subject">موضوع تیکت موضوع مشکل یا مسئله</div>
                    <div className="status ml-2">
                      <span className="badge badge-warning">در انتظار پاسخ</span>
                    </div>
                    <div className="time ml-2">29 دی ماه 1398</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-2 p-0 pt-1 ticket_row">
            <div className="row">
              <div className="col-2 align-self-center">
                <a className="ticket_icon">
                  <MdHeadsetMic className="font_icon" />
                </a>
              </div>
              <div className="col-10 p-0">
                <div className="row m-auto p-0 pl-2 justify-content-start">
                  <div className="col-10 p-0 rtl content">
                    <div className="subject">موضوع تیکت موضوع مشکل یا مسئله</div>
                    <div className="status ml-2">
                      <span className="badge badge-warning">در انتظار پاسخ</span>
                    </div>
                    <div className="time ml-2">29 دی ماه 1398</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-2 p-0 pt-1 ticket_row">
            <div className="row">
              <div className="col-2 align-self-center">
                <a className="ticket_icon">
                  <MdHeadsetMic className="font_icon" />
                </a>
              </div>
              <div className="col-10 p-0">
                <div className="row m-auto p-0 pl-2 justify-content-start">
                  <div className="col-10 p-0 rtl content">
                    <div className="subject">موضوع تیکت موضوع مشکل یا مسئله</div>
                    <div className="status ml-2">
                      <span className="badge badge-warning">در انتظار پاسخ</span>
                    </div>
                    <div className="time ml-2">29 دی ماه 1398</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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