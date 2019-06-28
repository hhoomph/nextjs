import React, { Fragment } from 'react';
import dynamic from 'next/dynamic';
import css from '../scss/style.scss';
import Nav from '../components/nav/Nav';
import Counters from '../components/counter/counters';
import MyRef from '../components/ref';
import Todos from '../components/todo/Todos';
//import { ReactComponent as Logo } from '../static/img/logo.svg';
const DynamicLogo = dynamic({
  loader: () => import('../static/img/logo.svg'),
  loading: () => <Fragment>Loading Logo ...</Fragment>,
  ssr: true
});
function App() {
  // Determine Server Or Browser env
  if (typeof window !== 'undefined' && window.document !== undefined) {
    console.log('browser');
    // Get cookies
    console.log(document.cookie); // clg all cookies
    console.log(decodeURIComponent(document.cookie));
    // var ca = decodedCookie.split(';');
  } else if (process) {
    console.log('node');
  }
  return (
    <>
      <Nav />
      <header className="App_header">
        <DynamicLogo className="App-logo mt-1" />
      </header>
      <Counters />
      <MyRef />
      <Todos />
    </>
  );
}
export default App;