import React, { Fragment, useContext, useReducer, useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Loading from "../components/Loader/Loading";
import { useRouter } from "next/router";
import Head from "next/head";
import Nav from "../components/Nav/Nav";
import ProfileHeader from "../components/Head/profileHeader";
import Product from "../components/Profile/product";
import Auth from "../components/Auth/Auth";
import fetchData from "../utils/fetchData";
import SubmitButton from "../components/Button/SubmitButton";
import { numberSeparator, removeSeparator, forceNumeric } from "../utils/tools";
import { FaArrowLeft, FaArrowRight, FaMinus, FaPlus, FaCaretDown, FaCaretUp, FaMoneyBill } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { MdAddBox } from "react-icons/md";
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "../scss/components/inventory.scss";
const User = dynamic({
  loader: () => import("../components/Friend/User"),
  loading: () => <Loading />,
  ssr: true
});
function Page(props) {
  const Router = useRouter();
  const [loading, setLoading] = useState(false);
  const [inventory, setInventory] = useState(props.Inventory.data || []);
  const [walletCharge, setWalletCharge] = useState(inventory.walletCharge || 0);
  const Transactions = inventory.transactions || [];
  const GetWithdrawal = props.GetWithdrawal.data || [];
  const [chargeModalShow, setChargeModalShow] = useState(false);
  const [chargeVal, setChargeVal] = useState(" تومان");
  toast.configure({
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  //console.log(inventory, GetWithdrawal);
  const ShowTransactions = Transactions.map((t, index) => {
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
  const getInventory = async () => {
    setLoading(true);
    const Inventory = await fetchData(
      "User/U_Financial/Inventory",
      {
        method: "GET"
      },
      props.ctx
    );
    if (Inventory !== undefined && Inventory.isSuccess) {
      setInventory(Inventory.data);
    } else if (Inventory !== undefined && Inventory.message != undefined) {
      toast.warn(Inventory.message);
    } else if (Inventory !== undefined && Inventory.error != undefined) {
      toast.error(Inventory.error);
    }
    setLoading(false);
  };
  const chargeAccount = async () => {
    if (chargeVal.trim() !== "" && chargeVal !== " تومان" && chargeVal.replace("تومان", "").trim() !== " " && chargeVal.trim !== "تومان" && removeSeparator(chargeVal.replace(" تومان", "")) > 1000) {
      console.log(removeSeparator(chargeVal.replace(" تومان", "")));
    } else {
      toast.warn("حداقل مبلغ شارژ 1،000 تومان می باشد.");
    }
  };
  useEffect(() => {
    getInventory();
  }, []);
  return (
    <>
      <Head>
        <title>قارون | موجودی</title>
      </Head>
      <Nav _tkn={props._tkn} />
      <div className="container pb-0 pr-1 inventory_head">
        <div className="row p-2 cart_title">
          <div className="col-3 p-0 text-left align-self-center">
            <MdAddBox className="font_icon _add" title="شارژ" onClick={() => setChargeModalShow(true)} />
          </div>
          <div className="col-6 p-0 text-center align-self-center">
            <h5 className="mr-0 ml-2 mt-1 page_title">موجودی</h5>
          </div>
          <div className="col-3 text-right align-self-center" onClick={() => Router.back()}>
            <FiChevronRight className="font_icon back_icon" />
          </div>
        </div>
      </div>
      <div className="container pt-3 inventory_page">
        <div className="row">
          <div className="col-12 text-center">
            <p className="inventory_price rtl">{numberSeparator(walletCharge)} تومان</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-block pb-2 mt-2" style={{ position: "relative", zIndex: "1" }}>
            {/* <div className="col-6 text-center float-right">
              <SubmitButton loading={loading} onClick={console.log("")} text="شارژ" className="d-inline-block btn-main btn-green charge">
                <FaPlus className="font_icon" />
              </SubmitButton>
            </div> */}
            <div className="col-12 text-center">
              <SubmitButton loading={loading} text="برداشت" className="d-inline-block btn-main removal">
                <FaMoneyBill className="font_icon" />
              </SubmitButton>
            </div>
          </div>
        </div>
        <Modal onHide={() => setChargeModalShow(false)} show={chargeModalShow} size="xl" scrollable className="share_modal withdrawal">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">شارژ حساب</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-12 p-0 mt-2 rtl d-flex">
              <label className="col-4 col-form-label text-center">مبلغ </label>
              <input
                type="text"
                value={chargeVal}
                onChange={e => setChargeVal(numberSeparator(forceNumeric(e.target.value)) + " تومان")}
                className="col-6 form-control text-center"
                placeholder="مبلغ به تومان"
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <SubmitButton loading={loading} onClick={chargeAccount} text="پرداخت" className="d-inline-block btn-main btn-green">
              <FaMoneyBill className="font_icon" />
            </SubmitButton>
          </Modal.Footer>
        </Modal>
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
          {ShowTransactions}
        </div>
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
  return { Inventory, GetWithdrawal };
};
export default Auth(Page);