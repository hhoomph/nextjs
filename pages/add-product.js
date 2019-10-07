import React, { Fragment, useContext, useRef, useState, useEffect, memo } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../components/Loader/Loading';
import Router from 'next/router';
import '../scss/style.scss';
import Nav from '../components/Nav/Nav';
import Auth from '../components/Auth/Auth';
import fetchData from '../utils/fetchData';
import { FaCheck, FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { numberSeparator, removeSeparator, forceNumeric } from '../utils/tools';
import SubmitButton from '../components/Button/SubmitButton';
import '../scss/components/addProduct.scss';
import { setTimeout } from 'core-js';
function Page(props) {
  const nextCtx = props.ctx;
  const categories = props.result.data;
  const categoriesOptions = categories.map(category => {
    return {
      value: category.id,
      label: category.titel
    };
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [productId, setProductId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const handleCategoryChange = selectedOption => {
    setCategoryId(selectedOption);
  };
  const [tags, setTags] = useState([]);
  const addTags = event => {
    if (event.key === 'Enter' && event.target.value !== '') {
      setTags([...tags, event.target.value]);
      event.target.value = '';
    }
  };
  const removeTags = index => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
  };
  const [view, setView] = useState(1);
  toast.configure({
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  let imgId = 0;
  const [uploadedImages, setUploadedImages] = useState([]);
  // const [uploadedImages, setUploadedImages] = useState([
  //   { id: `${++imgId}`, url: '../static/img/product.png', thumbnail: '../static/img/product2.png', active: true },
  //   { id: `${++imgId}`, url: '../static/img/product.png', thumbnail: '../static/img/product3.png', active: true },
  //   { id: `${++imgId}`, url: '../static/img/product.png', thumbnail: '../static/img/product.png', active: true },
  //   { id: `${++imgId}`, url: '../static/img/product.png', thumbnail: '../static/img/product2.png', active: true },
  //   { id: `${++imgId}`, url: '../static/img/product.png', thumbnail: '../static/img/product.png', active: true },
  //   { id: `${++imgId}`, url: '../static/img/product.png', thumbnail: '../static/img/product3.png', active: true }
  // ]);
  const addProduct = async () => {
    if (categoryId !== null && title != '') {
      setLoading(true);
      const result = await fetchData(
        'User/U_Product/Add',
        {
          method: 'POST',
          body: JSON.stringify({
            title: title,
            description: description,
            price: parseInt(removeSeparator(price), 10) >= 0 ? parseInt(removeSeparator(price), 10) : 0,
            discount: parseInt(removeSeparator(discount), 10) >= 0 ? parseInt(removeSeparator(discount), 10) : 0,
            lat: null,
            long: null,
            categoryId: categoryId ? categoryId.value : null,
            hashtags: tags
            //id: id
          })
        },
        nextCtx
      );
      if (result.isSuccess) {
        setProductId(result.data.productId);
        toast.success('محصول شما با موفقیت ایجاد شد، لطفا تصویر محصول را انتخاب کنید.');
        const suggestedPicturesResult = await fetchData('Common/C_Image/ProductSuggestedPictures', {
          method: 'POST',
          body: JSON.stringify({
            categoryId: categoryId ? categoryId.value : null,
            productTitle: title,
            page: 1,
            pageSize: 100
          })
        });
        if (suggestedPicturesResult.isSuccess) {
          const suggestedPictures = suggestedPicturesResult.data.map(picture => {
            return { id: picture.pictureId, url: `https://api.qarun.ir/${picture.picture}`, thumbnail: `https://api.qarun.ir/${picture.thumbNail}`, active: false };
          });
          if (suggestedPictures.length > 0) {
            const all = uploadedImages.concat(suggestedPictures).sort((a, b) => a.id - b.id);
            setUploadedImages(all);
          }
        }
        setView(2);
      } else if (result.message != undefined) {
        toast.warn(result.message);
      } else if (result.error != undefined) {
        toast.error(result.error);
      }
      setLoading(false);
    } else {
      if (title == '') {
        toast.warn('لطفا نام محصول را وارد کنید.');
      } else if (categoryId == null) {
        toast.warn('لطفا دسته بندی محصول خود را مشخص کنید.');
      }
    }
  };
  const fileInput = useRef();
  const uploadHandler = async e => {
    toast.dismiss();
    const errs = [];
    const file = e.target.files[0];
    const formData = new FormData();
    const types = ['image/png', 'image/jpeg', 'image/gif'];
    if (types.every(type => file.type !== type)) {
      errs.push(`فرمت '${file.type}' پشتیبانی نمی شود.`);
    }
    if (file.size > 4150000) {
      errs.push(`حجم فایل '${file.name}' بیشتر از حد مجاز است، لطفا فایل کم حجم تری انتخاب کنید.`);
    }
    formData.append(`File`, file);
    formData.append(`ProductId`, productId);
    if (errs.length) {
      return errs.forEach(err => toast.warn(err));
    }
    setUploading(true);
    const result = await fetchData(
      'User/U_Product/UploadProductImageFromGalery',
      {
        method: 'POST',
        body: formData
      },
      nextCtx,
      true
    );
    if (result.isSuccess) {
      const all = uploadedImages
        .concat({
          id: result.data.pictureId,
          url: `https://api.qarun.ir/${result.data.value}`,
          thumbnail: `https://api.qarun.ir/${result.data.thumbNail}`,
          active: true
        })
        .sort((a, b) => a.id - b.id);
      setUploadedImages(all);
      toast.success('تصویر شما با موفقیت آپلود شد.');
    } else if (result.message != undefined) {
      toast.warn(result.message);
    } else if (result.error != undefined) {
      toast.error(result.error);
    }
    setUploading(false);
  };
  const showUploadedImages = () =>
    uploadedImages.map((image, index) => (
      <img
        src={image.thumbnail}
        className={image.active ? 'active' : ''}
        key={image.id}
        id={image.id}
        title="برای انتخاب یا عدم انتخاب بر روی عکس کلیک کنید"
        onClick={() => toggleUploadedImages(index)}
      />
    ));
  // useEffect(() => {
  //   showUploadedImages();
  // }, [uploadedImages]);
  const toggleUploadedImages = index => {
    const imgObject = uploadedImages.filter(image => uploadedImages.indexOf(image) == index)[0];
    imgObject.active = !imgObject.active;
    const otherImgObject = uploadedImages.filter(image => uploadedImages.indexOf(image) !== index);
    const all = otherImgObject.concat(imgObject).sort((a, b) => a.id - b.id);
    setUploadedImages(all);
    //setUploadedImages([...otherImgObject, imgObject]);
  };
  const setProductImages = async () => {
    setLoading(true);
    const selectedImages = uploadedImages.filter(image => image.active !== false).map(img => img.id);
    const result = await fetchData(
      'User/U_Product/UploadProductImageFromSuggested',
      {
        method: 'POST',
        body: JSON.stringify({
          pictureIds: selectedImages,
          productid: productId
        })
      },
      nextCtx
    );
    if (result.isSuccess) {
      //setView(2);
      toast.success('محصول شما با موفقیت ثبت شد.');
      Router.push('/profile');
    } else if (result.message != undefined) {
      toast.warn(result.message);
    } else if (result.error != undefined) {
      toast.error(result.error);
    }
    setLoading(false);
  };
  switch (view) {
    case 1:
      if (typeof window !== 'undefined') {
        window.scroll(0, 0);
      }
      return (
        <>
          <Nav />
          <div className="container mb-1 rtl add_product">
            <div className="row mb-3 p-2 header_link">
              <div className="col pt-2 text-center">
                <a className="d-inline-block btn-main" onClick={() => addProduct()}>
                  ادامه
                  {loading ? <Loading className="font_icon" /> : <FaArrowLeft className="font_icon" />}
                </a>
              </div>
            </div>
            <div className="row mt-3 mb-5 add_form">
              <div className="col">
                <form className="productForm">
                  <div className="form-group row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">
                      نام محصول
                    </label>
                    <input value={title} onChange={e => setTitle(e.target.value)} type="text" id="name" className="form-control mt-1 mb-4 col-sm-10" placeholder="نام محصول" />
                  </div>
                  <div className="form-group row">
                    <label htmlFor="category" className="col-sm-2 col-form-label">
                      دسته بندی
                    </label>
                    <Select
                      closeMenuOnSelect={true}
                      isSearchable={true}
                      instanceId={'id'}
                      className="mt-1 mb-4 col-sm-10 p-0 react_select"
                      value={categoryId}
                      onChange={handleCategoryChange}
                      options={categoriesOptions}
                      placeholder="انتخاب کنید"
                      theme={theme => ({ ...theme, borderWidth: 'thin', boxShadow: '0px 0px 2px 0px #FF5722 !important', colors: { ...theme.colors, primary25: '#ffd698', primary: '#ff9800' } })}
                    />
                  </div>
                  <div className="form-group row">
                    <label htmlFor="hashtags" className="col-sm-2 col-form-label">
                      هشتگ های مرتبط
                    </label>
                    <input
                      onKeyUp={event => addTags(event)}
                      type="text"
                      id="hashtags"
                      className="form-control mt-1 mb-4 col-sm-10"
                      placeholder="برای اضافه شدن کلید اینتر را فشار دهید"
                      style={{ borderBottom: 'none', borderBottomLeftRadius: '0', borderBottomRightRadius: '0' }}
                    />
                    <div className="tags-input col-sm-10 offset-sm-2">
                      <ul>
                        {tags.map((tag, index) => (
                          <li key={index}>
                            <span>{tag}</span>
                            <FaTimes onClick={() => removeTags(index)} className="close_icon" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">
                      توضیحات
                    </label>
                    {/* <input type="text" id="description" className="form-control mt-1 mb-4  col-sm-10" placeholder="توضیحات" /> */}
                    <textarea value={description} onChange={e => setDescription(e.target.value)} id="description" className="form-control mt-1 mb-4  col-sm-10" placeholder="توضیحات" />
                  </div>
                  <div className="form-group row">
                    <label htmlFor="price" className="col-sm-2 col-form-label">
                      قیمت
                    </label>
                    <input
                      value={price}
                      onChange={e => {
                        setPrice(numberSeparator(forceNumeric(e.target.value)));
                      }}
                      type="text"
                      id="price"
                      className="form-control mt-1 mb-4  col-sm-10"
                      placeholder="قیمت"
                    />
                  </div>
                  <div className="form-group row">
                    <label htmlFor="discount" className="col-sm-2 col-form-label">
                      تخفیف
                    </label>
                    <input
                      value={discount}
                      onChange={e => setDiscount(numberSeparator(forceNumeric(e.target.value)))}
                      type="text"
                      id="discount"
                      className="form-control mt-1 mb-4  col-sm-10"
                      placeholder="تخفیف"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      );
      break;
    case 2:
      return (
        <>
          <Nav />
          <div className="container mb-1 rtl add_product">
            <div className="row mb-3 p-2 header_link image_tabs">
              <div className="col-4 pt-2 text-center border-left active" onClick={() => setView(2)}>
                <a className="d-inline-block tab_link">پیشنهادی</a>
              </div>
              <div
                className="col-4 pt-2 text-center  border-left"
                onClick={() => {
                  setView(3);
                  setTimeout(() => {
                    fileInput.current.click();
                  }, 200);
                }}
              >
                <a className="d-inline-block tab_link">گالری</a>
              </div>
              <div
                className="col-4 pt-2 text-center"
                onClick={() => {
                  setView(4);
                  setTimeout(() => {
                    fileInput.current.click();
                  }, 200);
                }}
              >
                <a className="d-inline-block tab_link">دوربین</a>
              </div>
            </div>
            <div className="row mt-0 mb-5 add_image">
              <div className="col">
                <div className="row">
                  <div className="col">
                    <h5 className="text-center">تصاویر پیشنهادی</h5>
                  </div>
                </div>
                <div className="row add_product_image">
                  <div className="col-md-10 d-flex pictures">
                    <div className="images_row">{showUploadedImages()}</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col pt-2 text-center">
                    <SubmitButton loading={loading || uploading} onClick={() => setProductImages()} text="ثبت نهایی محصول" className="d-inline-block btn-main">
                      <FaCheck className="font_icon" />
                    </SubmitButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
      break;
    case 3:
      return (
        <>
          <Nav />
          <div className="container mb-1 rtl add_product">
            <div className="row mb-3 p-2 header_link image_tabs">
              <div className="col-4 pt-2 text-center border-left" onClick={() => setView(2)}>
                <a className="d-inline-block tab_link">پیشنهادی</a>
              </div>
              <div
                className="col-4 pt-2 text-center  border-left active"
                onClick={() => {
                  setView(3);
                  setTimeout(() => {
                    fileInput.current.click();
                  }, 200);
                }}
              >
                <a className="d-inline-block tab_link">گالری</a>
              </div>
              <div
                className="col-4 pt-2 text-center"
                onClick={() => {
                  setView(4);
                  setTimeout(() => {
                    fileInput.current.click();
                  }, 200);
                }}
              >
                <a className="d-inline-block tab_link">دوربین</a>
              </div>
            </div>
            <div className="row mt-0 mb-5 add_image">
              <div className="col">
                <div className="row">
                  <div className="col">
                    <h5 className="text-center">تصاویر انتخاب شده</h5>
                  </div>
                </div>
                <div className="row add_product_image">
                  <input type="file" accept="image/*;capture=camera" capture="camera" onChange={uploadHandler} ref={fileInput} hidden={true} />
                  <div className="col-md-10 d-flex pictures">
                    <div className="images_row">{showUploadedImages()}</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col pt-2 text-center">
                    <SubmitButton loading={loading || uploading} onClick={() => setProductImages()} text="ثبت نهایی محصول" className="d-inline-block btn-main">
                      <FaCheck className="font_icon" />
                    </SubmitButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
      break;
    case 4:
      return (
        <>
          <Nav />
          <div className="container mb-1 rtl add_product">
            <div className="row mb-3 p-2 header_link image_tabs">
              <div className="col-4 pt-2 text-center border-left" onClick={() => setView(2)}>
                <a className="d-inline-block tab_link">پیشنهادی</a>
              </div>
              <div
                className="col-4 pt-2 text-center  border-left"
                onClick={() => {
                  setView(3);
                  setTimeout(() => {
                    fileInput.current.click();
                  }, 200);
                }}
              >
                <a className="d-inline-block tab_link">گالری</a>
              </div>
              <div
                className="col-4 pt-2 text-center active"
                onClick={() => {
                  setView(4);
                  setTimeout(() => {
                    fileInput.current.click();
                  }, 200);
                }}
              >
                <a className="d-inline-block tab_link">دوربین</a>
              </div>
            </div>
            <div className="row mt-3 mb-5 add_image">
              <div className="col">
                <div className="row">
                  <div className="col">
                    <h5 className="text-center">تصاویر انتخاب شده</h5>
                  </div>
                </div>
                <div className="row add_product_image">
                  <input type="file" accept="image/*;capture=camera" capture="camera" onChange={uploadHandler} ref={fileInput} hidden={true} />
                  <div className="col-md-10 d-flex pictures">
                    <div className="images_row">{showUploadedImages()}</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col pt-2 text-center">
                    <SubmitButton loading={loading || uploading} onClick={() => setProductImages()} text="ثبت نهایی محصول" className="d-inline-block btn-main">
                      <FaCheck className="font_icon" />
                    </SubmitButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
      break;
    default:
      if (typeof window !== 'undefined') {
        window.scroll(0, 0);
      }
      return (
        <>
          <Nav />
        </>
      );
      break;
  }
}
Page.getInitialProps = async function(context) {
  const result = await fetchData(
    'Common/C_Category/GetAllParentAsync',
    {
      method: 'GET'
    },
    context
  );
  return { result };
};
export default Auth(Page);