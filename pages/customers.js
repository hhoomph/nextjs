import React, { Fragment, useContext, useReducer, useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Loading from "../components/Loader/Loading";
import { useRouter } from "next/router";
import Nav from "../components/Nav/Nav";
import ProfileHeader from "../components/Head/profileHeader";
import Product from "../components/Profile/product";
import Auth from "../components/Auth/Auth";
import fetchData from "../utils/fetchData";
import { FiChevronRight } from "react-icons/fi";
import "../scss/components/friends.scss";
const User = dynamic({
  loader: () => import("../components/Friend/User"),
  loading: () => <Loading />,
  ssr: true
});
function Page(props) {
  const [view, setView] = useState(1);
  const Router = useRouter();
  const { id } = Router.query;
  const [following, setFollowing] = useState(props.Follower.data !== undefined ? props.Follower.data : []);
  const [update, setUpdate] = useState(Date());
  const updateUsers = async () => {
    const Follower = await fetchData(
      `User/U_Friends/OtherFollower?userId=${id}`,
      {
        method: "GET"
      },
      props.ctx
    );
    if (Follower.isSuccess) {
      if (Follower.data != null) {
        setFollowing(Follower.data);
      } else {
        setFollowing([]);
      }
    }
  };
  useEffect(() => {
    updateUsers();
  }, [update]);
  const showUsers = following.map(res => {
    const img = res.userAvatar !== null ? `https://api.qarun.ir/${res.userAvatar}` : "/static/img/no-product-image.png";
    return <User key={res.id} id={res.id} image={img} name={res.displayName} followed={res.isFollowed} userName={res.userName} setUpdate={setUpdate} />;
  });
  return (
    <>
      <title>قارون | مشتریان</title>
      <Nav _tkn={props._tkn} />
      <div className="container friends_page">
        <div className="row p-2 cart_title">
          <div className="col-12 p-0 text-center">
            <h6 className="ml-5 mt-1 page_title">مشتریان</h6>
            <div className="mr-1 pl-1 d-inline-block text-right float-right">
              <FiChevronRight className="font_icon back_icon" onClick={() => Router.back()} />
            </div>
          </div>
        </div>
      </div>
      <div className="container rtl pb-5 friends_page">
        <div className="row pl-1 pr-1 users">{showUsers}</div>
      </div>
    </>
  );
}
Page.getInitialProps = async function(context) {
  const { id } = context.query;
  const Follower = await fetchData(
    `User/U_Friends/OtherFollower?userId=${id}`,
    {
      method: "GET"
    },
    context
  );
  return { Follower };
};
export default Auth(Page);