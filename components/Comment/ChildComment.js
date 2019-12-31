import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../Link";
import fetchData from "../../utils/fetchData";
import Loading from "../Loader/Loading";
import SubmitButton from "../Button/SubmitButton";
import { FaTimes, FaHeart, FaRegHeart, FaReply } from "react-icons/fa";
const ChildComment = props => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [childsComments, setChildsComments] = useState([]);
  const { commentId, userId, image, message, name, userName, time, productId, replyCount } = props;
  const [liked, setLiked] = useState(props.liked || false);
  const getChildComments = async (id = null) => {
    setLoading(true);
    const result = await fetchData(
      "User/U_Comment/GetCommentChildren",
      {
        method: "POST",
        body: JSON.stringify({
          parentId: commentId,
          page: page,
          pageSize: 10
        })
      },
      props.ctx
    );
    if (result !== undefined && result.isSuccess) {
      setChildsComments(result.data);
      setPage(page + 1);
    }
    setLoading(false);
  };
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
  return (
    <div className="col-11 d-flex justify-content-center m-auto p-1 user comment_child">
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
            <FaHeart className="font_icon red" />
          </div>
          <div className="col-10 p-0 rtl content">
            <Link href={`/user/${userName}`} passHref>
              <a className="user_name">{userName}</a>
            </Link>
            <div className="message">{message}</div>
            <div className="reply_btn ml-2">پاسخ</div>
            <div className="time ml-2">{time}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(ChildComment);