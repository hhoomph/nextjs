import React, { useState, useEffect, useRef } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { TiHomeOutline } from 'react-icons/ti';
import { FiGrid } from 'react-icons/fi';
import { FaSearch, FaRegUser, FaShoppingBasket, FaRegUserCircle } from 'react-icons/fa';
import '../../scss/components/nav.scss';
// const ReactDOM = require('react-dom');
export default () => {
  const [search, setSearch] = useState('');
  const [searchFocus, setSearchFocus] = useState(false);
  let searchInput = useRef();
  const searchInlineClass = searchFocus ? 'search_inline search_inline_focus' : 'search_inline search_inline_blur';
  const inputFocus = () => {
    setSearchFocus(true);
  };
  const inputBlur = () => {
    if (searchInput.current.value.length > 0) {
    } else {
      setSearchFocus(false);
    }
  };
  return (
    <>
      <Navbar className="d-none d-md-flex top_nav" bg="white" variant="white">
        <div className="col-4 d-flex">
          <Link href="/" passHref>
            <a className="nav_Icons" style={{ color: '#fc874c' }}>
              <FaShoppingBasket />
              <div className="badge badge-success">10</div>
            </a>
          </Link>
          <Link href="/counter" passHref>
            <a className="nav_Icons">
              <FaRegUserCircle />
            </a>
          </Link>
          <Link href="/todo" passHref>
            <a className="nav_Icons">
              <FiGrid />
            </a>
          </Link>
          {/* <Nav className="mr-auto">
            <Link href="/" passHref>
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link href="/counter" passHref>
              <Nav.Link>Counter</Nav.Link>
            </Link>
            <Link href="/counter" as={`/Counter-Cart`} passHref>
              <Nav.Link>Counter Cart</Nav.Link>
            </Link>
            <Link href="/todo" passHref>
              <Nav.Link>Todos</Nav.Link>
            </Link>
          </Nav> */}
        </div>
        <div className="col-4 d-flex justify-content-center">
          <Form className="inline">
            <div className="top_search text-center">
              <input
                type="text"
                placeholder="جستجو"
                className="form-control mr-sm-2 text-right search_input"
                onFocus={() => {
                  inputFocus();
                }}
                onBlur={() => {
                  inputBlur();
                }}
                ref={searchInput}
              />
              <div className={searchInlineClass}>
                <FaSearch />
              </div>
            </div>
          </Form>
        </div>
        <div className="col-4 d-flex justify-content-end">
          <Link href="/" passHref>
            <a className="navbar-brand">
              <img src="../../static/img/splash.png" width="80" height="80" className="d-inline-block align-top" alt="" />
            </a>
          </Link>
        </div>
      </Navbar>
    </>
  );
};