import React, { Fragment } from 'react';
import dynamic from 'next/dynamic';
import css from '../scss/style.scss';
import Nav from '../components/nav/Nav';
import Counters from '../components/counter/counters';
import MyRef from '../components/ref';
import Todos from '../components/todo/Todos';
import Loader from '../components/loader/Loader';
//import { ReactComponent as Logo } from '../static/img/logo.svg';
const DynamicLogo = dynamic({
  loader: () => import('../static/img/logo.svg'),
  loading: () => (
    <div className="spinner-border text-warning" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  ),
  ssr: true
});
function App() {
  // Determine Server Or Browser env
  if (typeof window !== 'undefined' && window.document !== undefined) {
    console.log('browser');
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