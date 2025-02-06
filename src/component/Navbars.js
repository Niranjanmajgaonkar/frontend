
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import React, { useState } from 'react';
import '../css/Navbar.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import Home from '../component/Home';
import Registration from '../component/Registration';
import Login from '../component/Login';
import Cart from '../component/Cart';
import Account from '../component/Account';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Navbars() {

  const [show, setShow] = useState(false);
  const [accountshow, setaccountShow] = useState(false);


  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="px-4 fixed-top">

        <Container fluid>
          {/* Navbar Brand */}
          <Navbar.Brand as={Link} to="/" className="ms-3 text-white">
            Navbar
          </Navbar.Brand>

          {/* Navbar Toggle Button */}
          <Navbar.Toggle aria-controls="navbar-nav" />

          {/* Collapsible Content */}
          <Navbar.Collapse id="navbar-nav">
            {/* Search Bar */}
            <InputGroup size="sm" className="mx-auto my-2 my-lg-0" style={{ width: '40%' }}>
              <Form.Control
                placeholder="Search..."
                style={{ backgroundColor: 'white', color: 'black' }}
              />
              <InputGroup.Text>
                <img src="images/search (1).png" alt="search" className="surchicon" />
              </InputGroup.Text>
            </InputGroup>

            {/* Navigation Links */}
            <Nav className="ms-auto navmain">
              <Nav.Link as={Link} to="/home" className="navnames text-white">
                Home <img src="images/home.png" className="home" alt="home" style={{ marginRight: '35px' }} />
              </Nav.Link>

              {/* category dropdown */}
              <Nav.Item onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                <NavDropdown
                  title={
                    <span style={{ color: 'white' }}>
                      Category <img src="/images/category.png" className="home" alt="category" />
                    </span>
                  }
                  id="category-dropdown"
                  menuVariant="dark" // Ensures dark background
                  className="custom-dropdown"
                  show={show}
                >
                  <NavDropdown.Item href="#/action-1">Men's</NavDropdown.Item>
                  <NavDropdown.Item href="#/action-2">Women's</NavDropdown.Item>
                  <NavDropdown.Item href="#/action-3">Chaild's</NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>



              <Nav.Link as={Link} to="/cart" className="navnames text-white">
                Cart <img src="images/cart (2).png" className="cartimg" alt="Shopping Cart" />
              </Nav.Link>



              {/* account dropdown */}
              <Nav.Item onMouseEnter={() => setaccountShow(true)} onMouseLeave={() => setaccountShow(false)}>
                <NavDropdown
                  title={
                    <span style={{ color: 'white' }}>
                      <img src="images/account (1).png" className="Account " alt="Account" />
                    </span>
                  }
                  id="category-dropdown"
                  menuVariant="dark" // Ensures dark background
                  className="custom-dropdown navnames"
                  show={accountshow}
                  align="end"
                >
                  <NavDropdown.Item href="#/action-1">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="#/action-2">Orders</NavDropdown.Item>
                  <NavDropdown.Item href="#/action-3">Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>



            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>





    </>
  );
}
