import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../Link";
import fetchData from "../../utils/fetchData";
import Loading from "../Loader/Loader";
import SubmitButton from "../Button/SubmitButton";
import { FaTimes, FaHeart, FaRegHeart } from "react-icons/fa";
const User = props => {
  const [loading, setLoading] = useState(false);
  const { image, productImage, message, name, userName, time } = props;
  const [followed, setFollowed] = useState(props.followed || false);
  const followToggle = async () => {
    setLoading(true);
    const result = await fetchData(
      `User/U_Friends/Follow?userId=${props.id}`,
      {
        method: "GET"
      },
      props.ctx
    );
    if (result.isSuccess) {
      setFollowed(!followed);
      props.setUpdate(Date());
    }
    setLoading(false);
  };
  const unFollowToggle = async () => {
    setLoading(true);
    const result = await fetchData(
      `User/U_Friends/UnFollow?userId=${props.id}`,
      {
        method: "GET"
      },
      props.ctx
    );
    if (result.isSuccess) {
      setFollowed(!followed);
      props.setUpdate(Date());
    }
    setLoading(false);
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
              <FaRegHeart className="font_icon" />
            </div>
            <div className="col-10 p-0 rtl content">
              <Link href={`/user/${userName}`} passHref>
                <a className="user_name">{userName}</a>
              </Link>
              <div className="message">{message}</div>
              <div className="reply_btn ml-2">پاسخ</div>
              <div className="time ml-2">{time}</div>
              <div className="show_replies">+ نمایش پاسخ ها </div>
            </div>
          </div>
        </div>
        {/* Comment Childs */}
        <div className="col-11 d-flex justify-content-center m-auto p-0 user comment_child">
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
                <FaRegHeart className="font_icon" />
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
        <div className="col-11 d-flex justify-content-center m-auto p-0 user comment_child">
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
                <FaRegHeart className="font_icon" />
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
        <div className="col-11 d-flex justify-content-center m-auto p-0 user comment_child">
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
                <FaRegHeart className="font_icon" />
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
        {/* End Of Childs */}
      </div>
    </div>
  );
};
export default memo(User);