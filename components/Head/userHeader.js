import React, { useState, useEffect, memo } from "react";
import Link from "../Link";
import Router from "next/router";
import fetchData from "../../utils/fetchData";
import Loading from "../Loader/Loader";
import SubmitButton from "../Button/SubmitButton";
import { FaShoppingBasket, FaRegUserCircle } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
// import { ReactComponent as SendSvg } from "../../public/static/svg/send.svg";
import { ReactComponent as SendSvg } from "../../public/static/svg/new/send.svg";
import { ReactComponent as AddUserSvg } from "../../public/static/svg/add-user.svg";
import { ReactComponent as DistanceSvg } from "../../public/static/svg/distance.svg";
import { ToastContainer, toast } from "react-toastify";
import { Dropdown, Modal } from "react-bootstrap";
import RRS from "react-responsive-select";
import "../../scss/components/profileHeader.scss";
const Header = props => {
  const nextCtx = props.ctx;
  const profileData = props.profileData;
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [followed, setFollowed] = useState(profileData.followed);
  const reportOptions = [
    {
      value: 1,
      text: "انتشار محتوای نامناسب",
      altered: false,
      key: 1
    },
    {
      value: 2,
      text: "نقض قوانین فروش",
      altered: false,
      key: 2
    }
  ];
  const [reportReason, setReportReason] = useState(null);
  const handleReportSelectChange = ({ text, value, altered }) => {
    setReportReason({
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
  toast.configure({
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  const UserImage = () => {
    if (profileData.avatar && profileData.avatar != null) {
      return <img src={`https://api.qarun.ir/${profileData.avatar}`} alt="user image" className="rounded-circle" />;
    } else {
      return <img src={"/static/img/no-userimage.svg"} alt="user image" className="rounded-circle" />;
    }
  };
  const UserStatus = () => {
    if (props.userOnline) {
      return (
        <div className="status online" title="آنلاین">
          <span></span>
        </div>
      );
    } else {
      return (
        <div className="status offline" title="آفلاین">
          <span></span>
        </div>
      );
    }
  };
  const followToggle = async () => {
    setLoading(true);
    const result = await fetchData(
      `User/U_Friends/Follow?userId=${profileData.id}`,
      {
        method: "GET"
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
        method: "GET"
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
  const shareLink = async () => {
    setLoading(true);
    const shareData = {
      title: "قارون",
      url: `https://qarun.ir/user/${profileData.userName}`
    };
    try {
      await navigator.share(shareData);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };
  const reportUser = async () => {
    if (reportReason !== null && reportReason.value !== undefined) {
      setLoading(true);
      const result = await fetchData(
        "User/U_Account/ReportUser",
        {
          method: "POST",
          body: JSON.stringify({
            userId: profileData.id,
            reason4Report: reportReason ? reportReason.value : null
          })
        },
        nextCtx
      );
      if (result.isSuccess) {
        toast.success("تخلف کاربر با موفقیت ثبت شد.");
      }
      setModalShow(false);
      setLoading(false);
    } else {
      toast.warn("لطفا دلیل تخلف کاربر را مشخص کنید.");
    }
  };
  return (
    <>
      <div className="container profile_header">
        <div className="row">
          <div className="col-6 pl-2 d-flex">
            <Dropdown drop="right" className="dropDownMenu more_menu_dropdown">
              <Dropdown.Toggle>
                <a className="nav_Icons">
                  <IoMdMore className="svg_Icons more_menu" />
                </a>
              </Dropdown.Toggle>
              <Dropdown.Menu className="rtl profile_menu">
                <Dropdown.Item eventKey="2" onClick={shareLink}>
                  اشتراک گذاری نمایه
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="1" onClick={() => setModalShow(true)}>
                  گزارش تخلف
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Modal onHide={() => setModalShow(false)} show={modalShow} size="xl" scrollable className="report_modal">
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter"> گزارش تخلف</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="col-12 p-0 rtl d-flex">
                <label className="col-5 col-form-label text-right">دلیل گزارش </label>
                <div className="col-7">
                  <RRS
                    id={reportReason !== null ? "not_empty_select" : "empty_select"}
                    noSelectionLabel={"انتخاب کنید"}
                    name="category"
                    options={reportOptions}
                    onChange={handleReportSelectChange}
                    caretIcon={<SelectCaretIcon key="c1" />}
                    selectedValue={reportReason !== null ? reportReason.value : null}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <SubmitButton loading={loading} onClick={reportUser} text="ثبت تخلف" className="d-inline-block btn-main rtl" />
            </Modal.Footer>
          </Modal>
          <div className="col-6 pr-4 d-flex justify-content-end">
            <Link href="" passHref>
              <a className="nav_Icons">
                <SendSvg className="svg_Icons send_icon" />
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
          <div
            className="col-4 d-block text-center"
            onClick={() =>
              Router.push(
                {
                  pathname: "/friends",
                  query: { id: profileData.id }
                },
                `/friends/${profileData.userName}/${profileData.id}`
              )
            }
          >
            <p>دوستان</p>
            <p className="friends">{profileData.friendsCount}</p>
          </div>
          <div
            className="col-4 d-block text-center"
            onClick={() =>
              Router.push(
                {
                  pathname: "/customers",
                  query: { id: profileData.id }
                },
                `/customers/${profileData.userName}/${profileData.id}`
              )
            }
          >
            <p>مشتریان</p>
            <p className="customers">{profileData.customerCount}</p>
          </div>
          <div className="col-4 d-block text-center" onClick={props.scrollToProducts}>
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
            </div>
            <div className="col-6 d-block distance">
              <DistanceSvg className="svg_Icons" />
              <p>{parseFloat(profileData.geographicalDistance).toFixed(2)} کیلومتر</p>
            </div>
          </div>
          <div className="col-12 pt-3">
            <h2 className="title">{profileData.displayName}</h2>
            <p className="bio">{profileData.biography}</p>
            {/* <img className="logo_img" src={"/static/img/logo_opacity.png"} /> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(Header);