import React, { useState, useEffect, memo } from "react";
import Link from "next/link";
import WindowsWidth from "../WindowsWidth";
const User = props => {
  const width = WindowsWidth();
  const userClass = width > 992 ? "col-1" : width > 400 ? "col-2" : "col-3";
  return props.self ? (
    <div className="userClass self_user">
      <Link href={`/activity`} passHref>
        <a className="mr-2 user_link">
          <img src={props.image} alt={props.alt} className="rounded-circle img-thumbnail" />
        </a>
      </Link>
      <p className="user_Suggest_name text-truncate">{props.userName}</p>
    </div>
  ) : (
    <div className="userClass">
      <Link href={`/user/${props.userName}`} passHref>
        <a className="mr-2 user_link">
          <img src={props.image} alt={props.alt} className="rounded-circle img-thumbnail" />
        </a>
      </Link>
      <p className="user_Suggest_name text-truncate">{props.userName}</p>
    </div>
  );
};
export default memo(User);