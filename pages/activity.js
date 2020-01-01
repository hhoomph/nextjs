import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../components/Link";
import dynamic from "next/dynamic";
import Loading from "../components/Loader/Loading";
import Auth from "../components/Auth/Auth";
import Router from "next/router";
import fetchData from "../utils/fetchData";
import { FaArrowRight, FaArrowLeft, FaSearch } from "react-icons/fa";
import { numberSeparator, removeSeparator } from "../utils/tools";
import "../scss/components/searchComponent.scss";
const Nav = dynamic({
  loader: () => import("../components/Nav/Nav"),
  loading: () => <Loading />,
  ssr: true
});
const User = dynamic({
  loader: () => import("../components/Activity/User"),
  loading: () => <Loading />,
  ssr: true
});
const Page = props => {
  const [activities, setActivities] = useState(props.result.data.model || []);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [isFetching, setIsFetching] = useState(false);
  const getActivities = async () => {
    setLoading(true);
    const Result = await fetchData(
      "User/U_Account/EventLog",
      {
        method: "POST",
        body: JSON.stringify({
          page: page,
          pageSize: 10
        })
      },
      props.ctx
    );
    if (Result.isSuccess) {
      if (activities.length > 0) {
        setActivities(activities.concat(Result.data.model));
      } else {
        setActivities(Result.data.model);
      }
      if (Result.data.model.length >= 10) {
        setPage(page + 1);
        setTimeout(() => setIsFetching(false), 200);
      }
    } else if (Result.message != undefined) {
      setTimeout(() => setIsFetching(false), 200);
    } else if (Result.error != undefined) {
      setTimeout(() => setIsFetching(false), 200);
    }
    setLoading(false);
  };
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 100 < document.documentElement.offsetHeight || isFetching) return;
    setIsFetching(true);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (!isFetching) return;
    getActivities();
  }, [isFetching]);
  const showActivities = activities.map(activity => {
    const type = activity.eventLogStatus;
    const userImg = activity.functorAvatar !== null ? `https://api.qarun.ir/${activity.functorAvatar}` : "/static/img/no-userimage.svg";
    const productImg = activity.productPicture !== null ? `https://api.qarun.ir/${activity.productPicture}` : "/static/img/no-product-image.png";
    let messageText = "";
    let typeText;
    switch (type) {
    case 1:
      messageText = "محصولتان را پسندید.";
      typeText = "LikeProduct";
      break;
    case 2:
      messageText = "با دعوت شما به دوستانتان اضافه شد.";
      typeText = "InviteUser";
      break;
    case 3:
      messageText = "نظر داد : " + `"${activity.comment}".`;
      typeText = "CommentOnProduct";
      break;
    case 4:
      messageText = "پاسخ نظرتان " + `"${activities.parentComment}" را داد :` + ` "${activity.comment}".`;
      typeText = "CommentOnComment";
      break;
    case 5:
      messageText = "نظرتان را پسندید : " + `"${activity.comment}"`;
      typeText = "LikeComment";
      break;
    case 6:
      messageText = "شما را دنبال میکند.";
      typeText = "UserFollow";
      break;
    case 7:
      messageText = "شما را نشان گذاری کرد.";
      typeText = "PostSave";
      break;
    default:
      messageText = "";
      break;
    }
    return (
      <User
        key={activity.functorUserName + activity.eventLogStatus}
        id={activity.functorId}
        type={typeText}
        image={userImg}
        isFollowed={activity.isFollowed}
        productImage={productImg}
        productId={activity.productId}
        message={messageText}
        name={activity.functorDisplayName}
        userName={activity.functorUserName}
        commentId={activity.commentId}
        parentCommentId={activity.parentCommentId}
        time={activity.insertDateP}
      />
    );
  });
  console.log(activities);
  return (
    <>
      <Nav />
      <div className="container pb-0 search_component">
        <div className="row p-2 cart_title">
          {/* <div className="col text-center">
            <h5 className="mr-2 ml-2 mt-1 page_title">فعالیت ها</h5>
          </div> */}
          <div className="col-1 align-self-center pr-2" onClick={() => Router.back()}>
            <FaArrowLeft className="font_icon back_icon" onClick={console.log("asd")} />
          </div>
          <div className="col-10 p-0 text-center align-self-center">
            <h5 className="mr-0 ml-2 mt-1 page_title">فعالیت ها</h5>
          </div>
        </div>
      </div>
      <div className="container pb-5 rtl search_result activity_page">
        <div className="row pl-1 pr-1 pb-5 mb-5">
          {showActivities}
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
          />
          <User
            id={2}
            type={"productLike"}
            image={"/static/img/user.png"}
            followed={true}
            productImage={"/static/img/product4.jpg"}
            message={"شما را دنبال میکند"}
            name={"نام نمایشی"}
            userName={"user_name_UserName"}
            time={"1 روز پیش"}
          />
          <User
            id={3}
            type={"follow"}
            image={"/static/img/user.png"}
            followed={true}
            productImage={"/static/img/product6.jpg"}
            message={"متن پیام متن پیام"}
            name={"نام نمایشی"}
            userName={"user_name_UserName"}
            time={"50 دقیقه"}
          />
          <User
            id={4}
            type={"productLike"}
            image={"/static/img/profile.png"}
            followed={true}
            productImage={"/static/img/product5.jpg"}
            message={"پست شما را پسندید"}
            name={"نام نمایشی"}
            userName={"user_name_UserName"}
            time={"5 دقیقه پیش"}
          />
          <User
            id={5}
            type={"productLike"}
            image={"/static/img/user.jpg"}
            followed={false}
            productImage={"/static/img/product4.jpg"}
            message={"متن پیام متن پیام"}
            name={"نام نمایشی"}
            userName={"user_name_UserName"}
            time={"1 ماه"}
          />
          <User
            id={6}
            type={"productLike"}
            image={"/static/img/user.png"}
            followed={true}
            productImage={"/static/img/product6.jpg"}
            message={"شمار را دنبال میکند"}
            name={"نام نمایشی"}
            userName={"user_name_UserName"}
            time={"یک هفته"}
          />
          <User
            id={7}
            type={"comment"}
            image={"/static/img/user.png"}
            followed={false}
            productImage={"/static/img/product5.jpg"}
            message={"متن پیام متن پیام"}
            name={"نام نمایشی"}
            userName={"user_name_UserName"}
            time={"1 روز پیش"}
          />
          <User
            id={8}
            type={"commentLike"}
            image={"/static/img/profile.png"}
            followed={true}
            productImage={"/static/img/product6.jpg"}
            message={"پاسخ نظرتان \"گرونه\" را داد: \"قیمت خریدمه\""}
            name={"نام نمایشی"}
            userName={"user_name_UserName"}
            time={"یک هفته پیش"}
          /> */}
          {loading && (
            <div className="col-12 mt-2 p-0 user">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
Page.getInitialProps = async function(context) {
  const req = context.req;
  const result = await fetchData(
    "User/U_Account/EventLog",
    {
      method: "POST",
      body: JSON.stringify({
        page: 1,
        pageSize: 10
      })
    },
    context
  );
  return { result };
};
export default Auth(Page);