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
  const [following, setFollowing] = useState(props.Following.data !== null ? props.Following.data : []);
  const [presented, setPresented] = useState(props.Presented.data !== null ? props.Presented.data : []);
  const [update, setUpdate] = useState(Date());
  const updateUsers = async () => {
    const FollowingRes = await fetchData(
      `User/U_Friends/OtherFollowing?userId=${id}`,
      {
        method: 'GET'
      },
      props.ctx
    );
    if (FollowingRes.isSuccess) {
      if (FollowingRes.data != null) {
        setFollowing(FollowingRes.data);
      } else {
        setFollowing([]);
      }
    }
    const PresentedRes = await fetchData(
      `User/U_Friends/OtherPresented?userId=${id}`,
      {
        method: 'GET'
      },
      props.ctx
    );
    if (PresentedRes.isSuccess) {
      if (PresentedRes.data != null) {
        setPresented(PresentedRes.data);
      } else {
        setPresented([]);
      }
    }
  };
  useEffect(() => {
    updateUsers();
  }, [update]);
  const showUsers =
    view == 1
      ? following.map(res => {
          const img = res.userAvatar !== null ? `https://api.qarun.ir/${res.userAvatar}` : '/static/img/no-product-image.png';
          return <User key={res.id} id={res.id} image={img} name={res.displayName} followed={res.isFollowed} userName={res.userName} setUpdate={setUpdate} />;
        })
      : presented.map(res => {
          const img = res.userAvatar !== null ? `https://api.qarun.ir/${res.userAvatar}` : '/static/img/no-product-image.png';
          return <User key={res.id} id={res.id} image={img} name={res.displayName} followed={res.isFollowed} userName={res.userName} setUpdate={setUpdate} />;
        });
  return (
    <>
      <Nav />
      <div className="container pb-0 map_header friends_page">
        <div className="row">
          <div className="col-12 p-0 pt-2">
            <ul className="nav d-flex ltr align-items-center flex-row-reverse filters">
              <li className={`nav-item ${view == 1 ? 'active' : ''}`} onClick={() => setView(1)}>
                <a className="nav-link">دنبال شده ها</a>
              </li>
              <li className={`nav-item ${view == 2 ? 'active' : ''}`} onClick={() => setView(2)}>
                <a className="nav-link">معرفی شده ها</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container rtl pb-5 pt-5 friends_page">
        <div className="row pl-1 pr-1 mt-4 users">{showUsers}</div>
      </div>
    </>
  );
}
Page.getInitialProps = async function(context) {
  const { id } = context.query;
  const Following = await fetchData(
    `User/U_Friends/OtherFollowing?userId=${id}`,
    {
      method: 'GET'
    },
    context
  );
  const Presented = await fetchData(
    `User/U_Friends/OtherPresented?userId=${id}`,
    {
      method: 'GET'
    },
    context
  );
  return { Following, Presented };
};
export default Auth(Page);