import React, { Fragment, useContext, useReducer, useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../components/Loader/Loading';
import { useRouter } from 'next/router';
import Nav from '../components/Nav/Nav';
import ProfileHeader from '../components/Head/profileHeader';
import Product from '../components/Profile/product';
import Auth from '../components/Auth/Auth';
import fetchData from '../utils/fetchData';
import '../scss/components/friends.scss';
const User = dynamic({
  loader: () => import('../components/Friend/User'),
  loading: () => <Loading />,
  ssr: true
});
function Page(props) {
  const [view, setView] = useState(1);
  const Router = useRouter();
  const { id } = Router.query;
  const [following, setFollowing] = useState(props.Follower.data || []);
  const [update, setUpdate] = useState(Date());
  const updateUsers = async () => {
    const Follower = await fetchData(
      `User/U_Friends/OtherFollower?userId=${id}`,
      {
        method: 'GET'
      },
      props.ctx
    );
    if (Follower.isSuccess) {
      setFollowing(Follower.data);
    }
  };
  useEffect(() => {
    updateUsers();
  }, [update]);
  const showUsers =
    view == 1
      ? following.map(res => {
          const img = res.userAvatar !== null ? `https://api.qaroon.ir/${res.userAvatar}` : '/static/img/no-product-image.png';
          return <User key={res.id} id={res.id} image={img} name={res.displayName} followed={res.isFollowed} userName={res.userName} setUpdate={setUpdate} />;
        })
      : presented.map(res => {
          const img = res.userAvatar !== null ? `https://api.qaroon.ir/${res.userAvatar}` : '/static/img/no-product-image.png';
          return <User key={res.id} id={res.id} image={img} name={res.displayName} followed={res.isFollowed} userName={res.userName} setUpdate={setUpdate} />;
        });
  return (
    <>
      <div className="container friends_page">
        <div className="row p-2 cart_title">
          <div className="col text-center">
            <h5 className="mr-2 ml-2 mt-1 page_title">مشتریان</h5>
            {/* <hr /> */}
          </div>
        </div>
      </div>
      <div className="container rtl pb-5 friends_page">
        <div className="row pl-1 pr-1 users">
          {/* <User id={1} image={'/static/img/user.png'} followed={true} name={'نام نمایشی'} userName={'user_name_UserName'} price={``} />
          <User id={2} image={'/static/img/user.jpg'} followed={false} name={'نام نمایشی'} userName={'user_name_UserName'} price={``} />
          <User id={3} image={'/static/img/user2.png'} followed={true} name={'نام نمایشی'} userName={'user_name_UserName'} price={``} />
          <User id={4} image={'/static/img/user.png'} followed={true} name={'نام نمایشی'} userName={'user_name_UserName'} price={``} /> */}
          {showUsers}
        </div>
      </div>
      <Nav />
    </>
  );
}
Page.getInitialProps = async function(context) {
  const { id } = context.query;
  const Follower = await fetchData(
    `User/U_Friends/OtherFollower?userId=${id}`,
    {
      method: 'GET'
    },
    context
  );
  return { Follower };
};
export default Auth(Page);