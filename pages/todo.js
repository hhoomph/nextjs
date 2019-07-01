import React from 'react';
import css from '../scss/style.scss';
import Nav from '../components/Nav/Nav';
import Todos from '../components/Todo/Todos';
import { ReactComponent as Logo } from '../static/img/logo.svg';
function App() {
  return (
    <>
      <Nav />
      <header className="App_header">
        <Logo className="App-logo mt-1" />
      </header>
      <Todos />
    </>
  );
}
export default App;