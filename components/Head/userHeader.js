import React, { useState, useEffect, memo } from 'react';
import Link from '../Link';
import { FaShoppingBasket, FaRegUserCircle } from 'react-icons/fa';
import { ReactComponent as SendSvg } from '../../static/svg/send.svg';
import { ReactComponent as AddUserSvg } from '../../static/svg/add-user.svg';
import { ReactComponent as DistanceSvg } from '../../static/svg/distance.svg';
import '../../scss/components/profileHeader.scss';
const Header = props => {
  const UserImage = () => {
    if (props.userImage && props.userImage != null) {
      return <img src={props.userImage} alt="user image" className="rounded-circle" />;
    } else {
      return <img src={`../../static/svg/user-circle.svg`} alt="user image" className="rounded-circle" />;
    }
  };
  const UserStatus = () => {
    if (props.userOnline) {
      return <div className="status online" title="آنلاین" />;
    } else {
      return <div className="status offline" title="آفلاین" />;
    }
  };
  return (
    <>
      <div className="container profile_header">
        <div className="row">
          <div className="col-6 d-flex">
            <Link href="/" passHref>
              <a className="nav_Icons active">
                <AddUserSvg className="svg_Icons" />
              </a>
            </Link>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <Link href="/" passHref>
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
            <p className="user_name mt-3">sima_k64</p>
          </div>
        </div>
        <div className="row stats rtl mt-2">
          <div className="col-4 d-block text-center">
            <p>دوستان</p>
            <p className="friends">167</p>
          </div>
          <div className="col-4 d-block text-center">
            <p>مشتریان</p>
            <p className="customers">5421</p>
          </div>
          <div className="col-4 d-block text-center">
            <p>محصولات</p>
            <p className="products">203</p>
          </div>
        </div>
      </div>
      <div className="container info">
        <div className="row rtl">
          <div className="col-12 d-flex top">
            <div className="col-6 d-block">
              <a className="btn btn-main follow">دنبال کردن</a>
            </div>
            <div className="col-6 d-block distance">
              <DistanceSvg className="svg_Icons" />
              <p>14/4 کیلومتر</p>
            </div>
          </div>
          <div className="col-12 pt-3">
            <h2 className="title">فروشگاه قارون</h2>
            <p className="bio">عرضه بهترین و باکیفیت ترین محصولات بازار با قیمت مناسب ارسال سریع و خدمات مناسب</p>
            <img className="logo_img" src={`../../static/img/logo_opacity.png`}/>
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(Header);