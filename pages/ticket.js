import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../components/Link";
import dynamic from "next/dynamic";
import Loading from "../components/Loader/Loading";
import Auth from "../components/Auth/Auth";
import { useRouter } from "next/router";
import fetchData from "../utils/fetchData";
import SubmitButton from "../components/Button/SubmitButton";
import { FaArrowRight, FaArrowLeft, FaTimes } from "react-icons/fa";
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
  const productId = Router.query.id;
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [page, setPage] = useState(2);
  const [isFetching, setIsFetching] = useState(false);
  const [parentId, setParentId] = useState(null);
  const [createOrReply, setCreateOrReply] = useState(0);
  const [replyUserName, setReplyUserName] = useState(null);
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
  const showComments = messages.map(com => (
    <Ticket
      key={com.commentId}
      commentId={com.commentId}
      userId={com.userId}
      image={com.userAvatar !== undefined && com.userAvatar !== null ? `https://api.qarun.ir/${com.userAvatar}` : "/static/img/no-userimage.png"}
      liked={com.liked}
      productImage={"/static/img/product5.jpg"}
      productId={productId}
      message={com.content}
      name={com.senderDisplayName}
      userName={com.senderUserName}
      time={com.insertDateP}
      replyCount={com.replyCount}
      setParentId={setParentId}
      setCreateOrReply={setCreateOrReply}
      setReplyUserName={setReplyUserName}
      focusOnTextArea={focusOnTextArea}
    />
  ));
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
      formData.append(`Files${i}`, file);
    });
    if (errs.length) {
      return errs.forEach(err => toast.warn(err));
    }
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
      getMessages();
    } else if (result.message != undefined) {
      toast.warn(result.message);
    } else if (result.error != undefined) {
      toast.error(result.error);
    }
    setLoading(false);
  };
  const sendComment = async () => {
    if (content.trim() !== "") {
      if (createOrReply === 0) {
        setLoading(true);
        const result = await fetchData(
          "User/U_Comment/AddComment",
          {
            method: "POST",
            body: JSON.stringify({
              productId: productId,
              message: content
            })
          },
          props.ctx
        );
        if (result !== undefined && result.isSuccess) {
          setPage(1);
          setContent("");
          //getComments();
          setLoading2(true);
          const result2 = await fetchData(
            "User/U_Comment/GetComments",
            {
              method: "POST",
              body: JSON.stringify({
                productId: productId,
                page: 1,
                pageSize: 10
              })
            },
            props.ctx
          );
          if (result2 !== undefined && result2.isSuccess) {
            document.documentElement.scrollTop = 0;
            setMessages(result2.data);
            setPage(2);
            if (result2.data.length >= 10) {
              setTimeout(() => setIsFetching(false), 200);
            }
          }
        } else if (result !== undefined && result.message != undefined) {
          toast.warn(result.message);
        } else if (result !== undefined && result.error != undefined) {
          toast.error(result.error);
        }
        setLoading(false);
      } else if (createOrReply === 1 && parentId !== null) {
        setLoading(true);
        const result = await fetchData(
          "User/U_Comment/ReplyComment",
          {
            method: "POST",
            body: JSON.stringify({
              parentId: parentId,
              message: content
            })
          },
          props.ctx
        );
        if (result !== undefined && result.isSuccess) {
          setContent("");
          setCreateOrReply(0);
        } else if (result !== undefined && result.message != undefined) {
          toast.warn(result.message);
        } else if (result !== undefined && result.error != undefined) {
          toast.error(result.error);
        }
        setLoading(false);
      }
    } else {
      toast.warn("لطفا متن پیام خود را بنویسید.");
    }
  };
  const getMessages = async () => {
    setLoading2(true);
    const result = await fetchData(
      "User/U_Support/GetTicketResponse",
      {
        method: "POST",
        body: JSON.stringify({
          ticketStatus: "",
          parentId: "id",
          page: page,
          pageSize: 10
        })
      },
      props.ctx
    );
    if (result !== undefined && result.isSuccess) {
      if (page === 1) {
        setMessages(result.data);
      } else {
        setMessages(messages.concat(result.data));
      }
      setPage(page + 1);
      if (result.data.length >= 10) {
        setTimeout(() => setIsFetching(false), 200);
      }
    } else if (result !== undefined && result.message != undefined) {
      setTimeout(() => setIsFetching(false), 200);
    } else if (result !== undefined && result.error != undefined) {
      setTimeout(() => setIsFetching(false), 200);
    }
    setLoading2(false);
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
    getMessages();
  }, [isFetching]);
  useEffect(() => {
    focusOnTextArea();
  }, []);
  return (
    <>
      <Nav />
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
                      متن پیام متن پیام تست دمو متن پیام متن پیام تست دمو متن پیام متن پیام تست دمو متن پیام متن پیام تست دمو متن پیام متن پیام تست دمو متن پیام
                      متن پیام تست دمو متن پیام متن پیام تست دمو متن پیام متن پیام تست دمو
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
                      متن پیام متن پیام تست دمو متن پیام متن پیام تست دمو متن پیام متن پیام تست دمو متن پیام متن پیام تست دمو متن پیام متن پیام تست دمو متن پیام
                      متن پیام تست دمو متن پیام متن پیام تست دمو متن پیام متن پیام تست دمو
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
              <textarea
                type="text"
                className="form-control col-9"
                placeholder="متن پیام"
                ref={textRef}
                value={content}
                onChange={e => setContent(e.target.value)}
              />
              <div className="col-2 align-self-center">
                <SubmitButton loading={loading} onClick={sendComment} text="ارسال" className="btn btn-main send_comment" />
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
        ticketStatus: "",
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