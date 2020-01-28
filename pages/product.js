import React, { Fragment, useContext, useState, useRef, useEffect, memo } from "react";
import dynamic from "next/dynamic";
import fetchData from "../utils/fetchData";
import Nav from "../components/Nav/Nav";
import Loading from "../components/Loader/Loading";
import Auth from "../components/Auth/Auth";
import SubmitButton from "../components/Button/SubmitButton";
import Link from "../components/Link";
import { useRouter } from "next/router";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import { FaPlus, FaRegComment, FaRegHeart, FaHeart, FaEllipsisV } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { IoMdMore, IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
// import { ReactComponent as MenuDotsSvg } from "../public/static/svg/menu-dots.svg";
import { ReactComponent as CommentSvg } from "../public/static/svg/new/comment.svg";
// import { ReactComponent as LikeSvg } from "../public/static/svg/new/like.svg";
import { ReactComponent as MenuDotsSvg } from "../public/static/svg/new/menu-dots.svg";
import { numberSeparator, removeSeparator, forceNumeric } from "../utils/tools";
import { Carousel, Dropdown, Modal } from "react-bootstrap";
import RRS from "react-responsive-select";
import ImageGallery from "react-image-gallery";
import "../scss/components/productPage.scss";
import { setTimeout } from "core-js";
function Page(props) {
  const productData = props.result.data || [];
  const Router = useRouter();
  //const { productId } = Router.query;
  const productId = Router.query.id;
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
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
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  const addToCart = async () => {
    setLoading(true);
    const result = await fetchData(
      "User/U_Cart/Add",
      {
        method: "POST",
        body: JSON.stringify({
          productId: productId,
          count: 1
        })
      },
      props.ctx
    );
    if (result !== undefined && result.isSuccess !== undefined && result.isSuccess) {
      //toast.success('محصول شما با موفقیت به سبد خرید اضافه شد.');
      Router.push("/cart");
    } else if (result !== undefined && result.message !== undefined) {
      toast.warn(result.message);
    } else if (result !== undefined && result.error !== undefined) {
      toast.error(result.error);
    }
    setLoading(false);
  };
  const discountPercent = () => {
    if (productData.discount !== 0) {
      let d = (100 * productData.discount) / productData.price;
      return d.toFixed(0);
    } else {
      return 0;
    }
  };
  const images = productData.pictures.map((image, index) => {
    return {
      original: `https://api.qarun.ir/${image.value}`,
      thumbnail: `https://api.qarun.ir/${image.value}`
    };
  });
  const showProductImages = productData.pictures.map((image, index) => (
    <Carousel.Item
      key={image.id}
      onClick={() => {
        setStartIndex(index);
        setShowGallery(true);
      }}
    >
      <img src={`https://api.qarun.ir/${image.value}`} className="product_image" />
    </Carousel.Item>
  ));
  const [isFavorite, setIsFavorite] = useState(productData.isFavorited !== null ? productData.isFavorited : false);
  const toggleFavorite = async () => {
    setLoading(true);
    const Result = await fetchData(
      `User/U_Favorite/SaveOrUnSave?productId=${productId}`,
      {
        method: "GET"
      },
      props.ctx
    );
    if (Result !== undefined && Result.isSuccess) {
      setIsFavorite(!isFavorite);
    }
    setLoading(false);
  };
  const shareLink = async () => {
    setLoading(true);
    const shareData = {
      title: `${productData.title}`,
      text: `${productData.title}`,
      url: `https://qarun.ir/product/${productId}/${productData.title.trim().replace(/ /g, "-")}`
    };
    try {
      await navigator.share(shareData);
      setLoading(false);
    } catch (e) {
      //console.log("Share Error : ", e);
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
            userId: productData.sellerId,
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
  const showHashtags = productData.hashtags.map(h => (
    <Link href={`/hashtags/${h.replace("#", "")}`} passHref key={h}>
      <a className="hashtag" title={h.replace("#", "")}>
        {h}
      </a>
    </Link>
  ));
  // Determine Server Or Browser env
  if (typeof window !== "undefined" && window.document !== undefined) {
    //console.log('browser');
  } else if (process) {
    //console.log('node');
  }
  const nextCtx = props.ctx;
  return (
    <>
      <Head>{productData.title}</Head>
      <title>{productData.title}</title>
      <Nav _tkn={props._tkn} />
      <div className="product_page">
        <div className="container product_header">
          <div className="row">
            <div className="col-4 text-left align-self-center">
              {/* <a className="nav_Icons active">
                <MenuDotsSvg className="svg_icon" />
              </a> */}
              <Dropdown drop="right" className="dropDownMenu more_menu_dropdown">
                <Dropdown.Toggle>
                  <a className="nav_Icons">
                    <IoMdMore className="font_icon more_menu" />
                  </a>
                </Dropdown.Toggle>
                <Dropdown.Menu className="rtl profile_menu">
                  <Dropdown.Item eventKey="1" onClick={() => setModalShow(true)}>
                    گزارش تخلف
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="col-8 text-right align-self-center">
              <Link href={`/user/${productData.sellerUserName}`} passHref>
                <a>
                  <p className="user_name">{productData.sellerUserName || ""}</p>
                  <img src={productData.sellerUserAvatar ? `https://api.qarun.ir/${productData.sellerUserAvatar}` : "/static/img/user.png"} className="userImage" />
                </a>
              </Link>
            </div>
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
        </div>
        <div className="container p-0 product_images">
          <div className="row">
            <div className="col-12">
              <Carousel fade={true} indicators={true} interval={6000} keyboard={true} pauseOnHover={true} slide={true} wrap={true} touch={true}>
                {showProductImages}
              </Carousel>
              {discountPercent() > 0 && <div className="discount_div">%{discountPercent()}</div>}
            </div>
          </div>
        </div>
        <Modal onHide={() => setShowGallery(false)} show={showGallery} size="xl" scrollable className="gallery_modal">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className="col-12 p-0 rtl d-flex justify-content-center img_gallery_container">
              <ImageGallery
                items={images}
                isRTL={true}
                startIndex={startIndex}
                showIndex={false}
                showFullscreenButton={false}
                showPlayButton={false}
                showThumbnails={true}
                showBullets={true}
                lazyLoad={true}
                useBrowserFullscreen={false}
              />
            </div>
          </Modal.Body>
        </Modal>
        <div className="container pt-2 product_details">
          <div className="row">
            <div className="col-6 text-left _top_icons">
              {/* <ShareSvg className="svg_icon ml-2" /> */}
              <FiShare2 className="font_icon" onClick={shareLink} />
            </div>
            <div className="col-6 text-right _top_icons">
              {/* <HeartSvg className="svg_icon" /> */}
              <div
                className="comment_counter"
                onClick={() =>
                  Router.push({
                    pathname: "/comment",
                    query: { id: productId }
                  })
                }
              >
                <div className="comment_count">{productData.commentCount || "0"}</div>
                <CommentSvg className="svg_icon" />
                {/* <FaRegComment className="font_icon" /> */}
              </div>
              {isFavorite ? <IoIosHeart className="font_icon red" onClick={toggleFavorite} /> : <IoIosHeartEmpty className="font_icon" onClick={toggleFavorite} />}
            </div>
            <div className="col-12 mt-1">
              <p className="text-right product_name">{productData.title || ""}</p>
            </div>
            <div className="col-12 rtl">
              <span className="price_title"> قیمت :</span> <span className="price">{numberSeparator(productData.lastPrice) || ""} تومان</span>{" "}
              <span className="price_old">{productData.price !== productData.lastPrice ? numberSeparator(productData.price) + " تومان " : ""} </span>
            </div>
            <div className="col-12 mt-1 text-center">
              <SubmitButton loading={loading} onClick={addToCart} text="افزودن به سبد خرید" className="d-inline-block btn-main">
                <FaPlus className="font_icon" />
              </SubmitButton>
            </div>
            <div className="mt-3 rtl description">
              <p className="describe_title">توضیحات</p>
              <p className="describe_text">{productData.description || ""}</p>
            </div>
          </div>
        </div>
        <div className="container pb-5 pt-2 product_hashtags">
          <div className="row pb-3">
            <div className="col-12 mt-2 text-right">{/* <h6 className="">هشتگ ها</h6> */}</div>
            <div className="col-12 rtl">
              <Link href={`/categories/${productData.categoryId.replace(",", "")}`} passHref>
                <a className="hashtag" style={{ fontWeight: "bold", color: "#2f2e2e" }} title={productData.category.replace(",", "")}>
                  #{productData.category.replace(",", "")}
                </a>
              </Link>
              {showHashtags}
            </div>
          </div>
        </div>
        {/* <div className="container mb-3 pt-2 related_products">
          <div className="row">
            <div className="col-12">
              <div className="related_product_ttile">
                محصولات مرتبط
                <div className="arrow-down"></div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
Page.getInitialProps = async function(context) {
  //console.log(context);
  const { id } = context.query;
  const result = await fetchData(
    `User/U_Product/ProductDetails?ProductId=${id}`,
    {
      method: "GET"
      // body: JSON.stringify({
      //   username: id
      // })
    },
    context
  );
  return { result, id };
};
// export default Auth(Page);
export default Page;