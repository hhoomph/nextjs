import React, { useState, useEffect, memo } from 'react';
import Link from '../Link';
import fetchData from '../../utils/fetchData';
import Loading from '../Loader/Loader';
import SubmitButton from '../Button/SubmitButton';
import { FaShoppingBasket, FaRegUserCircle } from 'react-icons/fa';
import { ReactComponent as SendSvg } from '../../public/static/svg/send.svg';
import { ReactComponent as AddUserSvg } from '../../public/static/svg/add-user.svg';
import { ReactComponent as DistanceSvg } from '../../public/static/svg/distance.svg';
import { ToastContainer, toast } from 'react-toastify';
import '../../scss/components/profileHeader.scss';
const Header = props => {
  const nextCtx = props.ctx;
  const profileData = props.profileData;
  const [loading, setLoading] = useState(false);
  const [followed, setFollowed] = useState(profileData.followed);
  toast.configure({
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  const UserImage = () => {
    if (profileData.avatar && profileData.avatar != null) {
      return <img src={`https://api.qaroon.ir/${profileData.avatar}`} alt="user image" className="rounded-circle" />;
    } else {
      return <img src={`/static/svg/user-circle.svg`} alt="user image" className="rounded-circle" />;
    }
  };
  const UserStatus = () => {
    if (props.userOnline) {
      return <div className="status online" title="آنلاین" />;
    } else {
      return <div className="status offline" title="آفلاین" />;
    }
  };
  const followToggle = async () => {
    setLoading(true);
    const result = await fetchData(
      `User/U_Friends/Follow?userId=${profileData.id}`,
      {
        method: 'GET'
      },
      nextCtx
    );
    if (result.isSuccess) {
      setFollowed(!followed);
    } else if (result.message != undefined) {
      toast.warn(result.message);
    } else if (result.error != undefined) {
      toast.error(result.error);
    }
    setLoading(false);
  };
  const unFollowToggle = async () => {
    setLoading(true);
    const result = await fetchData(
      `User/U_Friends/UnFollow?userId=${profileData.id}`,
      {
        method: 'GET'
      },
      nextCtx
    );
    if (result.isSuccess) {
      setFollowed(!followed);
    } else if (result.message != undefined) {
      toast.warn(result.message);
    } else if (result.error != undefined) {
      toast.error(result.error);
    }
    setLoading(false);
  };
  return (
    <>
      <div className="container profile_header">
        <div className="row">
          <div className="col-6 pl-4 d-flex">
            <Link href="" passHref>
              <a className="nav_Icons active">
                <AddUserSvg className="svg_Icons" />
              </a>
            </Link>
          </div>
          <div className="col-6 pr-4 d-flex justify-content-end">
            <Link href="" passHref>
              <a className="nav_Icons">
                <SendSvg className="svg_Icons" />
              </a>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-center userInfo">
            <a className="mr-2 user_img">
              <UserImage />
              <UserStatus />
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-center">
            <p className="user_name mt-2">{profileData.userName}</p>
          </div>
        </div>
        <div className="row stats rtl mt-2">
          <div className="col-4 d-block text-center">
            <p>دوستان</p>
            <p className="friends">{profileData.friendsCount}</p>
          </div>
          <div className="col-4 d-block text-center">
            <p>مشتریان</p>
            <p className="customers">{profileData.customerCount}</p>
          </div>
          <div className="col-4 d-block text-center">
            <p>محصولات</p>
            <p className="products">{profileData.productCount}</p>
          </div>
        </div>
      </div>
      <div className="container info">
        <div className="row rtl">
          <div className="col-12 d-flex top">
            <div className="col-6 d-block">
              {followed ? (
                <SubmitButton loading={loading} onClick={() => unFollowToggle()} text="لغو دنبال" className="btn btn-main unfollow" />
              ) : (
                <SubmitButton loading={loading} onClick={() => followToggle()} text="دنبال کردن" className="btn btn-main follow" />
              )}
              {/* <SubmitButton
                loading={loading}
                onClick={() => {
                  console.log(followed)
                  if (followed) {
                    unFollowToggle();
                  } else {
                    followToggle();
                  }
                }}
                text={followed ? 'لغو دنبال' : 'دنبال کردن'}
                className="btn btn-main follow"
              /> */}
            </div>
            <div className="col-6 d-block distance">
              <DistanceSvg className="svg_Icons" />
              <p>{parseFloat(profileData.geographicalDistance).toFixed(2)} کیلومتر</p>
            </div>
          </div>
          <div className="col-12 pt-3">
            <h2 className="title">{profileData.displayName}</h2>
            <p className="bio">{profileData.biography}</p>
            <img className="logo_img" src={`/static/img/logo_opacity.png`} />
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(Header);