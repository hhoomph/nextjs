import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../components/Link";
import dynamic from "next/dynamic";
import Loading from "../components/Loader/Loading";
import Auth from "../components/Auth/Auth";
import Router from "next/router";
import fetchData from "../utils/fetchData";
import { FaArrowRight, FaArrowLeft, FaSearch } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
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
const FirstUserSuggest = dynamic({
  loader: () => import("../components/UserSuggest/FirstUserSuggest"),
  loading: () => <Loading />,
  ssr: true
});
const Page = props => {
  const [activities, setActivities] = useState(props.result.data !== undefined && props.result.data.model !== undefined ? props.result.data.model : []);
  const [profile, setProfile] = useState(props.Profile.data || null);
  const lat = profile !== null && profile.lat !== undefined && profile.lat !== null ? profile.lat : 0;
  const long = profile !== null && profile.long !== undefined && profile.long !== null ? profile.long : 0;
  const [suggestionUsers, setSuggestionUsers] = useState([]);
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
  const getUserFromClosestPeople = async () => {
    const getClosestPeople = await fetchData(
      "User/U_Friends/ClosestPeople",
      {
        method: "POST",
        body: JSON.stringify({
          lat: lat,
          long: long,
          page: 1,
          pageSize: 15
        })
      },
      props.ctx
    );
    if (getClosestPeople !== undefined && getClosestPeople.isSuccess) {
      const allUsers = suggestionUsers.concat(getClosestPeople.data.model);
      // Remove duplicate Users in array with id
      const res = [];
      const map = new Map();
      for (const item of allUsers) {
        if (!map.has(item.userName)) {
          map.set(item.userName, true); // set any value to Map
          res.push(item);
        }
      }
      setSuggestionUsers(res);
    }
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
  useEffect(() => {
    if (suggestionUsers.length <= 0 && profile !== null) {
      getUserFromClosestPeople();
    }
  }, []);
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
      messageText = "پاسخ نظرتان " + `"${activity.parentComment}" را داد :` + ` "${activity.comment}".`;
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
        key={activity.functorUserName + activity.insertDate}
        id={activity.functorId}
        type={typeText}
        image={userImg}
        isFollowed={activity.isFollowed}
        productImage={productImg}
        productId={activity.productId}
        productTitle={activity.productTitle}
        message={messageText}
        name={activity.functorDisplayName}
        userName={activity.functorUserName}
        commentId={activity.commentId}
        parentComment={activity.parentComment}
        parentCommentId={activity.parentCommentId}
        time={activity.insertDateP}
      />
    );
  });
  const showUserSugestion = suggestionUsers.map(user => {
    const userImg = user.userAvatar !== null ? `https://api.qarun.ir/${user.userAvatar}` : "/static/img/no-userimage.svg";
    return <User key={user.id} id={user.id} type="UserFollow" image={userImg} isFollowed={user.isFollowed} message="" name={user.displayName} userName={user.userName} />;
  });
  //console.log(activities);
  return (
    <>
      <title>قارون</title>
      <Nav _tkn={props._tkn} />
      <div className="container pt-2 pb-2 search_component">
        <div className="row cart_title">
          <div className="col-10 text-center align-self-center">
            <h6 className="ml-5 pl-3 mt-1 page_title">فعالیت ها</h6>
          </div>
          <div className="col-2 text-center align-self-center pr-1">
            <FiChevronRight className="font_icon back_icon" onClick={() => Router.back()} />
          </div>
        </div>
      </div>
      <div className="container pb-5 rtl search_result activity_page">
        <div className="row pl-1 pr-1 pb-5 mb-5">
          {activities.length > 0 ? showActivities : showUserSugestion}
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
  // Get Current User Info
  const Profile = await fetchData(
    "User/U_Account/Profile",
    {
      method: "GET"
    },
    context
  );
  return { result, Profile };
};
export default Auth(Page);