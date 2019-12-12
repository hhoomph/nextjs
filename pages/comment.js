import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../components/Link";
import dynamic from "next/dynamic";
import Loading from "../components/Loader/Loader";
import Auth from "../components/Auth/Auth";
import { useRouter } from "next/router";
import fetchData from "../utils/fetchData";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { numberSeparator, removeSeparator } from "../utils/tools";
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
  //const { id } = Router.query;
  return (
    <>
      <Nav />
      <div className="container pb-0 comment_head">
        <div className="row p-2 cart_title">
          <div className="col text-center">
            <h5 className="mr-2 ml-2 mt-1 page_title">نظرات</h5>
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
        </div>
      </div>
    </>
  );
};
Page.getInitialProps = async function(context) {
  // const { id } = context.query;
  // const Following = await fetchData(
  //   `User/U_Friends/OtherFollowing?userId=${id}`,
  //   {
  //     method: "GET"
  //   },
  //   context
  // );
  // const Presented = await fetchData(
  //   `User/U_Friends/OtherPresented?userId=${id}`,
  //   {
  //     method: "GET"
  //   },
  //   context
  // );
  // return { Following, Presented };
};
export default Auth(Page);