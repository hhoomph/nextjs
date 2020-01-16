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
import { FaArrowLeft, FaArrowRight, FaMinus, FaPlus, FaCaretDown, FaCaretUp } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import "../scss/components/inventory.scss";
const User = dynamic({
  loader: () => import("../components/Friend/User"),
  loading: () => <Loading />,
  ssr: true
});
function Page(props) {
  const Router = useRouter();
  const [loading, setLoading] = useState(false);
  const Inventory = props.Inventory.data || [];
  const [walletCharge, setWalletCharge] = useState(Inventory.walletCharge || 0);
  const Transactions = Inventory.transactions || [];
  const GetWithdrawal = props.GetWithdrawal.data || [];
  //console.log(Inventory, GetWithdrawal);
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
  return (
    <>
      <Head>
        <title>قارون | موجودی</title>
      </Head>
      <Nav _tkn={props._tkn} statusHub={props.statusHub} />
      <div className="container inventory_page">
        <div className="row p-2 page_title">
          <div className="col-10 text-center align-self-center">
            <h6 className="ml-5 pl-3 mt-1">موجودی</h6>
          </div>
          <div className="col-2 text-right align-self-center pr-1">
            <FiChevronRight className="font_icon back_icon" onClick={() => Router.back()} />
          </div>
        </div>
      </div>
      <div className="container pt-3 inventory_page">
        <div className="row">
          <div className="col-12 text-center">
            <p className="inventory_price rtl">{numberSeparator(walletCharge)} تومان</p>
          </div>
        </div>
        <div className="row p-2 cart_title">
          <div className="col text-center">
            <h2 className="mr-2 ml-2 mt-1 page_title">موجودی حساب</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-block pb-2" style={{ position: "relative", zIndex: "1" }}>
            <div className="col-6 text-center float-right">
              <SubmitButton loading={loading} onClick={console.log("")} text="شارژ" className="d-inline-block btn-main btn-green charge">
                <FaPlus className="font_icon" />
              </SubmitButton>
            </div>
            <div className="col-6 text-center float-left">
              <SubmitButton loading={loading} onClick={console.log("")} text="برداشت" className="d-inline-block btn-main removal">
                <FaMinus className="font_icon" />
              </SubmitButton>
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