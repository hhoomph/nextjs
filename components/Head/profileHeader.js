import React, { useState, useEffect, memo } from 'react';
import Link from '../Link';
import { FaShoppingBasket, FaRegUserCircle } from 'react-icons/fa';
import { ReactComponent as MenuCircleSvg } from '../../public/static/svg/menu-circle.svg';
import { ReactComponent as AddUserSvg } from '../../public/static/svg/add-user.svg';
import { ReactComponent as PlusSvg } from '../../public/static/svg/plus.svg';
import { Dropdown } from 'react-bootstrap';
import '../../scss/components/profileHeader.scss';
import Logout from '../Auth/Logout';
const Header = props => {
  const {
    avatar,
    biography,
    amountOfDebt,
    customerCount,
    displayName,
    email,
    friendsCount,
    id,
    invitationlink,
    marketingAmount,
    phoneNumber,
    productCount,
    qerun,
    userName,
    walletCharge
  } = props.profileData;
  const avatarUrl = avatar !== undefined && avatar !== null ? `https://api.qaroon.ir/${avatar}` : null;
  const toggleMenu = () => {
    const menuDiv = document.getElementById('profileMenu');
    menuDiv.classList.toggle('hidden');
  };
  const UserImage = () => {
    if (avatarUrl !== null) {
      return <img src={avatarUrl} alt="user image" className="rounded-circle" />;
    } else {
      return <img src={`/static/svg/user-circle.svg`} alt="user image" className="rounded-circle" />;
    }
  };
  return (
    <>
      <div className="container profile_header">
        <div className="row">
          <div className="col-6 d-flex">
            <a className="nav_Icons active">
              <AddUserSvg className="svg_Icons" />
            </a>
            {/* <Dropdown drop="left" className="dropDownMenu">
              <Dropdown.Toggle>
                <a className="nav_Icons active">
                  <AddUserSvg className="svg_Icons" />
                </a>
              </Dropdown.Toggle>
              <Dropdown.Menu className="rtl">
                <Dropdown.Item eventKey="1">منو یک</Dropdown.Item>
                <Dropdown.Item eventKey="2" active>من دو</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4">خروج</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </div>
          <div className="col-6 d-flex justify-content-end">
            {/* <a
              className="nav_Icons"
              onClick={() => {
                toggleMenu();
              }}
            >
              <MenuCircleSvg className="svg_Icons" />
            </a>
            <div className="d-flex col p-3 rtl justify-content-start position-absolute flex-column profile_menu hidden" id="profileMenu">
              <ul className="nav flex-column">
                <a className="nav-link">دوستان</a>
                <a className="nav-link">دنبال شده ها</a>
                <a
                  className="nav-link"
                  onClick={() => {
                    Logout();
                  }}
                >
                  خروج
                </a>
              </ul>
            </div> */}
            <Dropdown drop="left" className="dropDownMenu">
              <Dropdown.Toggle>
                <a className="nav_Icons">
                  <MenuCircleSvg className="svg_Icons" />
                </a>
              </Dropdown.Toggle>
              <Dropdown.Menu className="rtl profile_menu">
                <Dropdown.Item eventKey="1" active>
                  دوستان
                </Dropdown.Item>
                <Dropdown.Item eventKey="2">دنبال شده ها</Dropdown.Item>
                {/* <Dropdown.Item
                  eventKey="5"
                  onClick={() => {
                    props.setView(1);
                  }}
                >
                  پروفایل
                </Dropdown.Item> */}
                <Dropdown.Item
                  eventKey="3"
                  onClick={() => {
                    props.setView(2);
                  }}
                >
                  ویرایش پروفایل
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  eventKey="4"
                  onClick={() => {
                    Logout();
                  }}
                >
                  خروج
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-center userInfo">
            <a className="mr-2 user_img">
              <UserImage />
              {/* <PlusSvg className="svg_Icons" /> */}
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-center">
            <p className="user_name mt-3">{userName}</p>
          </div>
        </div>
        <div className="row stats rtl mt-2">
          <div className="col-4 d-block text-center">
            <p className="friendsTitle">دوستان</p>
            <p className="friends">{friendsCount || 0}</p>
          </div>
          <div className="col-4 d-block text-center">
            <p className="customersTitle">مشتریان</p>
            <p className="customers">{customerCount || 0}</p>
          </div>
          <div className="col-4 d-block text-center">
            <p className="productsTitle">محصولات</p>
            <p className="products">{productCount || 0}</p>
          </div>
        </div>
      </div>
      <div className="container info">
        <div className="row rtl">
          <div className="col-12 d-flex top">
            <div className="col-4 d-block text-center">
              <p>موجودی</p>
              <p className="inventory">{`${walletCharge} ` || `0 `}</p>
            </div>
            <div className="col-4 d-block text-center">
              <p>قرون</p>
              <p className="debt">{qerun ? `${qerun} ` : `0 `}</p>
            </div>
            <div className="col-4 d-block text-center">
              <p>سفارشات</p>
              <p className="orders">{marketingAmount ? `${marketingAmount} ` : `0 `}</p>
            </div>
          </div>
          <div className="col-12 pt-3">
            <h2 className="title">فروشگاه قارون</h2>
            <p className="bio">{biography ? `${biography}` : ` `}</p>
            {/* <Link href="/profileEdit" passHref>
              <a className="btn btn-main">ویرایش</a>
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(Header);