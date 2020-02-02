import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../components/Link";
import dynamic from "next/dynamic";
import Loading from "../components/Loader/Loading";
import Auth from "../components/Auth/Auth";
import { useRouter } from "next/router";
import fetchData from "../utils/fetchData";
import SubmitButton from "../components/Button/SubmitButton";
import { FaArrowRight, FaArrowLeft, FaTimes } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { numberSeparator, removeSeparator } from "../utils/tools";
import { ToastContainer, toast } from "react-toastify";
import "../scss/components/commentPage.scss";
const Nav = dynamic({
  loader: () => import("../components/Nav/Nav"),
  loading: () => <Loading />,
  ssr: true
});
const User = dynamic({
  loader: () => import("../components/Comment/User"),
  loading: () => <Loading />,
  ssr: true
});
const Page = props => {
  const Router = useRouter();
  const productId = Router.query.id;
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const firstComments = props.Comments.data || [];
  const [comments, setComments] = useState(firstComments);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(2);
  const [isFetching, setIsFetching] = useState(false);
  const [parentId, setParentId] = useState(null);
  const [createOrReply, setCreateOrReply] = useState(0);
  const [replyUserName, setReplyUserName] = useState(null);
  const [activeKey, setActiveKey] = useState(null);
  const currentUserId = props.Profile !== undefined && props.Profile.data && props.Profile.data !== null && props.Profile.data.id !== undefined ? props.Profile.data.id : null;
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
  const showComments = comments.map(com => (
    <User
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
      replyMessage={message}
      setMessage={setMessage}
      focusOnTextArea={focusOnTextArea}
      activeKey={activeKey}
      setActiveKey={setActiveKey}
      currentUserId={currentUserId}
    />
  ));
  const deleteHoldingComment = async () => {
    if (activeKey !== null && activeKey !== "") {
      const commentId = activeKey;
      setLoading2(true);
      const result = await fetchData(
        `User/U_Comment/Delete?commentId=${commentId}`,
        {
          method: "GET"
        },
        props.ctx
      );
      if (result !== undefined && result.isSuccess) {
        setActiveKey(null);
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
          setComments([]);
          setComments(result2.data);
          setPage(2);
          if (result2.data.length >= 10) {
            setTimeout(() => setIsFetching(false), 200);
          }
        }
      } else if (result !== undefined && result.Message != undefined) {
        toast.warn(result.Message);
      } else if (result !== undefined && result.error != undefined) {
        toast.error(result.error);
      }
      setLoading2(false);
    } else {
      toast.warn("لطفا یک نظر را انتخاب کنید.");
    }
  };
  const sendComment = async () => {
    if (message.trim() !== "") {
      if (createOrReply === 0) {
        setLoading(true);
        const result = await fetchData(
          "User/U_Comment/AddComment",
          {
            method: "POST",
            body: JSON.stringify({
              productId: productId,
              message: message
            })
          },
          props.ctx
        );
        if (result !== undefined && result.isSuccess) {
          setPage(1);
          setMessage("");
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
            setComments([]);
            setComments(result2.data);
            setPage(2);
            if (result2.data.length >= 10) {
              setTimeout(() => setIsFetching(false), 200);
            }
          }
          setLoading2(false);
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
              message: message
            })
          },
          props.ctx
        );
        if (result !== undefined && result.isSuccess) {
          setMessage("");
          setCreateOrReply(0);
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
            setComments([]);
            setComments(result2.data);
            setPage(2);
            if (result2.data.length >= 10) {
              setTimeout(() => setIsFetching(false), 200);
            }
          }
          setLoading2(false);
        } else if (result !== undefined && result.message != undefined) {
          toast.warn(result.message);
        } else if (result !== undefined && result.error != undefined) {
          toast.error(result.error);
        }
        setLoading(false);
      }
    } else {
      toast.warn("لطفا نظر خود را بنویسید.");
    }
  };
  const getComments = async () => {
    setLoading2(true);
    const result = await fetchData(
      "User/U_Comment/GetComments",
      {
        method: "POST",
        body: JSON.stringify({
          productId: productId,
          page: page,
          pageSize: 10
        })
      },
      props.ctx
    );
    if (result !== undefined && result.isSuccess) {
      if (page === 1) {
        setComments(result.data);
        if (result.data.length > 0) {
          setActiveKey(result.data[0].commentId);
        }
      } else {
        setComments(comments.concat(result.data));
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
    getComments();
  }, [isFetching]);
  useEffect(() => {
    focusOnTextArea();
  }, []);
  return (
    <>
      <title>قارون</title>
      <Nav _tkn={props._tkn} />
      <div className="container pb-0 comment_head">
        <div className="row p-2 cart_title">
          <div className="col-1 p-0 text-left align-self-center">{activeKey !== null ? <AiOutlineDelete className="font_icon trash_icon" title="حذف" onClick={deleteHoldingComment} /> : ""}</div>
          <div className="col-9 p-0 text-center align-self-center">
            <h5 className="ml-3 pl-3 mt-1 page_title">نظرات</h5>
          </div>
          <div className="col-2 text-right align-self-center pr-1" onClick={() => Router.back()}>
            <FiChevronRight className="font_icon back_icon" />
          </div>
        </div>
      </div>
      <div className="container pb-5 rtl comment_page" onClick={() => setActiveKey(null)}>
        <div className="row pl-1 pr-1 pb-5 mb-5">
          {/* <User
            id={1}
            type={"invite"}
            image={"/static/img/user.jpg"}
            followed={false}
            productImage={"/static/img/product5.jpg"}
            productId={"1"}
            message={"متن پیام متن پیام"}
            name={"نام نمایشی"}
            userName={"user_name_UserName"}
            time={"2 هفته"}
          /> */}
          {showComments}
          {loading2 && (
            <div className="col-12 mt-2 p-0 user">
              <Loading />
            </div>
          )}
        </div>
        <div className="row reply_to_notify" hidden={createOrReply === 0}>
          <FaTimes
            className="font_icon"
            onClick={() => {
              setCreateOrReply(0);
              setMessage("");
            }}
          />
          <p> پاسخ دادن به نظر @{replyUserName}</p>
        </div>
        <div className="row fixed-bottom input_text">
          <div className="col-12">
            <div className="row p-4">
              <textarea type="text" className="form-control col-9" placeholder="متن نظر" ref={textRef} value={message} onChange={e => setMessage(e.target.value)} />
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
  const Comments = await fetchData(
    "User/U_Comment/GetComments",
    {
      method: "POST",
      body: JSON.stringify({
        productId: id,
        page: 1,
        pageSize: 10
      })
    },
    context
  );
  // Get Current User Info
  const Profile = await fetchData(
    "User/U_Account/Profile",
    {
      method: "GET"
    },
    context
  );
  return { Comments, Profile };
};
export default Auth(Page);