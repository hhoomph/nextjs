import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../Link";
import Router from "next/router";
import fetchData from "../../utils/fetchData";
import { FaShareAlt, FaRegCopy, FaUsers } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { TiTickOutline } from "react-icons/ti";
import { ReactComponent as AddUserSvg } from "../../public/static/svg/add-user.svg";
import { ReactComponent as PlusSvg } from "../../public/static/svg/plus.svg";
import { ReactComponent as FirstEditSvg } from "../../public/static/svg/first-edit-profile.svg";
import { ReactComponent as InviteShare } from "../../public/static/svg/invite-share2.svg";
import { Dropdown, Modal } from "react-bootstrap";
import SubmitButton from "../Button/SubmitButton";
import SideBar from "../SideBar/SideBar";
import RRS from "react-responsive-select";
import { ToastContainer, toast } from "react-toastify";
import "../../scss/components/profileHeader.scss";
import Logout from "../Auth/Logout";
import { numberSeparator, removeSeparator, forceNumeric } from "../../utils/tools";
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
  toast.configure({
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
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
      text: "خرید، فروش و درآمد نامحدود، در بازار آنلاین اجتماعی قارون",
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
  const [limitModalShow, setLimitModalShow] = useState(false);
  const sellLimit = props.sellLimit;
  let defaultLimit = null;
  const limitOptions = sellLimit.map(limit => {
    if (limit.id === props.profileData.orderLimitationId) {
      defaultLimit = {
        value: limit.id,
        text: limit.value === 0 ? "بدون محدودیت" : `${numberSeparator(limit.value)} تومان `,
        altered: true,
        key: limit.id
      };
    }
    return {
      value: limit.id,
      text: limit.value === 0 ? "بدون محدودیت" : `${numberSeparator(limit.value)} تومان `,
      altered: false,
      key: limit.id
    };
  });
  const [limitValue, setLimitValue] = useState(defaultLimit);
  const handleLimitSelectChange = ({ text, value, altered }) => {
    setLimitValue({
      text,
      value,
      altered
    });
  };
  const SelectCaretIcon = () => (
    <svg className="caret-icon" x="0px" y="0px" width="11.848px" height="6.338px" viewBox="351.584 2118.292 11.848 6.338">
      <g>
        <path d="M363.311,2118.414c-0.164-0.163-0.429-0.163-0.592,0l-5.205,5.216l-5.215-5.216c-0.163-0.163-0.429-0.163-0.592,0s-0.163,0.429,0,0.592l5.501,5.501c0.082,0.082,0.184,0.123,0.296,0.123c0.103,0,0.215-0.041,0.296-0.123l5.501-5.501C363.474,2118.843,363.474,2118.577,363.311,2118.414L363.311,2118.414z" />
      </g>
    </svg>
  );
  const changeLimit = async () => {
    if (limitValue !== null && limitValue.value !== undefined) {
      setLoading(true);
      const result = await fetchData(
        `User/U_Product/EditOrderLimitation?limitationId=${limitValue.value}`,
        {
          method: "GET"
        },
        props.ctx
      );
      if (result !== undefined && result.isSuccess) {
        setLimitModalShow(false);
      } else if (result !== undefined && result.message != undefined) {
        toast.warn(result.message);
      } else if (result !== undefined && result.error != undefined) {
        toast.error(result.error);
      }
      setLoading(false);
    } else {
      toast.warn("لطفا یک گزینه محدودیت فروش را انتخاب کنید.");
    }
  };
  const [showFirstEdit, setShowFirstEdit] = useState(
    props.profileData !== null && props.profileData.userName !== undefined && props.profileData.userName !== "" && props.profileData.userName !== null ? false : true
  );
  return (
    <>
      <SideBar toggle={toggleSideBar} isOpen={isOpen} setIsOpen={setIsOpen} userName={userName} setView={props.setView} setLimitModalShow={setLimitModalShow} />
      <div className="container profile_header">
        <div className="row">
          <div className="col-2 pl-4 d-flex">
            <a
              className="nav_Icons active"
              onClick={() => {
                if (userName !== undefined && userName !== "" && props.profileData.canInvite === true) {
                  setModalShow(true);
                } else {
                  toast.warn("برای دعوت از دوستان باید اطلاعات نمایه خود را تکمیل نمایید.");
                }
              }}
            >
              <AddUserSvg className="svg_Icons" />
            </a>
          </div>
          {/* Invite Modal */}
          <Modal onHide={() => setModalShow(false)} show={modalShow} size="xl" scrollable className="share_modal">
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">لینک دعوت</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="col-12 rtl">
                <p className="invite_info">با دعوت و اضافه کردن دوستان خود به بازار قارون از یک درصد مبلغ خرید ها و فروش های آنها پاداش دریافت کنید.</p>
                <Link href="/terms" passHref>
                  <a className="more_btn">بیشتر</a>
                </Link>
              </div>
              <div className="col-12 p-0 rtl d-flex justify-content-between align-items-center">
                <textarea value={"خرید، فروش و درآمد نامحدود، در بازار آنلاین اجتماعی قارون." + "\n" + `https://qarun.ir/login?user=${userName}`} readOnly className="share_text" ref={textCopy} />
                <FaRegCopy className="font_icon copy_icon" onClick={copyText} title="کپی کردن" />
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <SubmitButton loading={loading} onClick={shareLink} text="اشتراک گذاری" className="d-inline-block btn-main rtl">
                <FaShareAlt className="font_icon" />
              </SubmitButton>
            </Modal.Footer>
          </Modal>
          {/* Sell Limit Modal */}
          <Modal onHide={() => setLimitModalShow(false)} show={limitModalShow} size="xl" scrollable className="share_modal">
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">تعیین محدودیت فروش</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="col-12 p-0 rtl d-flex">
                <label className="col-5 col-form-label text-right pr-0 pl-0">محدودیت فروش :</label>
                <div className="col-7 pr-0 pl-1">
                  <RRS
                    id={limitValue !== null ? "not_empty_select" : "empty_select"}
                    noSelectionLabel={"انتخاب کنید"}
                    name="category"
                    options={limitOptions}
                    onChange={handleLimitSelectChange}
                    caretIcon={<SelectCaretIcon key="c1" />}
                    selectedValue={limitValue !== null ? limitValue.value : null}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <SubmitButton loading={loading} onClick={changeLimit} text="ثبت محدودیت" className="d-inline-block btn-main">
                <TiTickOutline className="font_icon" />
              </SubmitButton>
            </Modal.Footer>
          </Modal>
          <div className="col-10 pr-4 d-flex justify-content-end">
            <a className={`nav_Icons ${isOpen ? "is_open_toggle" : "toggle"}`} onClick={toggleSideBar}>
              <IoMdMenu className="font_icon sidebar_toggle" />
            </a>
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
            <Link href="/order" passHref>
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
          {showFirstEdit && (
            <div className="col-12 mb-2 d-flex justify-content-center first_edit_profile">
              <div
                className="d-flex align-items-center align-self-center complate_info"
                onClick={() => {
                  props.setView(2);
                }}
              >
                <a>تکمیل اطلاعات نمایه</a>
                <div className="ml-3 edit_icon">
                  <FirstEditSvg className="svg_icon" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default memo(Header);