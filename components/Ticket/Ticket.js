import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../Link";
import dynamic from "next/dynamic";
import fetchData from "../../utils/fetchData";
import Loading from "../Loader/Loading";
import SubmitButton from "../Button/SubmitButton";
import { FaTimes, FaHeart, FaRegHeart, FaReply } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
const Ticket = props => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [replyCount, setReplyCount] = useState(props.replyCount);
  const { commentId, userId, image, message, name, userName, time, productId } = props;
  const [liked, setLiked] = useState(props.liked || false);
  toast.configure({
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  const likeToggle = async () => {
    setLoading(true);
    const result = await fetchData(
      `User/U_Comment/LikeOrUnLikeComment?commentId=${commentId}`,
      {
        method: "GET"
      },
      props.ctx
    );
    if (result.isSuccess) {
      setLiked(!liked);
    }
    setLoading(false);
  };
  const sendReply = () => {
    props.setMessage("");
    props.setParentId(commentId);
    props.setReplyUserName(userName);
    props.setCreateOrReply(1);
    props.focusOnTextArea();
  };
  return (
    <div className="col-12 mt-2 p-0 user">
      <div className="row">
        <div className="col-2">
          <Link href={`/user/${userName}`} passHref>
            <a className="link">
              <img src={image} />
            </a>
          </Link>
        </div>
        <div className="col-10 _txt">
          <div className="row m-auto p-0 justify-content-end">
            <div className="col-2 pl-0 text-center heart">
              {loading ? (
                <Loading />
              ) : liked ? (
                <FaHeart className="font_icon red" onClick={likeToggle} />
              ) : (
                <FaRegHeart className="font_icon" onClick={likeToggle} />
              )}
            </div>
            <div className="col-10 p-0 rtl content">
              <Link href={`/user/${userName}`} passHref>
                <a className="user_name">{userName}</a>
              </Link>
              <div className="message">{message}</div>
              <div className="reply_btn ml-2" onClick={sendReply}>
                پاسخ
                {/* <FaReply className="font_icon" /> */}
              </div>
              <div className="time ml-2">{time}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Ticket);