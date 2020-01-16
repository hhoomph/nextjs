import React, { Fragment, useContext, useState, useEffect, memo } from "react";
import User from "./User";
import Link from "../Link";
import fetchData from "../../utils/fetchData";
import Loading from "../Loader/Loader";
import SubmitButton from "../Button/SubmitButton";
import WindowsWidth from "../WindowsWidth";
import { IoIosMore } from "react-icons/io";
import AppContext from "../../context/context";
import { ToastContainer, toast } from "react-toastify";
import "../../scss/components/userSuggest2.scss";
const UserSuggest = props => {
  const [loading, setLoading] = useState(false);
  const [followed, setFollowed] = useState(props.isFollowed);
  const width = WindowsWidth();
  const userClass = width > 992 ? "p-1 text-center col-2 user_div" : "p-1 text-center col-4 user_div";
  toast.configure({
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
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
    <div className={userClass + (props.active ? " active" : "")} onClick={props.onClick} onTouchStartCapture={props.onTouchStartCapture}>
      <div className="user_link_img">
        <a className="user_link">
          <img src={props.image} alt={props.displayName} className="rounded-circle img-thumbnail" />
        </a>
      </div>
      <Link href={`/user/${props.userName}`} passHref>
        <p className="user_name m-2">{props.userName}</p>
      </Link>
      <Link href={`/user/${props.userName}`} passHref>
        <p className="display_name m-2">{props.displayName}</p>
      </Link>
      {followed ? (
        <SubmitButton loading={loading} onClick={() => unFollowToggle()} text="لغو دنبال" className="btn btn-main mb-2 unfollow" />
      ) : (
        <SubmitButton loading={loading} onClick={() => followToggle()} text="دنبال کردن" className="btn btn-main mb-2 follow" />
      )}
      {/* <a className="btn btn-main mb-2 follow">دنبال کردن</a> */}
    </div>
  );
};
export default memo(UserSuggest);