import React from 'react';
import css from '../scss/style.scss';
import Nav from '../components/nav/Nav';
import Counters from '../components/counter/counters';
import { ReactComponent as Logo } from '../static/img/logo.svg';
import Loader from '../components/loader/Loader';
function App() {
  return (
    <>
      <Nav />
      <header className="App_header">
        <Logo className="App-logo mt-1" />
      </header>
      <Counters />
      <Loader loader_use="audio" loader_size="30" loader_color="#4c2b3c" />
    </>
  );
}
export default App;