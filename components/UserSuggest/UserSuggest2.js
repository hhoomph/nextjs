import React, { Fragment, useContext, useState, useEffect, memo } from "react";
import User from "./User";
import Link from "../Link";
import fetchData from "../../utils/fetchData";
import Loading from "../Loader/Loader";
import SubmitButton from "../Button/SubmitButton";
import WindowsWidth from "../WindowsWidth";
import { IoIosMore } from "react-icons/io";
import AppContext from "../../context/context";
import "../../scss/components/userSuggest2.scss";
const UserSuggest = props => {
  const [loading, setLoading] = useState(false);
  const [followed, setFollowed] = useState(props.isFollowed);
  const width = WindowsWidth();
  const userClass = width > 992 ? "p-1 text-center col-2 user_div" : "p-1 text-center col-4 user_div";
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
        <Link href={`/user/${props.userName}`} passHref>
          <a className="user_link">
            <img src={props.image} alt={props.displayName} className="rounded-circle img-thumbnail" />
          </a>
        </Link>
      </div>
      <p className="user_name m-2">{props.userName}</p>
      <p className="display_name m-2">{props.displayName}</p>
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