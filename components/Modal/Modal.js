import React, { useContext, useRef, useState, useEffect, memo } from 'react';
import { Modal } from 'react-bootstrap';
const ModalComponent = props => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="container mt-1 mb-5">
        <button className="btn btn-main" onClick={handleShow}>
          نمایش Modal
        </button>
        <Modal show={show} onHide={handleClose} className="rtl" size="lg">
          <Modal.Header closeButton>
            <Modal.Title>عنوان</Modal.Title>
          </Modal.Header>
          <Modal.Body>متن پیام متن پیام</Modal.Body>
          <Modal.Footer className="justify-content-center">
            <button className="btn btn-danger" onClick={handleClose}>
              بستن
            </button>
            <button className="btn btn-success" onClick={handleClose}>
              ذخیره
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
export default memo(ModalComponent);