import React, { Fragment, useContext, useState, useEffect, memo } from "react";
import dynamic from "next/dynamic";
import Loading from "../Loader/Loading";
import Link from "../Link";
import { IoIosMore } from "react-icons/io";
import AppContext from "../../context/context";
import "../../scss/components/userSuggest.scss";
import { FiUsers } from "react-icons/fi";
const FirstUser = dynamic({
  loader: () => import("./FirstUser.js"),
  loading: () => <Loading />,
  ssr: true
});
const FirstUserSuggest = props => {
  const users = props.users;
  const res = useContext(AppContext);
  const renderUsers = users.map(user => (
    <FirstUser
      key={user.id}
      id={user.id}
      userName={user.userName}
      displayName={user.displayName}
      alt={user.displayName}
      isFollowed={user.isFollowed}
      image={`https://api.qaroon.ir/${user.userAvatar}`}
    />
  ));
  return (
    <div className="container user_Suggestion first_user_suggest">
      <div className="row">
        <div className="col p-0 pt-1 text-center rtl">
          {/* <h2>به بازار قارون خوش آمدید!</h2>
          <p className="intro_text">دوستانتان را دنبال کنید تا همیشه به محصولات آنها دسترسی داشته باشید</p> */}
          <div className="d-flex justify-content-start pb-1 rtl over_flow">{renderUsers}</div>
        </div>
      </div>
    </div>
  );
};
export default memo(FirstUserSuggest);