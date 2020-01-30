import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../Link";
import SubmitButton from "../Button/SubmitButton";
import { FaTimes } from "react-icons/fa";
const User = props => {
  const [hide, setHide] = useState(false);
  return (
    <div className="col-12 mt-2 p-0 user" hidden={hide}>
      <Link href={`/user/${props.userName}`} passHref>
        <a className="link">
          <img src={props.image} />
        </a>
      </Link>
      <div className="_txt">
        <SubmitButton loading={props.loading} onClick={props.action} text="انتقال" className="d-inline-block mt-1 btn-main btn-green"></SubmitButton>
        <Link href={`/user/${props.userName}`} passHref>
          <a className="user_name text-truncate">{props.userName}</a>
        </Link>
        <div className="displayName text-truncate">{props.name}</div>
      </div>
    </div>
  );
};
export default memo(User);