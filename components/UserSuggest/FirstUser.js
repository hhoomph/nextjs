import React, { useState, useEffect, memo } from "react";
import Link from "next/link";
import Loading from "../Loader/Loader";
import fetchData from "../../utils/fetchData";
import SubmitButton from "../Button/SubmitButton";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
const FirstUser = props => {
  const [loading, setLoading] = useState(false);
  const [followed, setFollowed] = useState(props.isFollowed);
  const [hide, setHide] = useState(false);
  toast.configure({
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  const showToggle = () => {
    setHide(!hide);
  };
  const followToggle = async () => {
    setLoading(true);
    const result = await fetchData(
      `User/U_Friends/Follow?userId=${props.id}`,
      {
        method: "GET"
      },
      props.ctx
    );
    if (result !== undefined && result.isSuccess) {
      setFollowed(!followed);
    } else if (result !== undefined && result.message != undefined) {
      toast.warn(result.message);
    } else if (result !== undefined && result.error != undefined) {
      toast.error(result.error);
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
    }
    setLoading(false);
  };
  return (
    <div className="col-5 col-lg-2 user" hidden={hide}>
      <div className="user_frame">
        <Link href={`/user/${props.userName}`} passHref>
          <a className="user_link">
            <img src={props.image} alt={props.alt} className="user_img" />
          </a>
        </Link>
        <a className="user_close" onClick={showToggle}>
          <FaTimes className="font_Icons" />
        </a>
        <div className="user_text mb-1">
          <p className="user_name">{props.userName}</p>
          <p className="user_display_name">{props.displayName}</p>
        </div>
        <div className={"user_follow"}>
          {followed ? (
            <SubmitButton loading={loading} onClick={() => unFollowToggle()} text="لغو دنبال" className="btn btn-main unfollow" />
          ) : (
            <SubmitButton loading={loading} onClick={() => followToggle()} text="دنبال کردن" className="btn btn-main follow" />
          )}
        </div>
      </div>
    </div>
  );
};
export default memo(FirstUser);