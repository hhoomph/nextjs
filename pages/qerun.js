import React, { Fragment, useContext, useReducer, useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Loading from "../components/Loader/Loading";
import { useRouter } from "next/router";
import Link from "../components/Link";
import Head from "next/head";
import Nav from "../components/Nav/Nav";
import ProfileHeader from "../components/Head/profileHeader";
import Product from "../components/Profile/product";
import Auth from "../components/Auth/Auth";
import fetchData from "../utils/fetchData";
import SubmitButton from "../components/Button/SubmitButton";
import { numberSeparator, removeSeparator, forceNumeric, fixNumbers } from "../utils/tools";
import { FaArrowLeft, FaTimes, FaArrowRight, FaMinus, FaPlus, FaCaretDown, FaCaretUp, FaExchangeAlt, FaMoneyBill, FaSearch } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "../scss/components/inventory.scss";
const User = dynamic({
  loader: () => import("../components/Search/User2"),
  loading: () => <Loading />,
  ssr: true
});
const Ask = dynamic({
  loader: () => import("../components/Modal/Ask"),
  loading: () => <Loading />,
  ssr: true
});
function Page(props) {
  const Router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [transferModalShow, setTransferModalShow] = useState(false);
  const [sellQerun, setSellQerun] = useState("");
  const _Inventory = props.Inventory !== undefined && props.Inventory.data !== undefined ? props.Inventory.data : [];
  const [inventory, setInventory] = useState(_Inventory);
  const [qerun, setQerun] = useState(inventory.qerun || 0);
  const [transactions, setTransactions] = useState(inventory.transactions || []);
  const GetWithdrawal = props.GetWithdrawal ? props.GetWithdrawal.data : [];
  const [askModalShow, setAskModalShow] = useState(false);
  const [tQerun, setTQerun] = useState(null);
  const [targetUserId, setTargetUserId] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(props.Following.data || []);
  const [update, setUpdate] = useState(false);
  const searchInput = useRef();
  toast.configure({
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  const showTransactions = transactions.map((t, index) => {
    let type = "_sell";
    const Icon = () => {
      switch (t.type) {
      case 1:
        return <FaCaretDown className="font_icon" />;
        break;
      case 2:
        return <FaCaretUp className="font_icon" />;
        type = "_buy";
        break;
      case 3:
        return <FaCaretDown className="font_icon" />;
        break;
      case 4:
        return <FaCaretDown className="font_icon" />;
        break;
      case 5:
        return <FaCaretDown className="font_icon" />;
        break;
      case 6:
        return <FaCaretUp className="font_icon" />;
        type = "_buy";
        break;
      case 7:
        return <FaCaretDown className="font_icon" />;
        break;
      case 8:
        return <FaCaretDown className="font_icon" />;
        break;
      case 9:
        return <FaCaretUp className="font_icon" />;
        type = "_buy";
        break;
      default:
        return <FaCaretDown className="font_icon" />;
        break;
      }
    };
    const PType = () => {
      switch (t.paymentType) {
      case 1:
        return <p className="type">پرداخت آنلاین</p>;
        break;
      case 2:
        return <p className="type">پرداخت با موبایل</p>;
        break;
      case 3:
        return <p className="type">انتقال به حساب</p>;
        break;
      case 4:
        return <p className="type">نقدی</p>;
        break;
      case 5:
        return <p className="type">قرون</p>;
        break;
      case 6:
        return <p className="type">برداشت از حساب</p>;
        break;
      default:
        return <p className="type">نقدی</p>;
        break;
      }
    };
    return (
      <div className={`col-12 d-flex p-1 ${type}`} key={index}>
        <p className="amount">{numberSeparator(t.amount)} تومان</p>
        <PType />
        <p className="date">{t.dateP}</p>
        <Icon />
      </div>
    );
  });
  const showResult = searchResult.map(res => {
    let img = "/static/img/no-userimage.svg";
    let usrId = null;
    if (res.avatar !== undefined && res.avatar !== null) {
      img = `https://api.qarun.ir/${res.avatar}`;
    } else if (res.userAvatar !== undefined && res.userAvatar !== null) {
      img = `https://api.qarun.ir/${res.userAvatar}`;
    }
    if (res.userId !== undefined && res.userId !== null) {
      usrId = res.userId;
    } else if (res.id !== undefined && res.id !== null) {
      usrId = res.id;
    }
    return (
      <User
        key={res.userId + res.userName}
        id={res.userId}
        image={img}
        name={res.displayName}
        userName={res.userName}
        action={() => {
          setTargetUserId(usrId);
          setAskModalShow(true);
        }}
      />
    );
  });
  const sellQerunToQarun = async () => {
    if (sellQerun !== "" && fixNumbers(sellQerun) > 0) {
      setLoading(true);
      const result = await fetchData(
        "User/U_Financial/SaleQerun",
        {
          method: "POST",
          body: JSON.stringify({
            qerun: fixNumbers(sellQerun)
          })
        },
        props.ctx
      );
      setModalShow(false);
      if (result.isSuccess) {
        setModalShow(false);
        setUpdate(!update);
        toast.success("با موفقیت انجام شد.");
      } else if (result.message != undefined) {
        toast.warn(result.message);
      } else if (result.error != undefined) {
        toast.error(result.error);
      }
      setLoading(false);
    } else {
      toast.warn("لطفا مقدار قرون را مشخص کنید");
    }
  };
  const handleSearch = async (s = search) => {
    if (s.length > 0) {
      const result = await fetchData(
        "User/U_Search/GetShopsInMap",
        {
          method: "POST",
          body: JSON.stringify({
            searchType: "UserName",
            page: 1,
            pageSize: 15,
            search: s
          })
        },
        props.ctx
      );
      if (result !== undefined && result.isSuccess) {
        setSearchResult(result.data);
      }
    }
  };
  const transferQerun = async () => {
    if (tQerun !== null && fixNumbers(tQerun) > 0) {
      if (targetUserId !== null && targetUserId !== "") {
        setLoading(true);
        const result = await fetchData(
          "User/U_Financial/QerunTransfer",
          {
            method: "POST",
            body: JSON.stringify({
              qerun: fixNumbers(tQerun),
              targetUserId: targetUserId
            })
          },
          props.ctx
        );
        setAskModalShow(false);
        if (result.isSuccess) {
          setTransferModalShow(false);
          setUpdate(!update);
          toast.success("با موفقیت انجام شد.");
        } else if (result.message != undefined) {
          toast.warn(result.message);
        } else if (result.error != undefined) {
          toast.error(result.error);
        }
        setLoading(false);
      } else {
        toast.warn("لطفا کاربر را مشخص کنید.");
      }
    } else {
      toast.warn("لطفا مقدار قرون را مشخص کنید");
    }
  };
  const updateInventory = async () => {
    const result = await fetchData(
      "User/U_Financial/Inventory",
      {
        method: "GET"
      },
      props.ctx
    );
    if (result !== undefined && result.isSuccess) {
      setInventory(result.data);
      setQerun(result.data.qerun);
      setTransactions(result.data.transactions);
    } else if (result !== undefined && result.message !== undefined) {
      toast.warn(result.message);
    } else if (result !== undefined && result.error !== undefined) {
      toast.error(result.error);
    }
  };
  useEffect(() => {
    updateInventory();
  }, [update]);
  return (
    <>
      <Head>
        <title>قارون | قرون</title>
      </Head>
      <Nav _tkn={props._tkn} />
      <div className="container inventory_page">
        <div className="row p-2 page_title">
          <div className="col-10 text-center align-self-center">
            <h6 className="ml-5 pl-3 mt-1">قرون</h6>
          </div>
          <div className="col-2 text-right align-self-center pr-1">
            <FiChevronRight className="font_icon back_icon" onClick={() => Router.back()} />
          </div>
        </div>
      </div>
      <div className="container pt-3 inventory_page">
        <div className="row">
          <div className="col-12 text-center">
            <p className="inventory_price rtl">{qerun} قرون</p>
            <p className="inventory_price inventory_price_toman rtl pt-2">{numberSeparator(1000 * qerun)} تومان</p>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 d-block pb-2" style={{ position: "relative", zIndex: "1" }}>
            <div className="col-6 text-center float-right">
              <SubmitButton loading={loading} onClick={() => setModalShow(true)} text="فروش" className="d-inline-block btn-main btn-green sell"></SubmitButton>
            </div>
            <div className="col-6 text-center float-left">
              <SubmitButton
                loading={loading}
                onClick={() => {
                  setSearch("");
                  setSearchResult(props.Following.data || []);
                  setTransferModalShow(true);
                }}
                text="انتقال"
                className="d-inline-block btn-main transfer"
              ></SubmitButton>
            </div>
          </div>
        </div>
        <hr />
        <div className="row rtl info_rows">
          {/* <div className="col-12 d-flex _sell">
            <p className="amount">1,597,000</p>
            <p className="date">5/6/98</p>
            <FaCaretDown className="font_icon" />
          </div>
          <div className="col-12 d-flex _buy">
            <p className="amount">2,435,000</p>
            <p className="date">12/06/1398</p>
            <FaCaretUp className="font_icon" />
          </div> */}
          {showTransactions}
        </div>
        {/* Sale Qerun To Qarun */}
        <Modal onHide={() => setModalShow(false)} show={modalShow} size="xl" scrollable className="inventory_page withdrawal">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">نقد کردن قرون</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-12 p-0 rtl d-flex">
              <label className="col-5 col-form-label text-right">تعداد قرون </label>
              <input type="text" value={sellQerun} onChange={e => setSellQerun(fixNumbers(forceNumeric(e.target.value)))} className="col-5 form-control text-center" placeholder="تعداد قرون" />
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <SubmitButton loading={loading} onClick={sellQerunToQarun} text="فروش" className="d-inline-block btn-main btn-green">
              <FaMoneyBill className="font_icon" />
            </SubmitButton>
          </Modal.Footer>
        </Modal>
        {/* Transfer Qerun To Users */}
        <Modal onHide={() => setTransferModalShow(false)} show={transferModalShow} size="xl" scrollable className="share_modal">
          <Modal.Header closeButton className="p-2">
            <Modal.Title id="contained-modal-title-vcenter" style={{ fontSize: "1rem" }}>
              انتقال قرون
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-10 p-0 pb-2 rtl d-flex qerun_v">
              <label className="col-6 col-form-label text-center">تعداد قرون </label>
              <input type="text" value={tQerun} onChange={e => setTQerun(fixNumbers(forceNumeric(e.target.value)))} className="col-6 form-control text-center" placeholder="تعداد قرون" />
            </div>
            <div className="row justify-content-center">
              <div className="col-12 mt-2 d-flex rtl align-items-center flex-row-reverse">
                <FaSearch className="font_icon _srch_icn" onClick={() => handleSearch(searchInput.current.value)} />
                <input
                  type="text"
                  value={search}
                  onChange={e => {
                    setSearch(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  className="form-control searchInput"
                  ref={searchInput}
                  placeholder="جستجو"
                />
              </div>
            </div>
            <div className="row p-2 rtl srch_res_container">{searchResult.length > 0 ? showResult : ""}</div>
          </Modal.Body>
        </Modal>
        <Ask header={"انتقال قرون"} text={""} command={transferQerun} setModalShow={setAskModalShow} modalShow={askModalShow} loading={loading} />
      </div>
    </>
  );
}
Page.getInitialProps = async function(context) {
  const Inventory = await fetchData(
    "User/U_Financial/Inventory",
    {
      method: "GET"
    },
    context
  );
  const GetWithdrawal = await fetchData(
    "User/U_Financial/GetWithdrawal",
    {
      method: "GET"
    },
    context
  );
  // Get User's That Current User Followed Them
  const Following = await fetchData(
    "User/U_Friends/Following",
    {
      method: "GET"
    },
    context
  );
  return { Inventory, GetWithdrawal, Following };
};
export default Auth(Page);