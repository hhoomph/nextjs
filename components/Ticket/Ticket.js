import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../Link";
import dynamic from "next/dynamic";
import fetchData from "../../utils/fetchData";
import Loading from "../Loader/Loading";
import SubmitButton from "../Button/SubmitButton";
import { FaTimes, FaReply, FaFileUpload } from "react-icons/fa";
import { MdHeadsetMic } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
const Ticket = props => {
  const [loading, setLoading] = useState(false);
  return (
    <div className={"col-12 mt-2 _ticket $(if(props.isAdmin === true) ? \" _admin\" : \"\" )"}>
      <div className="row">
        <div className="col-2 d-flex justify-content-center align-self-center">
          <a className="user_img">
            <img src="/static/img/user.jpg" />
          </a>
        </div>
        <div className="col-10">
          <div className="row m-auto p-0 justify-content-end">
            <div className="col-12 p-0 rtl content">
              <a className="user_name">user name USER_NAME</a>
              <div className="message">
                متن پیام متن پیام تست دمو متن پیام متن پیام تست دمو متن پیام متن پیام تست دمو متن پیام متن پیام تست دمو متن پیام متن پیام تست دمو متن پیام متن
                پیام تست دمو متن پیام متن پیام تست دمو متن پیام متن پیام تست دمو
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 pl-2 mt-2 text-left attach_files">
          <img className="file" src="/static/img/product.png" />
          <img className="file" src="/static/img/product2.png" />
          <img className="file" src="/static/img/product5.jpg" />
          <img className="file" src="/static/img/product6.jpg" />
          <img className="file" src="/static/img/user.png" />
        </div>
        <div className="col-12 text-center">
          <div className="time ml-2">29 دی ماه 1398 ساعت 10 و نیم</div>
        </div>
        <div className="col-12">
          <hr />
        </div>
      </div>
    </div>
  );
};
export default memo(Ticket);