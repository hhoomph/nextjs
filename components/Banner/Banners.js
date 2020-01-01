import React, { Fragment, useState, useEffect, memo } from "react";
import Link from "../Link";
import Banner from "./Banner";
import "../../scss/components/banners.scss";
const Banners = () => {
  return (
    <div className="container">
      <div className="row rtl banners">
        <Banner link={"bannerLink"} image={"Layer30.png"} />
        <Banner link={"bannerLink"} image={"Layer33.png"} />
      </div>
    </div>
  );
};
export default memo(Banners);