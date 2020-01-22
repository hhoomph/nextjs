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
import { FaArrowLeft, FaArrowRight, FaMinus, FaPlus, FaCaretDown, FaCaretUp, FaExchangeAlt, FaMoneyBill } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import Modal from "react-bootstrap/Modal";
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
  const [modalShow, setModalShow] = useState(false);
  const [sellQerun, setSellQerun] = useState("");
  const Inventory = props.Inventory !== undefined && props.Inventory.data !== undefined ? props.Inventory.data : [];
  const [qerun, setQerun] = useState(Inventory.qerun || 0);
  const Transactions = Inventory.transactions || [];
  const GetWithdrawal = props.GetWithdrawal ? props.GetWithdrawal.data : [];
  toast.configure({
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  const showTransactions = Transactions.map(t => {
    const type = t.type;
    const icon = () => {
      if (type == "Sell" || type == "ByAdmin ") {
        return <FaCaretUp className="font_icon" />;
      } else {
        return <FaCaretDown className="font_icon" />;
      }
    };
    return (
      <div className={`col-12 d-flex ${type}`} key={t.date + t.amount}>
        <p className="amount">{numberSeparator(t.amount)}</p>
        <p className="date">{t.dateP}</p>
        {icon}
      </div>
    );
  });
  const sellQerunToQarun = async () => {
    if (sellQerun !== "" && sellQerun > 0) {
      setLoading(true);
      const result = await fetchData(
        "User/U_Financial/SaleQerun",
        {
          method: "POST",
          body: JSON.stringify({
            qerun: sellQerun
          })
        },
        props.ctx
      );
      setModalShow(false);
      if (result.isSuccess) {
        setModalShow(false);
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
            <p className="inventory_price rtl">{numberSeparator(qerun)} قرون</p>
            <p className="inventory_price inventory_price_toman rtl pt-2">{numberSeparator(0)} تومان</p>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 d-block pb-2" style={{ position: "relative", zIndex: "1" }}>
            <div className="col-6 text-center float-right">
              <SubmitButton loading={loading} onClick={() => setModalShow(true)} text="فروش" className="d-inline-block btn-main btn-green sell"></SubmitButton>
            </div>
            <div className="col-6 text-center float-left">
              <SubmitButton loading={loading} onClick={console.log("")} text="انتقال" className="d-inline-block btn-main transfer"></SubmitButton>
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
        <Modal onHide={() => setModalShow(false)} show={modalShow} size="xl" scrollable className="inventory_page withdrawal">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">نقد کردن قرون</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-12 p-0 rtl d-flex">
              <label className="col-5 col-form-label text-right">تعداد قرون </label>
              <input
                type="text"
                value={sellQerun}
                onChange={e => setSellQerun(forceNumeric(e.target.value))}
                className="col-5 form-control text-center"
                placeholder="تعداد قرون"
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <SubmitButton loading={loading} onClick={sellQerunToQarun} text="فروش" className="d-inline-block btn-main btn-green">
              <FaMoneyBill className="font_icon" />
            </SubmitButton>
          </Modal.Footer>
        </Modal>
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