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
import { FaPlus, FaRegComment, FaRegHeart, FaEllipsisV } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { ReactComponent as MenuDotsSvg } from "../public/static/svg/menu-dots.svg";
import { numberSeparator, removeSeparator, forceNumeric } from "../utils/tools";
import Carousel from "react-bootstrap/Carousel";
import "../scss/components/productPage.scss";
import { setTimeout } from "core-js";
function Page(props) {
  const productData = props.result.data || [];
  const Router = useRouter();
  //const { productId } = Router.query;
  const productId = Router.query.id;
  const [loading, setLoading] = useState(false);
  toast.configure({
    position: "top-right",
    autoClose: 2000,
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
  const showProductImages = productData.pictures.map((image, index) => (
    <Carousel.Item key={image.id}>
      <img src={`https://api.qarun.ir/${image.value}`} className="product_image" />
    </Carousel.Item>
  ));
  const [isFavorite, setIsFavorite] = useState(false);
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
  //console.log(productData);
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
      <Nav />
      <div className="product_page">
        <div className="container product_header">
          <div className="row">
            <div className="col-4 text-left">
              <a className="nav_Icons active">
                <MenuDotsSvg className="svg_icon" />
                {/* <FaEllipsisV className="font_icon"/> */}
              </a>
            </div>
            <div className="col-8 text-right">
              <Link href={`/user/${productData.sellerUserName}`} passHref>
                <a>
                  <p className="user_name">{productData.sellerUserName || ""}</p>
                  <img src={productData.sellerUserAvatar ? `https://api.qarun.ir/${productData.sellerUserAvatar}` : "/static/img/user.png"} className="userImage" />
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="container product_images">
          <div className="row">
            <div className="col-12">
              <Carousel fade={true} indicators={true} interval={6000} keyboard={true} pauseOnHover={true} slide={true} wrap={true} touch={true}>
                {/* <Carousel.Item>
                  <img src="/static/img/1.jpg" className="product_image" />
                  <Carousel.Caption>
                    <h3>{productData.title || ''}</h3>
                    <p>{productData.description || ''}</p>
                  </Carousel.Caption>
                </Carousel.Item> */}
                {/* <Carousel.Item>
                  <img src={productData.picture ? 'https://api.qarun.ir/' + productData.picture : '/static/img/no-product-image.png'} className="product_image" />
                </Carousel.Item> */}
                {showProductImages}
              </Carousel>
              {discountPercent() > 0 && <div className="discount_div">%{discountPercent()}</div>}
            </div>
          </div>
        </div>
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
                {/* <CommentSvg className="svg_icon" /> */}
                <FaRegComment className="font_icon" />
              </div>
              <FaRegHeart className={`font_icon ${isFavorite ? "red" : ""}`} onClick={toggleFavorite} />
            </div>
            <div className="col-12 mt-1">
              <p className="text-right product_name">{productData.title || ""}</p>
            </div>
            <div className="col-12 rtl">
              <span className="price_title"> قیمت :</span> <span className="price">{numberSeparator(productData.lastPrice) || ""} تومان</span>{" "}
              <span className="price_old">{numberSeparator(productData.price) || ""} تومان</span>
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
        <div className="container mb-3 pt-2 related_products">
          <div className="row">
            <div className="col-12">
              <div className="related_product_ttile">
                محصولات مرتبط
                <div className="arrow-down"></div>
              </div>
            </div>
          </div>
        </div>
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
//export default Auth(Page);
export default Page;