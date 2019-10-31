import React, { useState, useEffect, memo } from 'react';
import Link from '../Link';
import { ReactComponent as PlusSvg } from '../../public/static/svg/plus.svg';
const Header = props => {
  return (
    <div className="container login_header">
      <div className="row">
        <div className="col d-flex justify-content-center">
          <Link href="/" passHref>
            <a>
              <img className="logo" src="/static/img/splash.png" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default memo(Header);