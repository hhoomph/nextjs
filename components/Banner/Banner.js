import React, { Fragment, useState, useEffect, memo } from 'react';
import Link from '../Link';
const Banner = props => {
  return (
    <div className="col-12 col-lg-6 banner">
      <Link href={props.link} passHref>
        <a>
          <img src={`../../static/img/${props.image}`} className="img-fluid" alt="Responsive image" />
        </a>
      </Link>
    </div>
  );
};
export default memo(Banner);