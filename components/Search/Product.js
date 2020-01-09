import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../Link";
import { FaTimes } from "react-icons/fa";
const Product = props => {
  const [hide, setHide] = useState(false);
  return (
    <div className="col-12 mt-2 p-0 product" hidden={hide}>
      <Link href={`/product/${props.id}`} as={`/product/${props.id}/${props.name.trim().replace(/ /g, "-")}`} passHref>
        <a className="link">
          <img src={props.image} />
        </a>
      </Link>
      <div className="_txt">
        <FaTimes className="close" onClick={() => setHide(true)} />
        <Link href={`/product/${props.id}`} as={`/product/${props.id}/${props.name.trim().replace(/ /g, "-")}`} passHref>
          <a className="name">{props.name}</a>
        </Link>
        <div className="price">
          <span>{props.price}</span>
          <span className="currency">تومان</span>
        </div>
      </div>
    </div>
  );
};
export default memo(Product);