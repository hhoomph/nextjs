import React, { useState, useEffect, useRef, memo } from "react";
import Link from "../Link";
import dynamic from "next/dynamic";
import Loading from "../Loader/Loader";
import { FaCheck, FaTimes } from "react-icons/fa";
import { ReactComponent as UserImageSvg } from "../../public/static/img/no-userimage.svg";
import { ToastContainer, toast } from "react-toastify";
import fetchData from "../../utils/fetchData";
import Router from "next/router";
import ReactCrop from "react-image-crop";
import Modal from "react-bootstrap/Modal";
import "react-image-crop/lib/ReactCrop.scss";
import "../../scss/components/profileEdit.scss";
const LocationMap = dynamic({
  loader: () => import("../Map/LocationMap.js"),
  loading: () => <Loading />,
  ssr: false
});
const EditProfile = props => {
  const nextCtx = props.ctx;
  const { profileData, setView } = props;
  const id = profileData.id || null;
  // const user = (profileData.userName = profileData.phoneNumber) ? '' : profileData.userName || '';
  // const [username, setUsername] = useState(user);
  const [username, setUsername] = useState(profileData.userName);
  const [name, setName] = useState(profileData.displayName || "");
  const [biography, setBiography] = useState(profileData.biography || "");
  const [email, setEmail] = useState(profileData.email || "");
  const [phoneNumber, setPhoneNumber] = useState(profileData.phoneNumber || "");
  const [iban, setIban] = useState(profileData.iban || "");
  const [lat, setLat] = useState(profileData.lat || 0);
  const [long, setLong] = useState(profileData.long || 0);
  const [markPosition, setMarkPosition] = useState([profileData.lat || 0, profileData.long || 0]);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [draggable, setDraggable] = useState(false);
  const _addresses = profileData.addresses !== undefined && profileData.addresses.length > 0 ? profileData.addresses : [];
  const _address = _addresses.length > 0 ? _addresses[_addresses.length - 1] : "";
  const [addresses, setAddresses] = useState(_address);
  const avatarUrl = profileData.avatar !== undefined && profileData.avatar !== null ? `https://api.qarun.ir/${profileData.avatar}` : null;
  const [avatar, setAvatar] = useState(avatarUrl);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef();
  // Add Crop Image
  const [modalShow, setModalShow] = useState(false);
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 50,
    height: 50,
    minWidth: 600,
    minHeight: 600,
    x: 25,
    y: 25,
    aspect: 4 / 4
  });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  let fileUrl = null;
  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setModalShow(true);
    }
  };
  const onImageLoaded = image => {
    setImageRef(image);
  };
  const onCropComplete = c => {
    makeClientCrop(c);
  };
  const onCropChange = (c, percentCrop) => {
    setCrop(c);
  };
  const makeClientCrop = async c => {
    if (imageRef !== null && c.width && c.height) {
      const _croppedImageUrl = await getCroppedImg(imageRef, c, "newFile.jpg");
      setCroppedImageUrl(_croppedImageUrl);
    }
  };
  const getCroppedImg = (image, c, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = 600;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, c.x * scaleX, c.y * scaleY, c.width * scaleX, c.height * scaleY, 0, 0, 600, 600);
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        blob => {
          if (!blob) {
            console.error("Canvas is empty");
            return;
          }
          blob.name = fileName;
          //window.URL.revokeObjectURL(fileUrl);
          //fileUrl = window.URL.createObjectURL(blob);
          resolve(blob);
        },
        "image/jpeg",
        1
      );
    });
  };
  // End Of Crop Image
  toast.configure({
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  const uploadHandler = async e => {
    toast.dismiss();
    setModalShow(false);
    const errs = [];
    //const file = e.target.files[0];
    const file = new File([croppedImageUrl], "newFile.jpg", { type: "image/jpeg", lastModified: Date.now() });
    //const file = setCroppedImageUrl;
    //file.type = 'image/jpeg';
    //file.name = 'newFile.jpg';
    //console.log(file)
    const formData = new FormData();
    const types = ["image/png", "image/jpeg", "image/gif"];
    // const files = Array.from(e.target.files);
    // if (files.length > 3) {
    //   return toast.warn('تنها امکان آپلود 3 فایل همزمان وجود دارد.');
    // }
    // files.forEach((file, i) => {
    //   if (types.every(type => file.type !== type)) {
    //     errs.push(`فرمت '${file.type}' پشتیبانی نمی شود.`);
    //   }
    //   if (file.size > 150000) {
    //     errs.push(`حجم فایل '${file.name}' بیشتر از حد مجاز است، لطفا فایل کم حجم تری انتخاب کنید.`);
    //   }
    //   formData.append(`file${i}`, file);
    // });
    if (types.every(type => file.type !== type)) {
      errs.push(`فرمت '${file.type}' پشتیبانی نمی شود.`);
    }
    if (file.size > 1050000) {
      errs.push(`حجم فایل '${file.name}' بیشتر از حد مجاز است، لطفا فایل کم حجم تری انتخاب کنید.`);
    }
    formData.append("file", file);
    if (errs.length) {
      return errs.forEach(err => toast.warn(err));
    }
    setUploading(true);
    const result = await fetchData(
      "User/U_Account/UploadUserAvatar",
      {
        method: "POST",
        body: formData
      },
      nextCtx,
      true
    );
    if (result.isSuccess) {
      setAvatar(`https://api.qarun.ir/${result.message}`);
      //toast.success('تصویر شما با موفقیت آپلود شد.');
    } else if (result.message != undefined) {
      toast.warn(result.message);
    } else if (result.error != undefined) {
      toast.error(result.error);
    }
    setUploading(false);
  };
  const updateHandler = async () => {
    setLoading(true);
    const result = await fetchData(
      "User/U_Account/Profile",
      {
        method: "PUT",
        body: JSON.stringify({
          displayName: name,
          biography: biography,
          addresses: [addresses],
          lat: markPosition[0],
          long: markPosition[1],
          // lat: '34.635059',
          // long: '50.880823',
          iban: iban,
          //iban: null,
          id: id,
          userName: username,
          email: email,
          orderLimitationId: profileData.orderLimitationId
        })
      },
      nextCtx
    );
    if (result.isSuccess) {
      // toast.success('ویرایش نمایه با موفقیت انجام شد.');
      // setTimeout(() => {
      //   setView(1);
      // }, 300);
      setView(1);
      //Router.push('/profile');
    } else if (result.message != undefined) {
      toast.warn(result.message);
    } else if (result.error != undefined) {
      toast.error(result.error);
    }
    setLoading(false);
  };
  return (
    <div className="container mb-1 rtl edit_profile">
      <div className="row mb-3 p-2 header_link">
        <div className="col-8 pt-2 text-left">
          <a
            className="d-inline-block clos_btn"
            onClick={() => {
              setView(1);
            }}
          >
            <FaTimes className="font_icon font-weight-lighter" />
          </a>
          <p className="d-inline-block ml-4 title">ویرایش نمایه</p>
        </div>
        <div className="col-4 pt-2 text-right">
          <a
            className="d-inline-block check_btn"
            onClick={() => {
              updateHandler();
            }}
          >
            {loading ? <Loading className="font_icon" /> : <FaCheck className="font_icon" />}
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col d-block text-center profile_image">
          {uploading ? (
            <Loading />
          ) : avatar != null ? (
            <img src={avatar} className="rounded-circle img-thumbnail" />
          ) : (
            <UserImageSvg className="rounded-circle img-thumbnail" />
          )}
          {/* <input type="file" accept="image/*" onChange={uploadHandler} ref={fileInput} hidden={true} /> */}
          <input type="file" accept="image/*" onChange={onSelectFile} ref={fileInput} hidden={true} />
          {/* <MyVerticallyCenteredModal /> */}
          <a
            className="mt-3 change_image"
            onClick={() => {
              fileInput.current.click();
            }}
          >
            تغییر عکس
          </a>
        </div>
      </div>
      <Modal onHide={() => setModalShow(false)} show={modalShow} size="xl" aria-labelledby="contained-modal-title-vcenter" centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">بارگذاری تصویر</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {src && (
            <ReactCrop
              src={src}
              crop={crop}
              locked={false}
              onImageLoaded={e => {
                onImageLoaded(e);
              }}
              onComplete={e => {
                onCropComplete(e);
              }}
              onChange={e => {
                onCropChange(e);
              }}
              minWidth={640}
              minHeight={800}
            />
          )}
          {/* {croppedImageUrl && <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />} */}
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          {/* <button onClick={() => setModalShow(false)}>بستن</button> */}
          <button className="btn btn-success" onClick={() => uploadHandler()}>
            بارگذاری{" "}
          </button>
        </Modal.Footer>
      </Modal>
      <div className="row mt-3 mb-5 edit_form">
        <div className="col pb-3">
          <form className="profileForm">
            <div className="form-group">
              <label htmlFor="name">نام</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} id="name" className="form-control mt-1 mb-4" placeholder="نام" />
            </div>
            <div className="form-group">
              <label htmlFor="username">نام کاربری</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                id="username"
                className="form-control mt-1 mb-4"
                placeholder="(نام کاربری باید با حرف شروع شود و شامل حرف و عدد و _ باشد.)"
              />
            </div>
            <div className="form-group">
              <label htmlFor="biography">بیوگرافی</label>
              {/* <input type="text" value={biography} onChange={e => setBiography(e.target.value)} id="biography" className="form-control mt-1 mb-4" placeholder="بیوگرافی" /> */}
              <textarea
                value={biography}
                onChange={e => setBiography(e.target.value)}
                id="biography"
                className="form-control mt-1 mb-4"
                placeholder="بیوگرافی"
              />
            </div>
            <h5 className="mt-4 mb-4 pt-2">اطلاعات خصوصی</h5>
            <div className="form-group">
              <label htmlFor="email">آدرس ایمیل</label>
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                id="email"
                className="form-control mt-1 mb-4"
                placeholder="آدرس ایمیل"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">شماره تلفن</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                id="phoneNumber"
                className="form-control mt-1 mb-4"
                placeholder="شماره تلفنتان را وارد کنید"
              />
            </div>
            <div className="form-group">
              <label htmlFor="iban">شماره شبا</label>
              <input type="text" value={iban} onChange={e => setIban(e.target.value)} id="iban" className="form-control mt-1 mb-4" placeholder="شماره شبا" />
            </div>
            <div className="form-group">
              <label htmlFor="addresses">آدرس</label>
              <input
                type="text"
                id="addresses"
                value={addresses}
                onChange={e => setAddresses(e.target.value)}
                className="form-control mt-1 mb-4"
                placeholder="آدرس خود را وارد کنید"
              />
            </div>
            <div className="mb-4 map_part">
              <label>موقعیت روی نقشه</label>
              <LocationMap markPosition={markPosition} setMarkPosition={setMarkPosition} draggable={draggable} setCity={setCity} setState={setState} />
              <br />
              <a
                className="setLocation"
                onClick={() => {
                  setDraggable(!draggable);
                }}
                title="لطفا علامت نارنجی نقشه را بر روی مکان مورد نظر خود قرار دهید "
              >
                برای تغییر موقعیت <span className="click_link"> کلیک </span> کنید
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default memo(EditProfile);