import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../Link";
import dynamic from "next/dynamic";
import fetchData from "../../utils/fetchData";
import Loading from "../Loader/Loading";
import SubmitButton from "../Button/SubmitButton";
import { FaTimes, FaReply, FaFileUpload } from "react-icons/fa";
import { MdHeadsetMic } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
const Chat = props => {
  const [loading, setLoading] = useState(false);
  const showImage = props.filesUrl.map((img, index) => <a key={index} target="_blank" href={`https://api.qarun.ir/${img}`}>
    <img className="file" src={`https://api.qarun.ir/${img}`} />
  </a>);
  return (
    <>
      <div className={"col-11 m-auto pt-2 _ticket $(if(props.isAdmin === true) ? \"_admin\" : \""}>
        <div className="row">
          <div className="col-2 col-md-1 d-flex justify-content-center align-self-center">
            <a className="user_img">
              <img src={props.senderAvatar} />
            </a>
          </div>
          <div className="col-10 col-md-11 usr_msg_div">
            <div className="row m-auto p-0 justify-content-end">
              <div className="col-12 p-0 rtl content">
                <a className="user_name text-truncate">{props.senderName}</a>
                <div className="pl-1 message">
                  {props.content}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-10 offset-2 mt-2 text-left attach_files"> */}
          <div className="col-12 mt-2 text-center attach_files">
            {showImage}
          </div>
          <div className="col-12 text-center">
            <div className="time ml-2">{props.insertDateP}</div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <hr />
      </div>
    </>
  );
};
export default memo(Chat);