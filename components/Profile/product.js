import React, { Fragment, useState, useEffect, useContext, memo } from "react";
import Link from "../Link";
import fetchData from "../../utils/fetchData";
import Router from "next/router";
import { UserProductsContext } from "../../context/context";
import { FaShoppingBasket, FaTimesCircle } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import { ReactComponent as RemoveSvg } from "../../public/static/svg/remove-button.svg";
import { ReactComponent as MenuCircleSvg } from "../../public/static/svg/menu-circle.svg";
import { ReactComponent as DisableEye } from "../../public/static/svg/eye.svg";
import { Dropdown } from "react-bootstrap";
import { numberSeparator, removeSeparator } from "../../utils/tools";
import "../../scss/components/profileProduct.scss";
const Product = props => {
  const disableClass = props.isDisable ? "enable" : "disable";
  const disableText = props.isDisable ? "فعال کردن" : "غیر فعال کردن";
  const userProductsDispatch = useContext(UserProductsContext);
  const disableToggle = async () => {
    const result = await fetchData(
      `User/U_Product/EnableOrDisableProduct?ProductId=${props.id}`,
      {
        method: "GET"
      },
      props.ctx
    );
    if (result.isSuccess) {
      userProductsDispatch({ type: "active", payload: props.id });
    }
  };
  const deleteProduct = async () => {
    const result = await fetchData(
      `User/U_Product/Delete?ProductId=${props.id}`,
      {
        method: "GET"
      },
      props.ctx
    );
    if (result.isSuccess) {
      userProductsDispatch({ type: "remove", payload: props.id });
    }
  };
  const addToCart = async () => {
    //setLoading(true);
    const result = await fetchData(
      "User/U_Cart/Add",
      {
        method: "POST",
        body: JSON.stringify({
          productId: props.id,
          count: 1
        })
      },
      props.ctx
    );
    if (result.isSuccess) {
      //toast.success('محصول شما با موفقیت به سبد خرید اضافه شد.');
      //cartCountDispatch({ type: 'add' });
    } else if (result.message != undefined) {
      //toast.warn(result.message);
    } else if (result.error != undefined) {
      //toast.error(result.error);
    }
    //setLoading(false);
  };
  return (
    <div className="col-4 col-lg-2 product">
      <div className="product_frame">
        <Link href={`/product/${props.id}`} as={`/product/${props.id}/${props.name.trim().replace(/ /g, "-")}`} passHref>
          <a className="product_link">
            <img src={props.image} alt={props.productName} className="product_img" />
          </a>
        </Link>
        {props.favorite && (
          <Link href={`/user/${props.sellerUserName}`} passHref>
            <a className="product_user">
              <img src={props.sellerAvatar} alt={props.sellerUserName} className="product_img" />
            </a>
          </Link>
        )}
        {props.profile ? (
          <>
            <div className={`product_basket ${disableClass}`} id={props.id} onClick={disableToggle}>
              <p>سبد خرید</p>
              <DisableEye className="svg_Icons" />
            </div>
            <div className="product_menu_button">
              <Dropdown drop="left" className="dropDownMenu">
                <Dropdown.Toggle>
                  <a className="nav_Icons">
                    <MdMoreVert className="svg_icon" />
                  </a>
                </Dropdown.Toggle>
                <Dropdown.Menu className="rtl product_menu">
                  <Dropdown.Item
                    eventKey="1"
                    onClick={() =>
                      Router.push({
                        pathname: "/edit-product",
                        query: { id: props.id }
                      })
                    }
                  >
                    ویرایش
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="2" onClick={disableToggle}>
                    {disableText}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="4" onClick={deleteProduct}>
                    حذف کردن
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </>
        ) : (
          <div className="product_basket" id={props.id} onClick={addToCart}>
            <p>سبد خرید</p>
            <FaShoppingBasket className="svg_Icons" />
          </div>
        )}
        <div className="product_text mb-1">
          <p>
            <span className="product_price">{numberSeparator(props.price)} </span>
            <span className="product_currency">تومان</span>
          </p>
          {props.oldPrice && props.oldPrice !== props.price ? (
            <p className="price_old">
              <span className="product_price">{numberSeparator(props.oldPrice)}</span>
              <span className="product_currency">تومان</span>
            </p>
          ) : (
            <p className="price_old"></p>
          )}
        </div>
      </div>
    </div>
  );
};
export default memo(Product);