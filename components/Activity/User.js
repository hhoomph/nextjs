import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../Link";
import fetchData from "../../utils/fetchData";
import Loading from "../Loader/Loader";
import SubmitButton from "../Button/SubmitButton";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
const User = props => {
  const [loading, setLoading] = useState(false);
  const { type, image, productImage, message, name, userName, time } = props;
  const [followed, setFollowed] = useState(props.isFollowed || false);
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
          <div className="row">
            <div className="col-4 m-auto pl-0">
              {type === "LikeProduct" || type === "PostSave" ? (
                <Link href={`/product/${props.productId}`} as={`/product/${props.productId}/${props.productTitle.trim().replace(/ /g, "-")}`} passHref>
                  <a className="product_image">
                    <img src={productImage} />
                  </a>
                </Link>
              ) : type === "LikeComment" || type === "CommentOnComment" || type === "CommentOnProduct" ? (
                <Link href={`/comment?id=${props.productId}`} passHref>
                  <a className="product_image">
                    <img src={productImage} />
                  </a>
                </Link>
              ) : followed ? (
                <SubmitButton loading={loading} onClick={() => unFollowToggle()} text="لغو دنبال" className="btn btn-main unfollow" />
              ) : (
                <SubmitButton loading={loading} onClick={() => followToggle()} text="دنبال کردن" className="btn btn-main follow" />
              )}
            </div>
            <div className="col-8 p-0 rtl content">
              <Link href={`/user/${userName}`} passHref>
                <a className="user_name">{userName}</a>
              </Link>
              {/* comment?id=89 */}
              <div className="message">
                {type === "LikeComment" || type === "CommentOnComment" || type === "CommentOnProduct" ? (
                  <Link href={`/comment?id=${props.productId}`} passHref>
                    <a className="">{message}</a>
                  </Link>
                ) : (
                  message
                )}
              </div>
              <div className="time">{time}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(User);