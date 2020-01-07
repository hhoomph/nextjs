import React, { Fragment, useContext, useReducer, useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Loading from "../components/Loader/Loading";
import Link from "../components/Link";
import Router from "next/router";
import Nav from "../components/Nav/Nav";
import ProfileHeader from "../components/Head/profileHeader";
import Product from "../components/Profile/product";
import Auth from "../components/Auth/Auth";
import fetchData from "../utils/fetchData";
import { UserProductsContext } from "../context/context";
import { userProductsReducer } from "../context/reducer";
import { ReactComponent as AddSvg } from "../public/static/svg/add.svg";
import { ReactComponent as InviteShare } from "../public/static/svg/invite-share2.svg";
import { FaShareAlt, FaRegCopy } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import SubmitButton from "../components/Button/SubmitButton";
import { ToastContainer, toast } from "react-toastify";
const Category = dynamic({
  loader: () => import("../components/Profile/Category"),
  loading: () => <Loading />,
  ssr: true
});
const EditProfile = dynamic({
  loader: () => import("../components/Profile/editProfile"),
  loading: () => <Loading />,
  ssr: true
});
const MapComponent = dynamic({
  loader: () => import("../components/Map/LocationMap2"),
  loading: () => <Loading />,
  ssr: false
});
function Page(props) {
  const [view, setView] = useState(1);
  const resultData = props.result.data || [];
  const productsData = props.userProducts.data !== undefined ? props.userProducts.data.model : [];
  const [profileData, setProfileData] = useState(resultData);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const sellLimit = props.sellLimit !== undefined && props.sellLimit.data !== undefined && props.sellLimit.data !== null ? props.sellLimit.data : [];
  const [userProducts, userProductsDispatch] = useReducer(userProductsReducer, productsData);
  let userCategories = props.userCategories.data || [];
  userCategories = [].concat(userCategories, { id: 0, parentId: null, picture: null, thumbNail: null, titel: "همه" }).sort((a, b) => a.id - b.id);
  const [catActive, setCatActive] = useState(userCategories.length > 0 ? userCategories[0].id : null);
  // Get Current Location If User not setted his location
  const [lat, setLat] = useState(resultData.lat || 0);
  const [long, setLong] = useState(resultData.long || 0);
  const [markPosition, setMarkPosition] = useState([resultData.lat || 0, resultData.long || 0]);
  const [city, setCity] = useState(null);
  toast.configure({
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  const showProducts = userProducts.map(product => (
    <Product
      key={product.productId}
      id={product.productId}
      name={product.title}
      profile={true}
      isDisable={product.isDisable}
      price={product.lastPrice}
      oldPrice={product.price}
      image={product.picture !== undefined && product.picture !== null ? `https://api.qarun.ir/${product.picture}` : "/static/img/no-product-image.png"}
    />
  ));
  const getProfileData = async () => {
    const result = await fetchData(
      "User/U_Account/Profile",
      {
        method: "GET"
      },
      props.ctx
    );
    if (result.isSuccess) {
      setProfileData(result.data);
    }
  };
  const getUserProduct = async () => {
    setLoading(true);
    const result = await fetchData(
      "User/U_Product/UserProduct",
      {
        method: "POST",
        body: JSON.stringify({
          userId: profileData.id,
          categoryId: catActive,
          page: page,
          pageSize: 6
        })
      },
      props.ctx
    );
    if (result !== undefined && result.isSuccess) {
      userProductsDispatch({ type: "add", payload: result.data.model });
      setPage(page + 1);
      if (result.data.model.length >= 6) {
        setTimeout(() => setIsFetching(false), 200);
      }
    } else if (result.message != undefined) {
      setTimeout(() => setIsFetching(false), 200);
    } else if (result.error != undefined) {
      setTimeout(() => setIsFetching(false), 200);
    }
    setLoading(false);
  };
  const getUserProductFromCat = async () => {
    setLoading(true);
    const result = await fetchData(
      "User/U_Product/UserProduct",
      {
        method: "POST",
        body: JSON.stringify({
          userId: profileData.id,
          categoryId: catActive,
          page: 1,
          pageSize: 6
        })
      },
      props.ctx
    );
    if (result.isSuccess) {
      userProductsDispatch({ type: "refresh", payload: [] });
      userProductsDispatch({ type: "refresh", payload: result.data.model });
      setPage(page + 1);
      if (result.data.model.length >= 6) {
        setTimeout(() => setIsFetching(false), 200);
      }
    } else if (result.message != undefined) {
      setTimeout(() => setIsFetching(false), 200);
    } else if (result.error != undefined) {
      setTimeout(() => setIsFetching(false), 200);
    }
    setLoading(false);
  };
  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop + 100 < document.documentElement.offsetHeight || isFetching) return;
    setIsFetching(true);
  }
  const productRef = useRef();
  const scrollToProducts = () => {
    if (!showFirstAdd) {
      const productsDiv = productRef.current.clientHeight;
      const t = window.innerHeight - productsDiv + 100;
      window.scrollTo(0, t);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (!isFetching) return;
    getUserProduct();
  }, [isFetching]);
  useEffect(() => {
    getProfileData();
  }, [view]);
  useEffect(() => {
    getUserProductFromCat();
  }, [catActive]);
  const [showFirstAdd, setShowFirstAdd] = useState(profileData !== null && profileData.productCount > 0 ? false : true);
  const [modalShow, setModalShow] = useState(false);
  const textCopy = useRef();
  const copyText = () => {
    const txt = textCopy.current;
    txt.select();
    txt.setSelectionRange(0, 99999);
    document.execCommand("copy");
  };
  const shareLink = async () => {
    if (profileData !== null && profileData.userName !== undefined && profileData.userName !== "" && profileData.userName !== null) {
      setLoading(true);
      const shareData = {
        title: "دعوت به قارون",
        text: "خرید، فروش و درآمد نامحدود، در بازار آنلاین اجتماعی قارون",
        url: `https://qarun.ir/login?user=${profileData.userName}`
      };
      try {
        await navigator.share(shareData);
        setLoading(false);
      } catch (e) {
        //console.log("Share Error : ", e);
        copyText();
        setLoading(false);
      }
    } else {
      toast.warn("لطفا اطلاعات نمایه خود را تکمیل کنید.");
    }
  };
  switch (view) {
  case 1:
    if (typeof window !== "undefined") {
      //window.scroll(0, 0);
    }
    return (
      <UserProductsContext.Provider value={userProductsDispatch}>
        <div className="profile_container">
          <Nav />
          <ProfileHeader profileData={profileData} setView={setView} scrollToProducts={scrollToProducts} sellLimit={sellLimit} />
          {showFirstAdd ? (
            <div className="container mt-2 mb-1 p-2 first_add_suggest_profile">
              <div className="row d-flex justify-content-around rtl">
                <div
                  className="col-5 p-2 first_add_col"
                  title="افزودن محصول"
                  onClick={() => {
                    if (profileData !== null && profileData.userName !== undefined && profileData.userName !== "" && profileData.canInvite === true) {
                      Router.push({
                        pathname: "/add-product"
                      });
                    } else {
                      toast.warn("برای افزودن محصول باید اطلاعات نمایه خود را کامل کنید.");
                    }
                  }}
                >
                  <div className="icon_container first_add_product">
                    <AddSvg className="svg_icon" />
                  </div>
                  <a className="first_add">افزودن محصول</a>
                </div>
                <div
                  className="col-5 p-2 first_add_col"
                  title="دعوت دوستان"
                  onClick={() => {
                    if (profileData !== null && profileData.userName !== undefined && profileData.userName !== "" && profileData.canInvite === true) {
                      setModalShow(true);
                    } else {
                      toast.warn("برای دعوت از دوستان باید اطلاعات نمایه خود را تکمیل نمایید.");
                    }
                  }}
                >
                  <div className="icon_container">
                    <InviteShare className="svg_icon" />
                  </div>
                  <a className="first_add">دعوت دوستان</a>
                </div>
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
                    <textarea
                      value={"خرید، فروش و درآمد نامحدود، در بازار آنلاین اجتماعی قارون." + "\n" + `https://qarun.ir/login?user=${profileData.userName !== undefined ? profileData.userName : ""}`}
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
            </div>
          ) : (
            <>
              <div className="container mb-1 cat_product_row">
                <div className="row">
                  <div className="col">
                    <div className="row d-flex justify-content-start rtl pr-2 categories">
                      <Category categories={userCategories} catActive={catActive} setCatActive={setCatActive} setPage={setPage} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="container mb-5 pb-3 pt-3">
                <div className="row d-flex justify-content-start rtl profile_products" ref={productRef}>
                  {showProducts}
                </div>
                {loading && (
                  <div
                    style={{
                      display: "block !important",
                      width: "100%",
                      height: "40px",
                      textAlign: "center",
                      marginTop: "0.1rem"
                    }}
                  >
                    <Loading />
                  </div>
                )}
              </div>{" "}
            </>
          )}
        </div>
      </UserProductsContext.Provider>
    );
    break;
  case 2:
    return (
      <>
        <Nav />
        <EditProfile setView={setView} profileData={profileData} />
      </>
    );
    break;
  default:
    if (typeof window !== "undefined") {
      window.scroll(0, 0);
    }
    return (
      <UserProductsContext.Provider value={userProductsDispatch}>
        <Nav />
        <ProfileHeader setView={setView} profileData={profileData} scrollToProducts={scrollToProducts} sellLimit={sellLimit} />
        {showFirstAdd ? (
          <div className="container mt-2 mb-1 p-2 first_add_suggest_profile">
            <div className="row d-flex justify-content-around rtl">
              <div
                className="col-5 p-2 first_add_col"
                title="افزودن محصول"
                onClick={() => {
                  if (profileData !== null && profileData.userName !== undefined && profileData.userName !== "" && profileData.canInvite === true) {
                    Router.push({
                      pathname: "/add-product"
                    });
                  } else {
                    toast.warn("برای افزودن محصول باید اطلاعات نمایه خود را کامل کنید.");
                  }
                }}
              >
                <div className="icon_container first_add_product">
                  <AddSvg className="svg_icon" />
                </div>
                <a className="first_add">افزودن محصول</a>
              </div>
              <div
                className="col-5 p-2 first_add_col"
                title="دعوت دوستان"
                onClick={() => {
                  if (profileData !== null && profileData.userName !== undefined && profileData.userName !== "" && profileData.canInvite === true) {
                    setModalShow(true);
                  } else {
                    toast.warn("برای دعوت از دوستان باید اطلاعات نمایه خود را تکمیل نمایید.");
                  }
                }}
              >
                <div className="icon_container">
                  <InviteShare className="svg_icon" />
                </div>
                <a className="first_add">دعوت دوستان</a>
              </div>
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
                  <textarea
                    value={"خرید، فروش و درآمد نامحدود، در بازار آنلاین اجتماعی قارون." + "\n" + `https://qarun.ir/login?user=${profileData.userName !== undefined ? profileData.userName : ""}`}
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
          </div>
        ) : (
          <>
            <div className="container mb-1 cat_product_row">
              <div className="row">
                <div className="col">
                  <div className="row d-flex justify-content-start rtl pr-2 categories">
                    <Category categories={userCategories} catActive={catActive} setCatActive={setCatActive} setPage={setPage} />
                  </div>
                </div>
              </div>
            </div>
            <div className="container mb-5 pb-3 pt-3">
              <div className="row d-flex justify-content-start rtl profile_products" ref={productRef}>
                {showProducts}
              </div>
              {loading && (
                <div
                  style={{
                    display: "block !important",
                    width: "100%",
                    height: "40px",
                    textAlign: "center",
                    marginTop: "0.1rem"
                  }}
                >
                  <Loading />
                </div>
              )}
            </div>{" "}
          </>
        )}
      </UserProductsContext.Provider>
    );
    break;
  }
}
Page.getInitialProps = async function(context) {
  const req = context.req;
  const result = await fetchData(
    "User/U_Account/Profile",
    {
      method: "GET"
    },
    context
  );
  let userProducts = [];
  let userCategories = [];
  if (result !== undefined && result.data !== undefined && result.data.id !== undefined) {
    userProducts = await fetchData(
      "User/U_Product/UserProduct",
      {
        method: "POST",
        body: JSON.stringify({
          userId: result.data.id,
          categoryId: 0,
          page: 1,
          pageSize: 6
        })
      },
      context
    );
    userCategories = await fetchData(
      `User/U_Product/CategoiesHaveProduct?userId=${result.data.id}`,
      {
        method: "GET"
      },
      context
    );
  }
  const sellLimit = await fetchData(
    "Common/C_Info/GetOrderLimitation",
    {
      method: "GET"
    },
    context
  );
  return { result, userProducts, userCategories, isServer: !!req, sellLimit, date: new Date() };
};
export default Auth(Page);