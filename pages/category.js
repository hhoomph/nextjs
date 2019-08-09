import React from 'react';
import '../scss/style.scss';
import dynamic from 'next/dynamic';
import fetch from 'isomorphic-unfetch';
import CategoryMenu from '../components/CategoryMenu/CategoryMenu';
function Page() {
  return <CategoryMenu />;
}
export default Page;