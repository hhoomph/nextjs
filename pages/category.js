import React from 'react';
import '../scss/style.scss';
import nextCookie from 'next-cookies';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import fetch from 'isomorphic-unfetch';
import CategoryMenu from '../components/CategoryMenu/CategoryMenu';
function Page() {
  return <CategoryMenu />;
}
Page.getInitialProps = async function(context) {
  const { token } = nextCookie(context);
  // we are on the Server
  if (context.req) {
    if (!token) {
      context.res.writeHead(302, { Location: '/login' });
      context.res.end();
    }
    console.log('server', token);
  } else {
    // we are on the Client
    if (!token) {
      Router.push('/login');
    }
    console.log('client', token);
  }
};
export default Page;