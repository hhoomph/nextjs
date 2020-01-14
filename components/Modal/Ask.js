import React, { useContext, useRef, useState, useEffect, memo } from "react";
import { Modal } from "react-bootstrap";
import SubmitButton from "../Button/SubmitButton";
import { AiOutlineWarning } from "react-icons/ai";
import { FiCheckCircle, FiXCircle, FiHelpCircle } from "react-icons/fi";
const Ask = props => {
  return (
    <Modal onHide={() => props.setModalShow(false)} show={props.modalShow} size="xl" scrollable className="share_modal">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{props.header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="col-12 mt-2 pb-1 rtl justify-content-center">
          {props.sellerSend ? (
            <div>
              <p className="ask_text">
                <AiOutlineWarning className="font_icon" />
                برای اطمینان از صحت معاملات خود، حتما در هنگام تحویل سفارش، رسید آن را از مشتری خود دریافت نمایید.
              </p>
              <p className="ask_text">
                <AiOutlineWarning className="font_icon" />
                جهت واریز سریع وجه سفارش به موجودیتان، می توانید در هنگام تحویل، از مشتری بخواهید تا با اعلام رضایت از خرید خود با زدن دکمه "تحویل گرفتم" در
                صفحه سبد خرید جاری، خرید را نهایی نماید.
              </p>
              <p className="ask_text">
                <AiOutlineWarning className="font_icon" />
                با تحویل سریع سفارشات مشتریانتان، محبوبیت فروشگاه خود را افزایش دهید.
              </p>
            </div>
          ) : props.customerRecive ? (<p className="ask_text">
                <AiOutlineWarning className="font_icon" />
                آیا سفارش مورد نظر خود را تحویل گرفته و از آن رضایت دارید؟
              </p>) : (
            <p className="ask_text">{props.text}</p>
          )}
          <p className="ask_question">آیا از انجام این عملیات مطمئن هستید؟</p>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-around">
        <SubmitButton loading={props.loading} onClick={() => props.setModalShow(false)} text="خیر" className="d-inline-block btn-main ask_cancel rtl">
          <FiXCircle className="font_icon" />
        </SubmitButton>
        <SubmitButton loading={props.loading} onClick={props.command} text="بله" className="d-inline-block btn-main ask_submit rtl">
          <FiCheckCircle className="font_icon" />
        </SubmitButton>
      </Modal.Footer>
    </Modal>
  );
};
export default memo(Ask);