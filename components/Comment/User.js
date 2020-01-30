import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../Link";
import dynamic from "next/dynamic";
import fetchData from "../../utils/fetchData";
import Loading from "../Loader/Loading";
import SubmitButton from "../Button/SubmitButton";
import { FaTimes, FaHeart, FaRegHeart, FaReply } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Repeatable from "react-repeatable";
const ChildComment = dynamic({
  loader: () => import("./ChildComment"),
  loading: () => <Loading />,
  ssr: true
});
const User = props => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [childsComments, setChildsComments] = useState([]);
  const [showChild, setShowChild] = useState(true);
  const [replyCount, setReplyCount] = useState(props.replyCount);
  const { commentId, userId, image, message, name, userName, time, productId } = props;
  const [liked, setLiked] = useState(props.liked || false);
  const selected = props.commentId === props.activeKey ? true : false;
  toast.configure({
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  const showChildComments = childsComments.map(com => (
    <ChildComment
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
      setMessage={props.setMessage}
      setParentId={props.setParentId}
      setReplyUserName={props.setReplyUserName}
      setCreateOrReply={props.setCreateOrReply}
      focusOnTextArea={props.focusOnTextArea}
      parentId4Reply={commentId}
    />
  ));
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
  const getChildComments = async () => {
    if (showChild) {
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
        setChildsComments(childsComments.concat(result.data));
        setReplyCount(replyCount - result.data.length);
        setPage(page + 1);
      }
      setLoading(false);
    } else {
      setShowChild(true);
    }
  };
  const holdingComment = () => {
    if (selected) {
      props.setActiveKey(null);
    } else {
      props.setActiveKey(props.commentId);
    }
  };
  return (
    <div className={`col-12 mt-2 p-0 user ${selected ? " _selected" : ""}`}>
      <Repeatable repeatCount={1} repeatDelay={800} onHold={holdingComment}>
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
              <div className="col-2 pl-0 pr-2 text-center heart">
                {loading ? <Loading /> : liked ? <FaHeart className="font_icon red" onClick={likeToggle} /> : <FaRegHeart className="font_icon" onClick={likeToggle} />}
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
                {(replyCount > 0 || !showChild) && (
                  <div className="show_replies" onClick={getChildComments}>
                    +++ نمایش پاسخ ها ({replyCount})
                  </div>
                )}
                {childsComments.length > 0 && replyCount <= 0 && showChild && (
                  <div className="show_replies _hide" onClick={() => setShowChild(false)}>
                    --- پنهان کردن پاسخ ها
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Comment Childs */}
          {showChild && showChildComments}
          {/* End Of Childs */}
        </div>
      </Repeatable>
    </div>
  );
};
export default memo(User);