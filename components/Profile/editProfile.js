import React, { useState, useEffect, useRef, memo } from 'react';
import Link from '../Link';
import dynamic from 'next/dynamic';
import Loading from '../Loader/Loader';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { ReactComponent as UserImageSvg } from '../../static/img/user-circle.svg';
import { ToastContainer, toast } from 'react-toastify';
import fetchData from '../../utils/fetchData';
import '../../scss/components/profileEdit.scss';
const LocationMap = dynamic({
  loader: () => import('../Map/LocationMap.js'),
  loading: () => <Loading />,
  ssr: false
});
const EditProfile = props => {
  const nextCtx = props.ctx;
  const id = props.profileData.id;
  const { profileData, setView } = props;
  const user = (props.profileData.userName = props.profileData.phoneNumber) ? '' : props.profileData.userName || '';
  const [name, setName] = useState(props.profileData.displayName || '');
  const [username, setUsername] = useState(user);
  const [biography, setBiography] = useState(props.profileData.biography || '');
  const [email, setEmail] = useState(props.profileData.email || '');
  const [phoneNumber, setPhoneNumber] = useState(props.profileData.phoneNumber || '');
  const [iban, setIban] = useState(props.profileData.iban || '');
  const [lat, setLat] = useState(props.profileData.lat);
  const [long, setLong] = useState(props.profileData.long);
  const [addresses, setAddresses] = useState(props.profileData.addresses[0] || '');
  const avatarUrl = props.profileData.avatar !== null ? `http://api.qarun.ir/${props.profileData.avatar}` : null;
  const [avatar, setAvatar] = useState(avatarUrl);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef();
  toast.configure({
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  const uploadHandler = async e => {
    toast.dismiss();
    const errs = [];
    const file = e.target.files[0];
    const formData = new FormData();
    const types = ['image/png', 'image/jpeg', 'image/gif'];
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
    if (file.size > 2150000) {
      errs.push(`حجم فایل '${file.name}' بیشتر از حد مجاز است، لطفا فایل کم حجم تری انتخاب کنید.`);
    }
    formData.append(`file`, file);
    if (errs.length) {
      return errs.forEach(err => toast.warn(err));
    }
    setUploading(true);
    const result = await fetchData(
      'User/U_Account/UploadUserAvatar',
      {
        method: 'POST',
        body: formData
      },
      nextCtx,
      true
    );
    if (result.isSuccess) {
      setAvatar(`http://api.qarun.ir/${result.message}`);
      toast.success('تصویر شما با موفقیت آپلود شد.');
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
      'User/U_Account/Profile',
      {
        method: 'PUT',
        body: JSON.stringify({
          displayName: name,
          biography: biography,
          addresses: [addresses],
          lat: lat,
          long: long,
          // lat: '34.635059',
          // long: '50.880823',
          // iban: iban,
          iban: 'iban',
          id: id,
          userName: username,
          email: email,
          orderLimitationId: 1
        })
      },
      nextCtx
    );
    if (result.isSuccess) {
      setAvatar(`http://api.qarun.ir/${result.message}`);
      toast.success('ویرایش نمایه با موفقیت انجام شد.');
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
          {uploading ? <Loading /> : avatar != null ? <img src={avatar} className="rounded-circle img-thumbnail" /> : <UserImageSvg className="rounded-circle img-thumbnail" />}
          <input type="file" onChange={uploadHandler} ref={fileInput} hidden={true} />
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
      <div className="row mt-3 mb-5 edit_form">
        <div className="col">
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
              <input type="text" value={biography} onChange={e => setBiography(e.target.value)} id="biography" className="form-control mt-1 mb-4" placeholder="بیوگرافی" />
            </div>
            <h5 className="mt-4 mb-4 pt-2">اطلاعات خصوصی</h5>
            <div className="form-group">
              <label htmlFor="email">آدرس ایمیل</label>
              <input type="text" value={email} onChange={e => setEmail(e.target.value)} id="email" className="form-control mt-1 mb-4" placeholder="آدرس ایمیل" />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">شماره تلفن</label>
              <input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} id="phoneNumber" className="form-control mt-1 mb-4" placeholder="شماره تلفنتان را وارد کنید" />
            </div>
            <div className="form-group">
              <label htmlFor="iban">شماره شبا</label>
              <input type="text" value={iban} onChange={e => setIban(e.target.value)} id="iban" className="form-control mt-1 mb-4" placeholder="شماره شبا" />
            </div>
            <div className="form-group">
              <label htmlFor="addresses">آدرس</label>
              <input type="text" id="addresses" value={addresses} onChange={e => setAddresses(e.target.value)} className="form-control mt-1 mb-4" placeholder="آدرس خود را وارد کنید" />
            </div>
            <div className="form-group">
              <label>موقعیت روی نقشه</label>
              <br />
              <a className="setLocation">تغییر موقعیت</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default memo(EditProfile);