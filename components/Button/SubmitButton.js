import React, { useContext, useRef, useState, useEffect, memo } from "react";
import Loading from "../Loader/Loading";
import "../../scss/components/button.scss";
const SubmitButton = props => {
  return (
    <button onClick={props.onClick} className={props.className} type="button" disabled={props.loading}>
      {props.loading == true ? (
        <Loading />
      ) : (
        <>
          {props.text} {props.children}
        </>
      )}
      {/* {props.children} */}
    </button>
  );
};
export default memo(SubmitButton);
