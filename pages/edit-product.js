import React, { Fragment, useContext, useRef, useState, useEffect, memo } from "react";
import dynamic from "next/dynamic";
import Loading from "../components/Loader/Loading";
import { useRouter } from "next/router";
import Nav from "../components/Nav/Nav";
import Auth from "../components/Auth/Auth";
import fetchData from "../utils/fetchData";
import { FaCheck, FaArrowLeft, FaArrowRight, FaTimes, FaEdit, FaPlus } from "react-icons/fa";
import { MdAddCircle, MdAddAPhoto } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { numberSeparator, removeSeparator, forceNumeric } from "../utils/tools";
import SubmitButton from "../components/Button/SubmitButton";
import ReactCrop from "react-image-crop";
import Modal from "react-bootstrap/Modal";
import RRS from "react-responsive-select";
import "react-image-crop/lib/ReactCrop.scss";
import "../scss/components/addProduct.scss";
//import { setTimeout } from 'core-js';
function Page(props) {
  const nextCtx = props.ctx;
  const router = useRouter();
  const { id } = router.query;
  const productData = props.productData.data || [];
  const profileData = props.profileData.data || [];
  console.log(productData);
  const categories = props.result.data || [];
  const catId = parseInt(productData.categoryId.replace(",", ""));
  const catName = productData.category.replace(",", "");
  const categoriesOptions = categories.map(category => {
    return {
      value: category.id,
      text: category.titel,
      altered: false,
      key: category.id
    };
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState(productData.title || "");
  const [description, setDescription] = useState(productData.description || "");
  const [price, setPrice] = useState(numberSeparator(productData.price) || "");
  const [discount, setDiscount] = useState(numberSeparator(productData.discount) || "");
  const [lat, setLat] = useState(productData.lat || profileData.lat);
  const [long, setLong] = useState(productData.long || profileData.long);
  const [productId, setProductId] = useState(parseInt(id));
  const [categoryId, setCategoryId] = useState({
    value: catId,
    text: catName,
    altered: true,
    key: catId
  });
  const handleCategorySelectChange = ({ text, value, altered }) => {
    setCategoryId({
      text,
      value,
      altered
    });
  };
  const SelectCaretIcon = () => (
    <svg className="caret-icon" x="0px" y="0px" width="11.848px" height="6.338px" viewBox="351.584 2118.292 11.848 6.338">
      <g>
        <path d="M363.311,2118.414c-0.164-0.163-0.429-0.163-0.592,0l-5.205,5.216l-5.215-5.216c-0.163-0.163-0.429-0.163-0.592,0s-0.163,0.429,0,0.592l5.501,5.501c0.082,0.082,0.184,0.123,0.296,0.123c0.103,0,0.215-0.041,0.296-0.123l5.501-5.501C363.474,2118.843,363.474,2118.577,363.311,2118.414L363.311,2118.414z" />
      </g>
    </svg>
  );
  const [tags, setTags] = useState(productData.hashtags || []);
  const addTags = event => {
    let key = event.key || event.keyCode;
    if (!key) {
      key = String.fromCharCode(event.which || event.code);
    }
    if ((key === "Enter" || key === "Spacebar" || key === "Space" || key === " ") && event.target.value.trim() !== "" && event.target.value.trim() !== " ") {
      let reg = /^#.*/g;
      let val = event.target.value.trim();
      if (!reg.test(val)) {
        val = "#" + val;
      }
      if (!tags.includes(val)) {
        setTags([...tags, val]);
        event.target.value = "";
      } else {
        // Duplicate value - empty input
        event.target.value = "";
      }
    }
  };
  const removeTags = index => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
  };
  const [view, setView] = useState(1);
  toast.configure({
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  let imgId = 0;
  const suggestedPictures = props.suggestedPictures.data || [];
  let all = [];
  if (suggestedPictures.length > 0) {
    const suggestedPics = suggestedPictures.map(picture => {
      return {
        id: picture.pictureId,
        url: `https://api.qarun.ir/${picture.picture}`,
        thumbnail: `https://api.qarun.ir/${picture.thumbNail}`,
        active: false
      };
    });
    all = suggestedPics.sort((a, b) => a.id - b.id);
  }
  const productPictures = productData.pictures.map(picture => {
    return {
      id: picture.id,
      url: `https://api.qarun.ir/${picture.value}`,
      thumbnail: `https://api.qarun.ir/${picture.value}`,
      active: true
    };
  });
  all = productPictures.sort((a, b) => a.id - b.id);
  const [uploadedImages, setUploadedImages] = useState(all);
  // Add Crop Image
  const [modalShow, setModalShow] = useState(false);
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 50,
    height: 50,
    x: 25,
    y: 25,
    aspect: 4 / 5
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
      fileInput.current.value = "";
    }
  };
  const getCroppedImg = (image, c, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = 640;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, c.x * scaleX, c.y * scaleY, c.width * scaleX, c.height * scaleY, 0, 0, 640, 800);
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        resolve(blob);
      }, "image/jpeg");
    });
  };
  // End Of Crop Image
  const editProduct = async () => {
    if (categoryId !== null && title != "") {
      setLoading(true);
      const result = await fetchData(
        "User/U_Product/Edit",
        {
          method: "POST",
          body: JSON.stringify({
            title: title,
            description: description,
            price: parseInt(removeSeparator(price), 10) >= 0 ? parseInt(removeSeparator(price), 10) : 0,
            discount: parseInt(removeSeparator(discount), 10) >= 0 ? parseInt(removeSeparator(discount), 10) : 0,
            lat: lat,
            long: long,
            id: id,
            categoryId: categoryId ? categoryId.value : null,
            hashtags: tags,
            disabled: false
          })
        },
        nextCtx
      );
      if (result.isSuccess) {
        setLoading(false);
        setView(2);
      } else if (result.message != undefined) {
        toast.warn(result.message);
      } else if (result.error != undefined) {
        toast.error(result.error);
      }
      setView(2);
      setLoading(false);
    } else {
      if (title == "") {
        toast.warn("لطفا نام محصول را وارد کنید.");
      } else if (categoryId == null) {
        toast.warn("لطفا دسته بندی محصول خود را مشخص کنید.");
      }
    }
  };
  const fileInput = useRef();
  const uploadHandler = async e => {
    toast.dismiss();
    setModalShow(false);
    const errs = [];
    // const file = e.target.files[0];
    const file = new File([croppedImageUrl], "newFile.jpg", { type: "image/jpeg", lastModified: Date.now() });
    const formData = new FormData();
    const types = ["image/png", "image/jpeg", "image/gif"];
    if (types.every(type => file.type !== type)) {
      errs.push(`فرمت '${file.type}' پشتیبانی نمی شود.`);
    }
    if (file.size > 1550000) {
      errs.push(`حجم فایل '${file.name}' بیشتر از حد مجاز است، لطفا فایل کم حجم تری انتخاب کنید.`);
    }
    formData.append("File", file);
    formData.append("ProductId", productId);
    if (errs.length) {
      return errs.forEach(err => toast.warn(err));
    }
    setUploading(true);
    const result = await fetchData(
      "User/U_Product/UploadProductImageFromGalery",
      {
        method: "POST",
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
      //toast.success('تصویر شما با موفقیت آپلود شد.');
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
        className={image.active ? "active" : ""}
        key={image.id}
        id={image.id}
        title="برای انتخاب یا عدم انتخاب بر روی عکس کلیک کنید"
        onClick={() => toggleUploadedImages(index)}
      />
    ));
  const toggleUploadedImages = index => {
    const imgObject = uploadedImages.filter(image => uploadedImages.indexOf(image) == index)[0];
    imgObject.active = !imgObject.active;
    const otherImgObject = uploadedImages.filter(image => uploadedImages.indexOf(image) !== index);
    const all = otherImgObject.concat(imgObject).sort((a, b) => a.id - b.id);
    setUploadedImages(all);
  };
  const setProductImages = async () => {
    setLoading(true);
    const selectedImages = uploadedImages.filter(image => image.active !== false).map(img => img.id);
    const result = await fetchData(
      "User/U_Product/UploadProductImageFromSuggested",
      {
        method: "POST",
        body: JSON.stringify({
          pictureIds: selectedImages,
          productid: productId
        })
      },
      nextCtx
    );
    if (result.isSuccess) {
      //setView(2);
      toast.success("محصول شما با موفقیت ویرایش شد.");
      router.push("/profile");
    } else if (result.message != undefined) {
      toast.warn(result.message);
    } else if (result.error != undefined) {
      toast.error(result.error);
    }
    setLoading(false);
  };
  // Change Scroll on Input Focus
  let initialOffset;
  if (typeof window !== "undefined") {
    initialOffset = document.documentElement.scrollTop;
  }
  const scrollToFocused = e => {
    let offset = e.target.offsetTop;
    initialOffset = document.documentElement.scrollTop;
    document.documentElement.scrollTop = offset - 10;
  };
  const scrollToFocusOut = e => {
    //document.documentElement.scrollTop = initialOffset;
  };
  switch (view) {
  case 1:
    // if (typeof window !== 'undefined') {
    //   window.scroll(0, 0);
    // }
    return (
      <>
        <Nav />
        <div className="container mb-1 rtl add_product">
          <div className="row mb-3 p-2 header_link">
            <div className="col pt-2 text-center">
              <a className="d-inline-block btn-main" onClick={() => editProduct()}>
                  ادامه
                {loading ? <Loading className="font_icon" /> : <FaEdit className="font_icon" />}
              </a>
            </div>
          </div>
          <div className="row mt-3 mb-5 add_product_form">
            <div className="col">
              <form className="productForm">
                <div className="form-group row">
                  <label htmlFor="name" className="col-sm-2 col-form-label">
                      نام محصول
                  </label>
                  <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type="text"
                    id="name"
                    className="form-control mt-1 mb-4 col-sm-10"
                    placeholder="نام محصول"
                    onFocus={scrollToFocused}
                    onBlur={scrollToFocusOut}
                  />
                </div>
                <div className="form-group row">
                  <label htmlFor="category" className="col-sm-2 col-form-label">
                      دسته بندی
                  </label>
                  <RRS
                    id={categoryId !== null ? "not_empty_select" : "empty_select"}
                    noSelectionLabel={"انتخاب کنید"}
                    name="category"
                    options={categoriesOptions}
                    onChange={handleCategorySelectChange}
                    caretIcon={<SelectCaretIcon key="c1" />}
                    //prefix="دسته بندی : "
                    selectedValue={categoryId !== null ? categoryId.value : null}
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
                    placeholder="برای اضافه شدن کلید فاصله یا اینتر را فشار دهید"
                    onFocus={scrollToFocused}
                    onBlur={scrollToFocusOut}
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
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    id="description"
                    className="form-control mt-1 mb-4  col-sm-10"
                    placeholder="توضیحات"
                    onFocus={scrollToFocused}
                    onBlur={scrollToFocusOut}
                  />
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
                    placeholder="تومان"
                    onFocus={scrollToFocused}
                    onBlur={scrollToFocusOut}
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
                    placeholder="تومان"
                    onFocus={scrollToFocused}
                    onBlur={scrollToFocusOut}
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
            <div className="col-4 pt-2 text-center active" onClick={() => setView(2)}>
              <a className="d-inline-block tab_link">پیشنهادی</a>
            </div>
            <div
              className="col-4 pt-2 text-center"
              onClick={() => {
                setView(3);
                setTimeout(() => {
                  fileInput.current.click();
                }, 200);
              }}
            >
              <a className="d-inline-block tab_link">گالری</a>
              <MdAddCircle className="font_icon" />
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
              <MdAddAPhoto className="font_icon" />
            </div>
          </div>
          <div className="row mt-0 mb-5 add_image">
            <div className="col">
              <div className="row">
                <div className="col pt-3">
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
                  <SubmitButton loading={loading || uploading} onClick={() => setProductImages()} text="ویرایش محصول" className="d-inline-block btn-main">
                    <FaEdit className="font_icon" />
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
            <div className="col-4 pt-2 text-center" onClick={() => setView(2)}>
              <a className="d-inline-block tab_link">پیشنهادی</a>
            </div>
            <div
              className="col-4 pt-2 text-center  active"
              onClick={() => {
                setView(3);
                setTimeout(() => {
                  fileInput.current.click();
                }, 200);
              }}
            >
              <a className="d-inline-block tab_link">گالری</a>
              <MdAddCircle className="font_icon" />
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
              <MdAddAPhoto className="font_icon" />
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
                <input type="file" accept="image/*" onChange={onSelectFile} ref={fileInput} hidden={true} />
                <div className="col-md-10 d-flex pictures">
                  <div className="images_row">{showUploadedImages()}</div>
                </div>
              </div>
              <div className="row">
                <div className="col pt-2 text-center">
                  <SubmitButton loading={loading || uploading} onClick={() => setProductImages()} text="ویرایش محصول" className="d-inline-block btn-main">
                    <FaEdit className="font_icon" />
                  </SubmitButton>
                </div>
              </div>
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
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <button className="btn btn-success" onClick={() => uploadHandler()}>
                  بارگذاری{" "}
              </button>
            </Modal.Footer>
          </Modal>
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
            <div className="col-4 pt-2 text-center" onClick={() => setView(2)}>
              <a className="d-inline-block tab_link">پیشنهادی</a>
            </div>
            <div
              className="col-4 pt-2 text-center "
              onClick={() => {
                setView(3);
                setTimeout(() => {
                  fileInput.current.click();
                }, 200);
              }}
            >
              <a className="d-inline-block tab_link">گالری</a>
              <MdAddCircle className="font_icon" />
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
              <MdAddAPhoto className="font_icon" />
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
                <input type="file" accept="image/*" capture onChange={onSelectFile} ref={fileInput} hidden={true} />
                <div className="col-md-10 d-flex pictures">
                  <div className="images_row">{showUploadedImages()}</div>
                </div>
              </div>
              <div className="row">
                <div className="col pt-2 text-center">
                  <SubmitButton loading={loading || uploading} onClick={() => setProductImages()} text="ویرایش محصول" className="d-inline-block btn-main">
                    <FaEdit className="font_icon" />
                  </SubmitButton>
                </div>
              </div>
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
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <button className="btn btn-success" onClick={() => uploadHandler()}>
                  بارگذاری{" "}
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    );
    break;
  default:
    return (
      <>
        <Nav />
      </>
    );
    break;
  }
}
Page.getInitialProps = async function(context) {
  const { id } = context.query;
  // Get Product Data
  const productData = await fetchData(
    `User/U_Product/ProductDetails?ProductId=${id}`,
    {
      method: "GET"
    },
    context
  );
  // Get All Categories
  const result = await fetchData(
    "Common/C_Category/GetAllParentAsync",
    {
      method: "GET"
    },
    context
  );
  // Get Suggested Product Pictures
  const suggestedPictures = await fetchData(
    "Common/C_Image/ProductSuggestedPictures",
    {
      method: "POST",
      body: JSON.stringify({
        categoryId: productData && productData.data.length > 0 ? productData.data.categoryId : null,
        productTitle: productData && productData.data.length > 0 ? productData.data.title : "",
        page: 1,
        pageSize: 100
      })
    },
    context
  );
  // Get Profile Data For product lat & long
  const profileData = await fetchData(
    "User/U_Account/Profile",
    {
      method: "GET"
    },
    context
  );
  return { result, productData, suggestedPictures, profileData };
};
export default Auth(Page);