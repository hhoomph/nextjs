import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
export default ({ children, ...props }) => {
  const router = useRouter();
  const child = React.Children.only(children);
  let className = child.props.className || '';
  // add active class to className of the Link first children (a tag in common)
  if (router.pathname === props.href) {
    className = `${className} active`.trim();
  }
  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};