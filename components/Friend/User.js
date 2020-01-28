import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../Link";
import fetchData from "../../utils/fetchData";
import Loading from "../Loader/Loader";
import SubmitButton from "../Button/SubmitButton";
import { ToastContainer, toast } from "react-toastify";
const User = props => {
  const [loading, setLoading] = useState(false);
  const [followed, setFollowed] = useState(props.followed);
  const [hide, setHide] = useState(false);
  toast.configure({
    position: "top-right",
    autoClose: false,
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
      props.setUpdate(Date());
    }else if (result !== undefined && result.message != undefined) {
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
      props.setUpdate(Date());
    }
    setLoading(false);
  };
  return (
    <div className="col-12 mt-1 p-0 pt-1 pb-1 user" hidden={hide}>
      <Link href={`/user/${props.userName}`} passHref>
        <a className="link">
          <img src={props.image} />
        </a>
      </Link>
      <div className="_txt">
        {followed ? (
          <SubmitButton loading={loading} onClick={() => unFollowToggle()} text="لغو دنبال" className="btn btn-main unfollow" />
        ) : (
          <SubmitButton loading={loading} onClick={() => followToggle()} text="دنبال کردن" className="btn btn-main follow" />
        )}
        <Link href={`/user/${props.userName}`} passHref>
          <a className="name text-truncate">{props.userName}</a>
        </Link>
        <div className="displayName">{props.name}</div>
      </div>
    </div>
  );
};
export default memo(User);