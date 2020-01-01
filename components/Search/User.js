import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../Link";
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
        <FaTimes className="close" onClick={() => setHide(true)} />
        <Link href={`/user/${props.userName}`} passHref>
          <a className="name">{props.userName}</a>
        </Link>
        <div className="displayName">{props.name}</div>
      </div>
    </div>
  );
};
export default memo(User);