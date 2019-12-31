import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../components/Link";
import dynamic from "next/dynamic";
import Loading from "../components/Loader/Loading";
import Auth from "../components/Auth/Auth";
import { useRouter } from "next/router";
import fetchData from "../utils/fetchData";
import SubmitButton from "../components/Button/SubmitButton";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { numberSeparator, removeSeparator } from "../utils/tools";
import { ToastContainer, toast } from "react-toastify";
import "../scss/components/commentPage.scss";
const Nav = dynamic({
  loader: () => import("../components/Nav/Nav"),
  loading: () => <Loading />,
  ssr: true
});
const User = dynamic({
  loader: () => import("../components/Comment/User"),
  loading: () => <Loading />,
  ssr: true
});
const Page = props => {
  const Router = useRouter();
  const productId = Router.query.id;
  const [loading, setLoading] = useState(false);
  const firstComments = props.Comments.data || [];
  const [comments, setComments] = useState(firstComments);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(2);
  const [isFetching, setIsFetching] = useState(false);
  const textRef = useRef();
  toast.configure({
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  console.log(firstComments);
  const getComments = async () => {
    setLoading(true);
    const result = await fetchData(
      "User/U_Comment/GetComments",
      {
        method: "POST",
        body: JSON.stringify({
          productId: productId,
          page: page,
          pageSize: 10
        })
      },
      props.ctx
    );
    if (result !== undefined && result.isSuccess) {
      setComments(result.data);
      setPage(page + 1);
      if (result.data.model.length >= 10) {
        setTimeout(() => setIsFetching(false), 200);
      }
    } else if (result.message != undefined) {
      setTimeout(() => setIsFetching(false), 200);
    } else if (result.error != undefined) {
      setTimeout(() => setIsFetching(false), 200);
    }
    setLoading(false);
  };
  const sendComment = async () => {
    if (message.trim() !== "") {
      setLoading(true);
      const result = await fetchData(
        "User/U_Comment/AddComment",
        {
          method: "POST",
          body: JSON.stringify({
            productId: productId,
            message: message
          })
        },
        props.ctx
      );
      if (result !== undefined && result.isSuccess) {
        setMessage("");
        console.log(result);
      } else if (result !== undefined && result.message != undefined) {
        toast.warn(result.message);
      } else if (result !== undefined && result.error != undefined) {
        toast.error(result.error);
      }
      setLoading(false);
    } else {
      toast.warn("لطفا نظر خود را بنویسید.");
    }
  };
  useEffect(() => {
    textRef.current.focus();
  }, []);
  return (
    <>
      <Nav />
      <div className="container pb-0 pr-0 comment_head">
        <div className="row p-2 cart_title">
          <div className="col-1 align-self-center pr-2" onClick={() => Router.back()}>
            <FaArrowLeft className="font_icon back_icon" />
          </div>
          <div className="col-10 p-0 text-center align-self-center">
            <h5 className="mr-0 ml-2 mt-1 page_title">نظرات</h5>
          </div>
        </div>
      </div>
      <div className="container pb-5 rtl comment_page">
        <div className="row pl-1 pr-1 pb-5 mb-5">
          <User
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
            message={"پاسخ نطرتان \"گرونه\" را داد: \"قیمت خریدمه\""}
            name={"نام نمایشی"}
            userName={"user_name_UserName"}
            time={"یک هفته پیش"}
          />
          {loading && (
            <div className="col-12 mt-2 p-0 user">
              <Loading />
            </div>
          )}
        </div>
        <div className="row fixed-bottom input_text">
          <div className="col-12">
            <div className="row p-3">
              <textarea type="text" className="form-control col-9" placeholder="متن نظر" ref={textRef} value={message} onChange={e => setMessage(e.target.value)} />
              <div className="col-2 align-self-center">
                <SubmitButton loading={loading} onClick={sendComment} text="ارسال" className="btn btn-main send_comment" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
Page.getInitialProps = async function(context) {
  const { id } = context.query;
  const Comments = await fetchData(
    "User/U_Comment/GetComments",
    {
      method: "POST",
      body: JSON.stringify({
        productId: id,
        page: 1,
        pageSize: 10
      })
    },
    context
  );
  return { Comments };
};
export default Auth(Page);