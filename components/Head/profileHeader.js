import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../Link";
import Router from "next/router";
import { FaShoppingBasket, FaRegUserCircle, FaShareAlt, FaRegCopy } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { TiThMenuOutline } from "react-icons/ti";
import { ReactComponent as MenuCircleSvg } from "../../public/static/svg/menu-circle.svg";
import { ReactComponent as AddUserSvg } from "../../public/static/svg/add-user.svg";
import { ReactComponent as PlusSvg } from "../../public/static/svg/plus.svg";
import { Dropdown, Modal } from "react-bootstrap";
import SubmitButton from "../Button/SubmitButton";
import SideBar from "../SideBar/SideBar";
import "../../scss/components/profileHeader.scss";
import Logout from "../Auth/Logout";
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
    walletCharge,
    deliveredOrderCount
  } = props.profileData;
  const avatarUrl = avatar !== undefined && avatar !== null ? `https://api.qarun.ir/${avatar}` : null;
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };
  const textCopy = useRef();
  const toggleMenu = () => {
    const menuDiv = document.getElementById("profileMenu");
    menuDiv.classList.toggle("hidden");
  };
  const UserImage = () => {
    if (avatarUrl !== null) {
      return <img src={avatarUrl} alt="user image" className="rounded-circle" />;
    } else {
      return <img src={"/static/img/no-userimage.svg"} alt="user image" className="rounded-circle" />;
    }
  };
  const shareLink = async () => {
    setLoading(true);
    const shareData = {
      title: "دعوت به قارون",
      text: "با دعوت دوستان خود به قارون در سود خرید و فروش آن ها سهیم باشید.",
      url: `https://qarun.ir/login?user=${userName}`
    };
    try {
      await navigator.share(shareData);
      setLoading(false);
    } catch (e) {
      //console.log("Share Error : ", e);
      copyText();
      setLoading(false);
    }
  };
  const copyText = () => {
    const txt = textCopy.current;
    txt.select();
    txt.setSelectionRange(0, 99999);
    document.execCommand("copy");
  };
  return (
    <>
      <SideBar toggle={toggleSideBar} isOpen={isOpen} setIsOpen={setIsOpen} userName={userName} setView={props.setView} />
      <div className="container profile_header">
        <div className="row">
          <div className="col-2 pl-4 d-flex">
            <a className="nav_Icons active" onClick={() => setModalShow(true)}>
              <AddUserSvg className="svg_Icons" />
            </a>
          </div>
          <Modal onHide={() => setModalShow(false)} show={modalShow} size="xl" scrollable className="share_modal">
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">لینک دعوت</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="col-12 p-0 rtl d-flex justify-content-between align-items-center">
                <textarea
                  value={`با دعوت دوستان خود به قارون در سود خرید و فروش آن ها سهیم باشید. https://qarun.ir/login?user=${userName}`}
                  readOnly
                  className="share_text"
                  ref={textCopy}
                />
                <FaRegCopy className="font_icon copy_icon" onClick={copyText} title="کپی کردن" />
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <SubmitButton loading={loading} onClick={shareLink} text="اشتراک گذاری" className="d-inline-block btn-main rtl">
                <FaShareAlt className="font_icon" />
              </SubmitButton>
            </Modal.Footer>
          </Modal>
          <div className="col-10 pr-4 d-flex justify-content-end">
            <a className={`nav_Icons ${isOpen ? "is_open_toggle" : "toggle"}`} onClick={toggleSideBar}>
              <IoMdMenu className="font_icon sidebar_toggle" />
            </a>
            {/* <SideBar toggle={toggleSideBar} isOpen={isOpen} /> */}
            {/* <Dropdown drop="left" className="dropDownMenu">
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
            </Dropdown> */}
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
            <p className="user_name mt-2">{userName}</p>
          </div>
        </div>
        <div className="row stats rtl mt-2">
          <div
            className="col-4 d-block text-center"
            onClick={() =>
              Router.push(
                {
                  pathname: "/friends",
                  query: { id: id }
                },
                `/friends/${userName}/${id}`
              )
            }
          >
            <p className="friendsTitle">دوستان</p>
            <p className="friends">{friendsCount || 0}</p>
          </div>
          <div
            className="col-4 d-block text-center"
            onClick={() =>
              Router.push(
                {
                  pathname: "/customers",
                  query: { id: id }
                },
                `/customers/${userName}/${id}`
              )
            }
          >
            <p className="customersTitle">مشتریان</p>
            <p className="customers">{customerCount || 0}</p>
          </div>
          <div className="col-4 d-block text-center" onClick={props.scrollToProducts}>
            <p className="productsTitle">محصولات</p>
            <p className="products">{productCount || 0}</p>
          </div>
        </div>
      </div>
      <div className="container info">
        <div className="row rtl">
          <div className="col-12 d-flex top">
            <div
              className="col-4 d-block text-center"
              onClick={() =>
                Router.push({
                  pathname: "/inventory"
                })
              }
            >
              <p>موجودی</p>
              <p className="inventory">{walletCharge ? `${walletCharge} ` : "0 "}</p>
            </div>
            <div
              className="col-4 d-block text-center"
              onClick={() =>
                Router.push({
                  pathname: "/qerun"
                })
              }
            >
              <p>قرون</p>
              <p className="debt">{qerun ? `${qerun} ` : "0 "}</p>
            </div>
            <Link href="/orders" passHref>
              <div className="col-4 d-block text-center">
                <p>سفارشات</p>
                <p className="orders">{deliveredOrderCount ? `${deliveredOrderCount} ` : "0 "}</p>
              </div>
            </Link>
          </div>
          <div className="col-12 pt-3">
            <h2 className="title">{displayName}</h2>
            <p className="bio">{biography ? `${biography}` : " "}</p>
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