import React from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import fetchData from '../utils/fetchData';
import CategoryMenu from '../components/CategoryMenu/CategoryMenu';
function Page(props) {
  const categories = props.result.data;
  return <CategoryMenu categories={categories} />;
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
export default Page;