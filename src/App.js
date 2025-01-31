import React from 'react';
import './css/app.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Home from './component/Home';
import Registraion from './component/Registraion';
import Cart from './component/Cart';
import Account from './component/Account';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar bg="dark" data-bs-theme="dark">
          <Navbar.Brand to="#home" className='ms-5'>Navbar</Navbar.Brand>

          <InputGroup size="sm" style={{ width: '40%', marginLeft: '8%' }}>
            <Form.Control
              aria-describedby="inputGroup-sizing-sm"
              style={{ backgroundColor: 'white', color: 'black' }}
            />
            <img src="images/search (1).png" alt="search" className='surchicon' />
          </InputGroup>

          <Nav className="ms-auto navnamesparant">
            <Link to="/" className='navnames'>Home <img src="images/home.png" className='home' alt="home" /></Link>
            <Link to="/category" className='navnames'>Category <img src="images/category.png" className='home' alt="home" /></Link>

          

            <Link to="/cart" className='navnames'>
              Cart <img src="images/cart (2).png" className='cartimg' alt="Shopping Cart" />
            </Link>
            <Link to="/account" className='navnames me-5'>
              <img src="images/account (1).png" className='Account' alt="Account" />
            </Link>
          </Nav>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/cart' element={<Cart />} />
       
          <Route path='/cart' element={<Cart />} />
          <Route path='/account' element={<Account />} />
        </Routes>
  
      </BrowserRouter>
    </>
  );
}

export default App;
