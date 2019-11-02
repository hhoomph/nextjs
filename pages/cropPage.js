import React, { useState, useEffect, useRef, memo } from 'react';
import ReactCrop from 'react-image-crop';
import Modal from 'react-bootstrap/Modal';
import 'react-image-crop/lib/ReactCrop.scss';
function Page(props) {
  const [modalShow, setModalShow] = useState(false);
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: 'px',
    width: 640,
    height: 800,
    x: 25,
    y: 25,
    aspect: 4 / 5
  });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  //let imageRef = null;
  let fileUrl = null;
  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0])
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setModalShow(true);
    }
  };
  // If you setState the crop in here you should return false.
  const onImageLoaded = image => {
    setImageRef(image);
    //imageRef = image;
  };
  const onCropComplete = c => {
    makeClientCrop(c);
  };
  const onCropChange = (c, percentCrop) => {
    // You could also use percentCrop:
    // setState({ crop: percentCrop });
    setCrop(c);
  };
  const makeClientCrop = async c => {
    if (imageRef !== null && c.width && c.height) {
      const _croppedImageUrl = await getCroppedImg(imageRef, c, 'newFile.jpeg');
      setCroppedImageUrl(_croppedImageUrl);
    }
  };
  const getCroppedImg = (image, c, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = c.width;
    canvas.height = c.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, c.x * scaleX, c.y * scaleY, c.width * scaleX, c.height * scaleY, 0, 0, c.width, c.height);
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(fileUrl);
        fileUrl = window.URL.createObjectURL(blob);
        resolve(fileUrl);
      }, 'image/jpeg');
    });
  };
  return (
    // <div className="App">
    //   <div>
    //     <input type="file" onChange={onSelectFile} />
    //   </div>
    //   {src && (
    //     <ReactCrop
    //       src={src}
    //       crop={crop}
    //       locked={true}
    //       onImageLoaded={(e) => {
    //         onImageLoaded(e);
    //       }}
    //       onComplete={(e) => {
    //         onCropComplete(e);
    //       }}
    //       onChange={(e) => {
    //         onCropChange(e);
    //       }}
    //     />
    //   )}
    //   {croppedImageUrl && <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />}
    // </div>
    <>
      <div>
        <input type="file" onChange={onSelectFile} />
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
              locked={true}
              onImageLoaded={e => {
                onImageLoaded(e);
              }}
              onComplete={e => {
                onCropComplete(e);
              }}
              onChange={e => {
                onCropChange(e);
              }}
            />
          )}
          {croppedImageUrl && <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setModalShow(false)}>بستن</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Page;