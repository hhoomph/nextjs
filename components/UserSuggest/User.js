import React, { useState, useEffect, memo } from 'react';
import Link from 'next/link';
const User = (props) => {
  return (
    <Link href={`/user/${props.id}`} passHref>
      <a className="mr-2 user_link">
        <img src={`../../static/img/${props.image}`} alt="" className="rounded-circle img-thumbnail" />
      </a>
    </Link>
  );
};
export default memo(User);