import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { ReactComponent as Logo } from '../../static/img/logo.svg';
export default () => (
  <>
    <Navbar bg="dark" variant="dark">
      <Link href="/" passHref>
        <a className="navbar-brand">
          <Logo style={{ width: '3rem' }} />
        </a>
      </Link>
      <Nav className="mr-auto">
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
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2 text-center" />
        <Button variant="outline-info">جستجو</Button>
      </Form>
    </Navbar>
  </>
);